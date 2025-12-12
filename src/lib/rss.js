import Parser from "rss-parser";
import * as cheerio from "cheerio";
import { MOCK_NEWS } from "./mockData";

// ===============================
// REMOVE ALL "File" FIELDS (SSR FIX)
// ===============================
function cleanObject(obj) {
    if (!obj || typeof obj !== "object") return obj;

    for (const key of Object.keys(obj)) {
        const val = obj[key];

        // Remove any `File` field (capital F or small f)
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

// ===============================
// RSS PARSER
// ===============================
const parser = new Parser({
    customFields: {
        item: [
            ["media:content", "mediaContent"],
            ["media:thumbnail", "mediaThumbnail"],
            ["enclosure", "enclosure"],
            ["content:encoded", "contentEncoded"]
        ]
    }
});

// ===============================
// RSS FEED URLs
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
// EXTRACT IMAGE FROM HTML
// ===============================
function extractImage(html) {
    try {
        const $ = cheerio.load(html || "");
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

    const all = [];

    const feedPromises = urls.map(async (url) => {
        try {
            const feed = await parser.parseURL(url);
            return feed.items.map(item => {
                item = cleanObject(item); // ⭐ FIX
                return { ...item, source: feed.title || "News" };
            });
        } catch (e) {
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.flat().forEach(x => all.push(x));

    // Sort by date
    all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const normalized = all.slice(0, limit).map(item => {
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
            summary: (item.contentSnippet || item.content || "").substring(0, 200) + "...",
            date: item.pubDate,
            thumbnail,
            source: item.source,
            link: item.link,
            category
        };
    });

    if (!normalized.length) return MOCK_NEWS[category] || [];
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
// FIXED DATE FORMATTER
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

// ===============================
// TIME AGO FORMATTER
// ===============================
export function timeAgo(date) {
    try {
        const diff = (Date.now() - new Date(date)) / 1000;
        if (diff < 60) return `${Math.floor(diff)}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    } catch {
        return "Unknown";
    }
}