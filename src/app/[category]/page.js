import Link from "next/link";
import { getCategoryNews } from "../../lib/rss";
import NewsCard from "../../components/NewsCard";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600;

export function generateStaticParams() {
  return [
    { category: "world" },
    { category: "tech" },
    { category: "finance" },
  ];
}

export default async function CategoryPage({ params }) {
  const category = params.category.toLowerCase();

  const news = await getCategoryNews(category, 50);
  const title =
    category.charAt(0).toUpperCase() + category.slice(1) + " Intelligence";

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <Link
          href="/"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <ArrowLeft size={24} />
        </Link>

        <div>
          <span className="text-ptek-blue font-mono text-sm tracking-widest uppercase">
            Intelligence Feed
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-1">
            {title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} article={item} />
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No intelligence reports available for this sector at the moment.
        </div>
      )}
    </div>
  );
}