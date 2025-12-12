import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { MOCK_NEWS } from './mockData';

// =============================
// REMOVE ALL "File" FIELDS (SSR FIX)
// =============================
function cleanObject(obj) {
    if (!obj || typeof obj !== "object") return obj;

    // Remove direct ".File" or ".file"
    if (obj.File) delete obj.File;
    if (obj.file) delete obj.file;

    for (const key of Object.keys(obj)) {
        const val = obj[key];

        // If key itself is File/file
        if (key.toLowerCase() === "file") {
            delete obj[key];
            continue;
        }

        // Some RSS feeds send { "$": { File: ... } }
        if (val && typeof val === "object") {
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

// =============================
// RSS PARSER
// =============================
const parser = new Parser({
    customFields: {
        item: [
            ["media:content", "mediaContent"],
            ["media:thumbnail", "mediaThumbnail"],
            ["enclosure", "enclosure"],
            ["content:encoded", "contentEncoded"],
            ["dc:creator", "creator"]
        ]
    }
});

// =============================
// FEEDS
// =============================
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

// =============================
// IMAGE EXTRACTION
// =============================
function extractImage(html) {
    if (!html) return null;
    try {
        const $ = cheerio.load(html);
        return $("img").first().attr("src") || null;
    } catch {
        return null;
    }
}

// =============================
// FETCH CATEGORY NEWS
// =============================
export async function getCategoryNews(category, limit = 20) {
    const urls = FEEDS[category];
    if (!urls) return MOCK_NEWS[category] || [];

    const all = [];

    const feedPromises = urls.map(async (url) => {
        try {
            const feed = await parser.parseURL(url);
            return feed.items.map(item => {
                const clean = sanitizeItem(item);
                return {
                    ...clean,
                    source: feed.title || "News"
                };
            });
        } catch (e) {
            console.error("Feed error:", url);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.flat().forEach((x) => all.push(x));

    all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const normalized = all.slice(0, limit).map(item => {
        const htmlImg = extractImage(item.content) ||
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
            summary: (item.contentSnippet || item.content || "").substring(0, 200) + "...",
            date: item.pubDate,
            thumbnail,
            source: item.source,
            link: item.link,
            category: category.charAt(0).toUpperCase() + category.slice(1)
        };
    });

    return normalized.length > 0 ? normalized : MOCK_NEWS[category] || [];
}

// =============================
// GET ALL NEWS
// =============================
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

// =============================
// DATE FORMATTER
// =============================
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