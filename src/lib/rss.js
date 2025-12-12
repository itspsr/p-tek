// src/lib/rss.js
import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { MOCK_NEWS } from "./mockData";

/* CLEAN FEED ITEMS */
function cleanObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (obj.File) delete obj.File;
  if (obj.file) delete obj.file;

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (key.toLowerCase() === "file") delete obj[key];
    else if (val && typeof val === "object") cleanObject(val);
  }
  return obj;
}

export function sanitizeItem(item) {
  return cleanObject(item);
}

/* RSS PARSER */
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

/* RSS FEEDS */
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

/* ADVANCED IMAGE EXTRACTOR */
function extractImageFromHtml(html) {
  if (!html) return null;

  try {
    const $ = cheerio.load(html);
    let img = null;

    // 1 — <img src="">
    img = $("img").first().attr("src");
    if (img) return img.startsWith("//") ? "https:" + img : img;

    // 2 — <img data-src="">
    img = $("img").first().attr("data-src");
    if (img) return img.startsWith("//") ? "https:" + img : img;

    // 3 — <img data-original="">
    img = $("img").first().attr("data-original");
    if (img) return img.startsWith("//") ? "https:" + img : img;

    // 4 — srcset
    const srcset = $("img").first().attr("srcset");
    if (srcset) {
      const first = srcset.split(",")[0].trim().split(" ")[0];
      return first.startsWith("//") ? "https:" + first : first;
    }

    // 5 — <figure> images (Guardian)
    img = $("figure img").first().attr("src");
    if (img) return img.startsWith("//") ? "https:" + img : img;

    return null;
  } catch {
    return null;
  }
}

/* OG IMAGE FALLBACK */
async function tryFetchOgImage(url) {
  if (!url) return null;

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1500);

    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    let og =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="og:image"]').attr("content");

    if (og && og.startsWith("//")) og = "https:" + og;

    return og || null;
  } catch {
    return null;
  }
}

/* FETCH CATEGORY NEWS */
export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const allItems = [];

  const resultGroups = await Promise.all(
    urls.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map((i) => ({
          ...sanitizeItem(i),
          source: feed.title || "News",
        }));
      } catch (e) {
        console.error("Feed error:", url, e?.message);
        return [];
      }
    })
  );

  resultGroups.flat().forEach((i) => allItems.push(i));

  // Sort by newest
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Normalize items
  const normalized = await Promise.all(
    allItems.slice(0, limit).map(async (item) => {
      // Extract from HTML
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

      // OG fallback
      if (!thumbnail && item.link) {
        thumbnail = await tryFetchOgImage(item.link);
      }

      // Final fallback
      if (!thumbnail)
        thumbnail =
          "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=60";

      // Fix auto protocol
      if (thumbnail?.startsWith("//")) thumbnail = "https:" + thumbnail;

      return {
        id: Buffer.from(item.link || item.title).toString("base64").slice(0, 16),
        title: item.title || "Untitled",
        summary:
          (item.contentSnippet || item.summary || "")
            .toString()
            .slice(0, 250) + "...",
        date: item.pubDate || new Date().toISOString(),
        thumbnail,
        link: item.link,
        source: item.source,
        category,
      };
    })
  );

  return normalized.length ? normalized : MOCK_NEWS[category] || [];
}

/* HOMEPAGE */
export async function getAllNews() {
  const [world, tech, finance] = await Promise.all([
    getCategoryNews("world", 6),
    getCategoryNews("tech", 6),
    getCategoryNews("finance", 6),
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}