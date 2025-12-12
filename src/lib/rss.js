import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { MOCK_NEWS } from './mockData';

// =============================================
// REMOVE ANY "File" FIELDS (SSR FIX)
// =============================================
function cleanObject(obj) {
  if (!obj || typeof obj !== "object") return obj;

  // Remove direct File or file fields
  if (obj.File) delete obj.File;
  if (obj.file) delete obj.file;

  for (const key of Object.keys(obj)) {
    const val = obj[key];

    // Some RSS feeds send { "$": { File: ... } }
    if (key === "$" && val) {
      if (val.File) delete val.File;
      if (val.file) delete val.file;
    }

    if (val && typeof val === "object") cleanObject(val);
  }

  return obj;
}

export function sanitizeItem(item) {
  return cleanObject(item);
}

// =============================================
// RSS PARSER
// =============================================
const parser = new Parser({
  customFields: {
    items: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
      ["content:encoded", "contentEncoded"],
      ["dc:creator", "creator"]
    ],
  },
});

// =============================================
// RSS FEED URLS
// =============================================
const FEEDS = {
  world: [
    "https://feeds.bbci.co.uk/news/world/rss.xml"
  ],
  tech: [
    "http://feeds.feedburner.com/TechCrunch/"
  ],
  finance: [
    "https://www.cnbc.com/id/100003114/device/rss/rss.html"
  ]
};

// =============================================
// IMAGE EXTRACTION (SAFE FOR NEXT.JS SSR)
// =============================================
function extractImage(html) {
  if (!html) return null;

  try {
    const $ = cheerio.load(html);
    return $("img").first().attr("src") || null;
  } catch {
    return null;
  }
}

// =============================================
// FETCH CATEGORY NEWS
// =============================================
export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);

        return feed.items.map((raw) => {
          const item = sanitizeItem(raw);
          return {
            ...item,
            source: feed.title || "News",
          };
        });
      } catch {
        return [];
      }
    })
  );

  const all = [];
  results.flat().forEach((x) => all.push(x));

  // Sort by newest
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const normalized = await Promise.all(
    all.slice(0, limit).map(async (item) => {
      const htmlImg =
        extractImage(item.content) ||
        extractImage(item.contentEncoded);

      const thumbnail =
        item.mediaContent?.$?.url ||
        item.mediaThumbnail?.$?.url ||
        item.enclosure?.url ||
        htmlImg ||
        "/fallback.jpg";

      return {
        id: Buffer.from(item.link || item.title).toString("base64").substring(0, 16),
        title: item.title,
        summary:
          (item.contentSnippet || item.content || "").substring(0, 200) + "...",
        date: item.pubDate,
        thumbnail,
        source: item.source,
        link: item.link,
        category,
      };
    })
  );

  if (normalized.length === 0) return MOCK_NEWS[category] || [];

  return normalized;
}

// =============================================
// FETCH ALL NEWS
// =============================================
export async function getAllNews() {
  const { world, tech, finance } = await Promise.all({
    world: getCategoryNews("world", 6),
    tech: getCategoryNews("tech", 6),
    finance: getCategoryNews("finance", 6),
  });

  return [...world, ...tech, ...finance];
}

// =============================================
// FIXED DATE FORMATTER
// =============================================
export function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}