import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { MOCK_NEWS } from "./mockData";

// REMOVE file props
function cleanObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (obj.File) delete obj.File;
  if (obj.file) delete obj.file;

  for (const k of Object.keys(obj)) {
    if (k.toLowerCase() === "file") delete obj[k];
    else if (typeof obj[k] === "object") cleanObject(obj[k]);
  }
  return obj;
}

export function sanitizeItem(i) {
  return cleanObject(i);
}

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

const FEEDS = {
  world: [
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "https://feeds.bbci.co.uk/news/world/rss.xml",
    "https://www.theguardian.com/world/rss"
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

function extractImage(html) {
  if (!html) return null;
  try {
    const $ = cheerio.load(html);
    let src =
      $("img").attr("src") ||
      $("img").attr("data-src") ||
      $("img").attr("data-original");

    if (!src) return null;
    return src.startsWith("//") ? "https:" + src : src;
  } catch {
    return null;
  }
}

async function tryOg(url) {
  if (!url) return null;
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1500);

    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    const og =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="og:image"]').attr("content");

    if (og?.startsWith("//")) return "https:" + og;
    return og || null;
  } catch {
    return null;
  }
}

// ⭐ FINAL PERFECT UNIQUE ID FUNCTION
function generateStableId(link, title) {
  const base = (link || title || Math.random().toString()).trim();
  return Buffer.from(base).toString("base64").replace(/=/g, "").slice(0, 24);
}

export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const all = [];

  const groups = await Promise.all(
    urls.map(async (u) => {
      try {
        const feed = await parser.parseURL(u);
        return feed.items.map((i) => ({
          ...sanitizeItem(i),
          source: feed.title,
        }));
      } catch {
        return [];
      }
    })
  );

  groups.flat().forEach((i) => all.push(i));

  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return await Promise.all(
    all.slice(0, limit).map(async (item) => {
      let img =
        item.mediaContent?.$?.url ||
        item.mediaThumbnail?.$?.url ||
        item.enclosure?.url ||
        extractImage(item.content) ||
        extractImage(item.contentEncoded) ||
        null;

      if (!img && item.link) img = await tryOg(item.link);

      if (!img)
        img =
          "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=60";

      return {
        id: generateStableId(item.link, item.title),
        title: item.title,
        summary: (item.summary || item.contentSnippet || "").slice(0, 250),
        date: item.pubDate,
        thumbnail: img,
        link: item.link,
        category,
        source: item.source,
      };
    })
  );
}

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