import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Share2, Clock } from "lucide-react";
import { getAllNews, formatDate } from "@/lib/rss";

export const revalidate = 3600;

// -------------------------------
// generateStaticParams (ONLY ONCE)
// -------------------------------
export async function generateStaticParams() {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];

  return all.map((item) => ({
    slug: item.id,
  }));
}

// -------------------------------
// LOAD ARTICLE
// -------------------------------
async function getArticle(slug) {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];
  return all.find((a) => a.id === slug) || null;
}

// -------------------------------
// PAGE METADATA
// -------------------------------
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found | P-TEK" };

  return {
    title: `${article.title} | P-TEK Intelligence`,
    description: article.summary,
  };
}

// -------------------------------
// PAGE COMPONENT
// -------------------------------
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link href="/" className="px-6 py-2 bg-ptek-blue text-black font-bold rounded-full hover:bg-white transition-colors">
          Return to HQ
        </Link>
      </div>
    );
  }

  const safeThumbnail = article.thumbnail || "/fallback.jpg";

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm">
        <ArrowLeft size={16} className="mr-2" />
        Back to Feed
      </Link>

      <h1 className="text-3xl font-bold text-white mt-6 mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 text-gray-400 mb-4">
        <span className="px-3 py-1 bg-ptek-blue/10 border border-ptek-blue/20 rounded">
          {article.category}
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <Clock size={14} />
          {formatDate(article.date)}
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
        <Image
          src={safeThumbnail}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{article.summary}</p>

      <div className="mt-10 flex items-center justify-between">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-ptek-blue text-black font-bold rounded-full hover:bg-white transition-colors"
        >
          Open Original
          <ExternalLink size={18} className="ml-2" />
        </a>

        <button className="text-gray-400 hover:text-white transition-colors">
          <Share2 size={20} />
        </button>
      </div>
    </article>
  );
}