import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Share2, Clock } from "lucide-react";
import { getAllNews, formatDate } from "../../../lib/rss";

export const revalidate = 3600;

async function getArticle(slug) {
  const all = await getAllNews();
  return all.find((a) => a.id === slug) || null;
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found | P-TEK" };

  return {
    title: `${article.title} | P-TEK Intelligence`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link
          href="/"
          className="px-6 py-2 bg-ptek-blue text-black font-bold rounded-full hover:bg-white transition-colors"
        >
          Return to HQ
        </Link>
      </div>
    );
  }

  const safeThumbnail = article.thumbnail || "/fallback.jpg";

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
      <Link
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Feed
      </Link>

      <h1 className="text-3xl font-bold text-white mt-6">{article.title}</h1>

      <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
        <span className="px-3 py-1 bg-ptek-blue/10 border border-ptek-blue/20 rounded">
          {article.category}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={14} />
          {formatDate(article.date)}
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden mt-6 shadow-2xl">
        <Image
          src={safeThumbnail}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <p className="mt-6 text-gray-300 leading-relaxed whitespace-pre-line">
        {article.summary}
      </p>

      <div className="flex justify-between items-center mt-8">
        <span className="text-gray-400 text-sm">
          Source: {article.source}
        </span>

        <div className="flex gap-4">
          <a href={article.link} target="_blank" className="text-gray-400 hover:text-white">
            <ExternalLink size={20} />
          </a>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}