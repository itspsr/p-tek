// src/lib/rss.js
import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { MOCK_NEWS } from "./mockData";

// -------------------------------------
// CLEAN FEED ITEMS (Render-safe)
// -------------------------------------
function cleanObject(obj) {
  if (!obj || typeof obj !== "object") return obj;

  if (obj.File) delete obj.File;
  if (obj.file) delete obj.file;

  for (const key of Object.keys(obj)) {
    const val = obj[key];

    if (key.toLowerCase() === "file") {
      delete obj[key];
      continue;
    }

    if (val && typeof val === "object") {
      cleanObject(val);
    }
  }

  return obj;
}

export function sanitizeItem(item) {
  return cleanObject(item);
}

// -------------------------------------
// RSS PARSER
// -------------------------------------
const parser = new Parser({
  timeout: 8000,
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
      ["content:encoded", "contentEncoded"],
      ["dc:creator", "creator"],
    ],
  },
});

// -------------------------------------
// FEED SOURCES
// -------------------------------------
const FEEDS = {
  world: [
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "https://feeds.bbci.co.uk/news/world/rss.xml",
    "https://www.theguardian.com/world/rss",
  ],
  tech: [
    "https://www.theverge.com/rss/index.xml",
    "https://www.wired.com/feed/rss",
    "https://feeds.arstechnica.com/arstechnica/technology-lab",
  ],
  finance: [
    "https://feeds.bbci.co.uk/news/business/rss.xml",
    "https://www.marketwatch.com/feeds/topstories",
    "https://www.investing.com/rss/news_25.rss",
  ],
};

// -------------------------------------
// Extract image from HTML <img>
// -------------------------------------
function extractImageFromHtml(html) {
  if (!html) return null;

  try {
    const $ = cheerio.load(html);
    const img = $("img").first().attr("src");

    if (img && img.startsWith("//")) return "https:" + img;
    return img || null;
  } catch {
    return null;
  }
}

// -------------------------------------
// Try OG:image from article page
// -------------------------------------
async function tryFetchOgImage(url) {
  if (!url) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    const og =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="og:image"]').attr("content");

    if (og && og.startsWith("//")) return "https:" + og;

    return og || null;
  } catch {
    return null;
  }
}

// -------------------------------------
// CATEGORY NEWS FETCHER
// -------------------------------------
export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const allItems = [];

  const feedPromises = urls.map(async (url) => {
    try {
      const feed = await parser.parseURL(url);
      return feed.items.map((it) => ({
        ...sanitizeItem(it),
        source: feed.title || "News",
      }));
    } catch (e) {
      console.error("Feed error:", url, e?.message);
      return [];
    }
  });

  const results = await Promise.all(feedPromises);
  results.flat().forEach((i) => allItems.push(i));

  // Sort by latest
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Normalize
  const normalized = await Promise.all(
    allItems.slice(0, limit).map(async (item) => {
      // HTML <img> parsing
      const htmlImg =
        extractImageFromHtml(item.content) ||
        extractImageFromHtml(item.contentEncoded);

      // RSS image fields
      let thumbnail =
        item.mediaContent?.$?.url ||
        item.mediaContent?.url ||
        item.mediaThumbnail?.$?.url ||
        item.mediaThumbnail?.url ||
        item.enclosure?.url ||
        htmlImg ||
        null;

      // Try fetching OG:image
      if (!thumbnail && item.link) {
        const og = await tryFetchOgImage(item.link);
        if (og) thumbnail = og;
      }

      // Final guaranteed fallback
      if (!thumbnail) {
        thumbnail =
          "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=60";
      }

      return {
        id: Buffer.from(item.link || item.title).toString("base64").slice(0, 16),
        title: item.title || "Untitled",
        summary:
          (item.contentSnippet || item.summary || "")
            .toString()
            .slice(0, 250) + "...",
        date: item.pubDate || new Date().toISOString(),
        thumbnail,
        link: item.link || "#",
        source: item.source,
        category: category,
      };
    })
  );

  return normalized.length ? normalized : MOCK_NEWS[category] || [];
}

// -------------------------------------
// ALL NEWS / HOME PAGE
// -------------------------------------
export async function getAllNews() {
  const [world, tech, finance] = await Promise.all([
    getCategoryNews("world", 6),
    getCategoryNews("tech", 6),
    getCategoryNews("finance", 6),
  ]);

  const breaking = [...world, ...tech, ...finance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return { world, tech, finance, breaking };
}

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