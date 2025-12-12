import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { MOCK_NEWS } from "./mockData";

// ===============================
// REMOVE ANY "File" FIELDS (SSR FIX)
// ===============================
function cleanObject(obj) {
    if (!obj || typeof obj !== "object") return obj;

    // Remove direct File fields
    if (obj.File) delete obj.File;
    if (obj.file) delete obj.file;

    for (const key of Object.keys(obj)) {
        const val = obj[key];

        // Recursively clean nested objects
        if (val && typeof val === "object") cleanObject(val);

        // Some RSS feeds put File inside "$" object
        if (key === "$" && val) {
            if (val.File) delete val.File;
            if (val.file) delete val.file;
        }
    }

    return obj;
}

export function sanitizeItem(item) {
    return cleanObject(item);
}

// ===============================
// RSS PARSER CONFIG
// ===============================
const parser = new Parser({
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

// ===============================
// RSS FEED URLS
// ===============================
const FEEDS = {
    world: [
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://www.theguardian.com/world/rss",
        "https://www.reutersagency.com/feed/?best-sectors=top-news&post_type=best"
    ],
    tech: [
        "http://feeds.feedburner.com/TechCrunch/",
        "http://feeds.arstechnica.com/arstechnica/index",
        "https://www.theverge.com/rss/index.xml"
    ],
    finance: [
        "https://www.cnbc.com/id/100003114/device/rss/rss.html",
        "https://www.coindesk.com/arc/outboundfeeds/rss/",
        "https://feeds.bloomberg.com/markets/news.rss"
    ]
};

// ===============================
// IMAGE EXTRACTION
// ===============================
function extractImageFromHtml(html) {
    if (!html) return null;
    try {
        const $ = cheerio.load(html);
        return $("img").first().attr("src") || null;
    } catch {
        return null;
    }
}

// ===============================
// FETCH CATEGORY NEWS
// ===============================
export async function getCategoryNews(category, limit = 20) {
    const urls = FEEDS[category];
    if (!urls) return MOCK_NEWS[category] || [];

    const allItems = [];

    const feedPromises = urls.map(async (url) => {
        try {
            const feed = await parser.parseURL(url);

            return feed.items.map((item) =>
                sanitizeItem({
                    ...item,
                    source: feed.title || "News"
                })
            );
        } catch (e) {
            console.error("Feed error:", e.message);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.flat().forEach((i) => allItems.push(i));

    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const normalized = await Promise.all(
        allItems.slice(0, limit).map(async (item) => {
            const htmlImg =
                extractImageFromHtml(item.content) ||
                extractImageFromHtml(item.contentEncoded);

            const thumbnail =
                item.mediaContent?.$?.url ||
                item.mediaThumbnail?.$?.url ||
                item.enclosure?.url ||
                htmlImg ||
                "/fallback.jpg";

            return sanitizeItem({
                id: Buffer.from(item.link || item.title)
                    .toString("base64")
                    .substring(0, 16),

                title: item.title,
                summary:
                    (item.contentSnippet ||
                        item.content ||
                        "").substring(0, 200) + "...",

                date: item.pubDate,
                thumbnail,
                source: item.source || "Unknown",
                link: item.link,
                category: category.charAt(0).toUpperCase() + category.slice(1)
            });
        })
    );

    if (normalized.length === 0) return MOCK_NEWS[category] || [];

    return normalized;
}

// ===============================
// FETCH ALL NEWS
// ===============================
export async function getAllNews() {
    const [world, tech, finance] = await Promise.all([
        getCategoryNews("world", 6),
        getCategoryNews("tech", 6),
        getCategoryNews("finance", 6)
    ]);

    return {
        world,
        tech,
        finance,
        breaking: [...world, ...tech, ...finance]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
    };
}

// ===============================
// FIXED formatDate EXPORT
// ===============================
export function formatDate(dateString) {
    try {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    } catch {
        return "Unknown date";
    }
}