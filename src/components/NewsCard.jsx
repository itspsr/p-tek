"use client";
import Link from "next/link";

export default function NewsCard({ item }) {
    // item structure matches fetchNews output
    // id, title, description, url, image, publishedAt, source, content

    // NOTE: For static export, we cannot have dynamic routes for *every* article unless we know them at build time.
    // The plan allows reading detail page. We passed `id` in fetchNews.
    // We will link to internal page `/news/${item.id}` if we want to show detail page,
    // OR the user might expect it to link to external URL. 
    // Requirement: "Clicking opens full news article detail page".
    // AND: "project must export cleanly ... static export".
    // This implies we generate dynamic pages for these 10 items per category at build time.

    // Handling image fallback logic here just in case, though parent often handles it.

    return (
        <Link href={`/news/${item.id}`} className="block h-full">
            <article className="h-full card-hover bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={item.image || "/fallback.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/fallback.jpg";
                        }}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-xs px-2 py-1 rounded text-white border border-gray-700">
                        {item.source}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="text-ptek-blue text-xs font-mono mb-2">
                        {new Date(item.publishedAt).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-ptek-blue transition-colors line-clamp-2">
                        {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                        {item.description}
                    </p>
                    <div className="text-ptek-purple text-sm font-semibold flex items-center mt-auto">
                        Read Intel <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
