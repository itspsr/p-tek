import { getCategoryNews } from "../../../../lib/fetchNews";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all known categories
export async function generateStaticParams() {
    const categories = ["world", "tech", "finance"];
    let params = [];

    for (const category of categories) {
        const news = await getCategoryNews(category);
        // Add params for each news item found
        const categoryParams = news.map((item) => ({
            id: item.id,
        }));
        params = [...params, ...categoryParams];
    }

    return params;
}

export async function generateMetadata({ params }) {
    const { id } = params;
    // Parse category from ID (format: category-index)
    const category = id.split("-")[0];
    const index = parseInt(id.split("-")[1] || "0");

    // Re-fetch to find specific item
    const news = await getCategoryNews(category);
    const article = news.find(n => n.id === id);

    if (!article) {
        return {
            title: "Article Not Found | P-TEK Intelligence",
        };
    }

    return {
        title: `${article.title} | P-TEK Intelligence`,
        description: article.description,
    };
}

export default async function NewsDetailPage({ params }) {
    const { id } = params;
    const category = id.split("-")[0];

    // Helper to get article data
    // In a real app with permanent IDs, we'd fetch by ID. 
    // Here we re-fetch category and find by matching our generated ID.
    const news = await getCategoryNews(category);
    const article = news.find((item) => item.id === id);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link
                href={`/${category}`}
                className="inline-flex items-center text-sm text-ptek-blue mb-8 hover:underline"
            >
                ← Back to {category.charAt(0).toUpperCase() + category.slice(1)} News
            </Link>

            <article className="glass-panel p-8 md:p-12 rounded-2xl border border-gray-800">
                <header className="mb-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="bg-white/10 px-2 py-1 rounded text-white">{article.source}</span>
                        <span>{new Date(article.publishedAt).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                        {article.title}
                    </h1>
                </header>

                <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-xl border border-gray-800">
                    <img
                        src={article.image || "/fallback.jpg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p className="lead text-xl text-white mb-6 font-light">{article.description}</p>
                    <p>{article.content}</p>
                    {/* GNews often truncates content. We provide a link to full source. */}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex justify-center">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-ptek-blue transition-colors flex items-center gap-2"
                    >
                        Read Full Article at Source
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                </div>
            </article>
        </div>
    );
}
