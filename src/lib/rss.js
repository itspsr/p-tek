// src/lib/rss.js
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { MOCK_NEWS } from './mockData';

// Remove any File/file properties (SSR-safe)
function cleanObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  // Remove direct .File or .file
  if (obj.File) delete obj.File;
  if (obj.file) delete obj.file;

  for (const key of Object.keys(obj)) {
    const val = obj[key];

    // If key itself is File/file
    if (key.toLowerCase() === 'file') {
      delete obj[key];
      continue;
    }

    if (val && typeof val === 'object') {
      if (val.File) delete val.File;
      if (val.file) delete val.file;
      cleanObject(val);
    }
  }

  return obj;
}

export function sanitizeItem(item) {
  return cleanObject(item);
}

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator'],
    ],
  },
});

const FEEDS = {
  world: [
    'https://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.theguardian.com/world/rss',
    'https://www.reutersagency.com/feed/?best-sectors=top-news&post_type=best',
  ],
  tech: [
    'http://feeds.feedburner.com/TechCrunch/',
    'http://feeds.arstechnica.com/arstechnica/index',
    'https://www.theverge.com/rss/index.xml',
  ],
  finance: [
    'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://feeds.bloomberg.com/markets/news.rss',
  ],
};

function extractImageFromHtml(html) {
  if (!html) return null;
  try {
    const $ = cheerio.load(html);
    const img = $('img').first().attr('src');
    return img || null;
  } catch (e) {
    return null;
  }
}

async function tryFetchOgImage(url) {
  if (!url) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    const meta = $('meta[property="og:image"]').attr('content') || $('meta[name="og:image"]').attr('content');
    return meta || null;
  } catch {
    return null;
  }
}

export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const allItems = [];

  const feedPromises = urls.map(async (url) => {
    try {
      const feed = await parser.parseURL(url);
      return feed.items.map((it) => {
        const cleaned = sanitizeItem(it);
        return { ...cleaned, source: feed.title || 'News' };
      });
    } catch (e) {
      console.error(`Error fetching feed ${url}:`, e?.message || e);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.flat().forEach((i) => allItems.push(i));

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const normalized = await Promise.all(
    allItems.slice(0, limit).map(async (item) => {
      const htmlImg = extractImageFromHtml(item.content) || extractImageFromHtml(item.contentEncoded);

      let thumbnail =
        item.mediaContent?.$?.url ||
        item.mediaContent?.url ||
        item.mediaThumbnail?.$?.url ||
        item.mediaThumbnail?.url ||
        item.enclosure?.url ||
        htmlImg ||
        null;

      // Try OG image for top items (non-blocking)
      if (!thumbnail && item.link) {
        const og = await tryFetchOgImage(item.link);
        if (og) thumbnail = og;
      }

      if (!thumbnail) thumbnail = '/fallback.jpg';

      return {
        id: Buffer.from(item.link || item.title || Math.random().toString()).toString('base64').substring(0, 16),
        title: item.title || 'Untitled',
        summary: ((item.contentSnippet || item.content || item.summary) || '').toString().slice(0, 300) + '...',
        date: item.pubDate || new Date().toISOString(),
        thumbnail,
        source: item.source || 'Unknown',
        link: item.link || '#',
        category: category.charAt(0).toUpperCase() + category.slice(1),
      };
    })
  );

  return normalized.length > 0 ? normalized : MOCK_NEWS[category] || [];
}

export async function getAllNews() {
  const [world, tech, finance] = await Promise.all([
    getCategoryNews('world', 6),
    getCategoryNews('tech', 6),
    getCategoryNews('finance', 6),
  ]);

  return {
    world,
    tech,
    finance,
    breaking: [...world, ...tech, ...finance]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10),
  };
}

export function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Unknown date';
  }
}