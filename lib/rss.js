import Parser from 'rss-parser';
import { subDays, parseISO } from 'date-fns';

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent', { keepArray: false }],
            ['enclosure', 'enclosure', { keepArray: false }],
        ]
    }
});

const FEEDS = {
    world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    tech: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    finance: 'https://feeds.bbci.co.uk/news/business/rss.xml'
};

export async function getNews(category) {
    if (!FEEDS[category]) return [];

    try {
        const feed = await parser.parseURL(FEEDS[category]);
        const threeDaysAgo = subDays(new Date(), 3);

        const filteredItems = feed.items.filter(item => {
            const pubDate = new Date(item.pubDate);
            return pubDate >= threeDaysAgo;
        });

        return filteredItems.map(item => {
            // Extract image
            let imageUrl = null;
            if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
                imageUrl = item.mediaContent.$.url;
            } else if (item.enclosure && item.enclosure.url) {
                imageUrl = item.enclosure.url;
            } else if (item.content && item.content.match(/src="([^"]+)"/)) {
                // Fallback: regex for img src in content
                imageUrl = item.content.match(/src="([^"]+)"/)[1];
            }

            return {
                title: item.title,
                description: item.contentSnippet || item.content || '',
                link: item.link,
                pubDate: item.pubDate,
                image: imageUrl || 'https://via.placeholder.com/800x450?text=No+Image', // Fallback
                source: "BBC News"
            };
        });

    } catch (error) {
        console.error(`Error fetching RSS for ${category}:`, error);
        return [];
    }
}
