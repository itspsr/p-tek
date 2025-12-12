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
    if (key.toLowerCase() === "file") delete obj[key];
    else if (typeof obj[key] === "object") cleanObject(obj[key]);
  }
  return obj;
}

export function sanitizeItem(item) {
  return cleanObject(item);
}

/* RSS PARSER */
const parser = new Parser({
  timeout: 6000,
  customFields: {
    item: [
      ["media:content", "mediaContent"],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

/* FEEDS */
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
    // REMOVE IMAGE PROBLEM SOURCES
    // "https://www.marketwatch.com/feeds/topstories",
    // "https://www.investing.com/rss/news_25.rss",
  ],
};

/* IMAGE EXTRACTOR */
function extractImageFromHtml(html) {
  if (!html) return null;

  try {
    const $ = cheerio.load(html);
    const img = $("img").first();

    // src
    let src = img.attr("src");
    if (src) return src.startsWith("//") ? "https:" + src : src;

    // data-src
    src = img.attr("data-src");
    if (src) return src.startsWith("//") ? "https:" + src : src;

    // data-original
    src = img.attr("data-original");
    if (src) return src.startsWith("//") ? "https:" + src : src;

    // srcset
    const srcset = img.attr("srcset");
    if (srcset) {
      const first = srcset.split(",")[0].trim().split(" ")[0];
      return first.startsWith("//") ? "https:" + first : first;
    }

    // Guardian <figure>
    const fig = $("figure img").first().attr("src");
    if (fig) return fig.startsWith("//") ? "https:" + fig : fig;

    return null;
  } catch {
    return null;
  }
}

/* FETCH CATEGORY */
export async function getCategoryNews(category, limit = 20) {
  const urls = FEEDS[category];
  if (!urls) return MOCK_NEWS[category] || [];

  const all = [];

  const groups = await Promise.all(
    urls.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        return feed.items.map((i) => ({
          ...sanitizeItem(i),
          source: feed.title || "News",
        }));
      } catch (err) {
        console.error("Feed Error:", url, err?.message);
        return [];
      }
    })
  );

  groups.flat().forEach((i) => all.push(i));

  // sort newest first
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // normalize
  const normalized = await Promise.all(
    all.slice(0, limit).map(async (item) => {
      let thumbnail =
        item.mediaContent?.$?.url ||
        item.mediaThumbnail?.$?.url ||
        item.mediaContent?.url ||
        item.mediaThumbnail?.url ||
        item.enclosure?.url ||
        extractImageFromHtml(item.content) ||
        extractImageFromHtml(item.contentEncoded) ||
        null;

      // fallback
      if (!thumbnail) {
        thumbnail =
          "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=60";
      }

      if (thumbnail?.startsWith("//")) thumbnail = "https:" + thumbnail;

      return {
        id: Buffer.from(item.link || item.title).toString("base64").slice(0, 16),
        title: item.title || "Untitled",
        summary:
          (item.contentSnippet || item.summary || "")
            ?.toString()
            .replace(/<[^>]+>/g, "")
            .slice(0, 250) + "...",
        date: isNaN(new Date(item.pubDate)) ? new Date().toISOString() : item.pubDate,
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

  const breaking = [...world, ...tech, ...finance]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 12);

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