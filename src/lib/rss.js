import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { MOCK_NEWS } from './mockData';

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
        'https://www.reutersagency.com/feed/?best-sectors=top-news&post_type=best'
    ],
    tech: [
        'http://feeds.feedburner.com/TechCrunch/',
        'http://feeds.arstechnica.com/arstechnica/index',
        'https://www.theverge.com/rss/index.xml'
    ],
    finance: [
        'https://www.cnbc.com/id/100003114/device/rss/rss.html',
        'https://www.coindesk.com/arc/outboundfeeds/rss/',
        'https://feeds.bloomberg.com/markets/news.rss'
    ]
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

async function fetchOgImage(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) return null;

        const html = await res.text();
        const $ = cheerio.load(html);
        return $('meta[property="og:image"]').attr('content') || null;
    } catch (e) {
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
            return feed.items.map(item => ({ ...item, source: feed.title || 'News' }));
        } catch (e) {
            console.error(`Error fetching feed ${url}:`, e.message);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.flat().forEach(item => allItems.push(item));

    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const normalizedItems = await Promise.all(
        allItems.slice(0, limit).map(async (item, index) => {
            let thumbnail =
                item.mediaContent?.$?.url ||
                item.mediaThumbnail?.$?.url ||
                item.enclosure?.url ||
                extractImageFromHtml(item.content) ||
                extractImageFromHtml(item.contentEncoded) ||
                '/fallback.jpg';

            return {
                id: Buffer.from(item.link || item.title).toString('base64').substring(0, 16),
                title: item.title,
                summary: (item.contentSnippet || item.content || '').substring(0, 200) + '...',
                date: item.pubDate,
                thumbnail: thumbnail,
                source: item.source || 'Unknown',
                link: item.link,
                category: category.charAt(0).toUpperCase() + category.slice(1)
            };
        })
    );

    if (normalizedItems.length === 0) {
        return MOCK_NEWS[category] || [];
    }

    return normalizedItems;
}

export async function getAllNews() {
    const [world, tech, finance] = await Promise.all([
        getCategoryNews('world', 6),
        getCategoryNews('tech', 6),
        getCategoryNews('finance', 6)
    ]);

    return {
        world,
        tech,
        finance,
        breaking: [...world, ...tech, ...finance].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
    };
}

/* ✅ ADD THIS BLOCK AT THE BOTTOM */
export function formatDate(dateString) {
    try {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch (e) {
        return "";
    }
}