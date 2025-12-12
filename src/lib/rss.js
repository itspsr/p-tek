import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { MOCK_NEWS } from './mockData';

// -------------------------------
//  SANITIZER – FIXES YOUR BUILD
// -------------------------------
function sanitizeItem(item) {
    // Remove any browser-only fields (these break Next.js SSR)
    if (item?.File) delete item.File;
    if (item?.file) delete item.file;

    if (item?.enclosure) {
        if (item.enclosure.File) delete item.enclosure.File;
        if (item.enclosure.file) delete item.enclosure.file;
    }

    if (item?.mediaContent?.File) delete item.mediaContent.File;
    if (item?.mediaThumbnail?.File) delete item.mediaThumbnail.File;

    return item;
}

// -------------------------------
//   RSS PARSER CONFIG
// -------------------------------
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

// -------------------------------
//      NEWS FEED URLS
// -------------------------------
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

// -------------------------------
//   IMAGE EXTRACTION HELPERS
// -------------------------------
function extractImageFromHtml(html) {
    if (!html) return null;
    try {
        const $ = cheerio.load(html);
        const img = $('img').first().attr('src');
        return img || null;
    } catch {
        return null;
    }
}

// Fetching OG image is removed to avoid SSR breaking issues
// If needed later, it will be implemented with caching.


// -------------------------------
//   FETCH CATEGORY NEWS
// -------------------------------
export async function getCategoryNews(category, limit = 20) {
    const urls = FEEDS[category];
    if (!urls) return MOCK_NEWS[category] || [];

    const allItems = [];

    const feedPromises = urls.map(async (url) => {
        try {
            const feed = await parser.parseURL(url);
            return feed.items.map(raw => {
                const item = sanitizeItem(raw); // IMPORTANT FIX HERE
                return { ...item, source: feed.title || 'News' };
            });
        } catch (e) {
            console.error(`Error fetching feed ${url}:`, e.message);
            return [];
        }
    });

    const results = await Promise.all(feedPromises);
    results.flat().forEach(i => allItems.push(i));

    // Sort by newest
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Normalize final items
    const normalizedItems = await Promise.all(
        allItems.slice(0, limit).map(async (raw) => {
            const item = sanitizeItem(raw); // FIX HERE TOO

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
                thumbnail,
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

// -------------------------------
//   FETCH ALL NEWS + BREAKING
// -------------------------------
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
        breaking: [...world, ...tech, ...finance]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
    };
}