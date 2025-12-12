import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import ShareButton from "../../components/ShareButton";
import { getAllNews, formatDate } from "../../../lib/rss";

export const revalidate = 3600;

/* STATIC PATHS */
export async function generateStaticParams() {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];

  return all.map((item) => ({
    slug: item.id, // NO ENCODING
  }));
}

/* FIND ARTICLE */
async function getArticle(slug) {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];

  return all.find((a) => a.id === slug) || null; // EXACT MATCH
}

/* META */
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return { title: "Article Not Found | P-TEK Intelligence" };
  }

  return {
    title: `${article.title} | P-TEK Intelligence`,
    description: article.summary,
  };
}

/* PAGE */
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link href="/" className="px-6 py-2 bg-ptek-blue text-black font-bold rounded-full">
          Return to HQ
        </Link>
      </div>
    );
  }

  const img =
    article.thumbnail?.startsWith("//")
      ? "https:" + article.thumbnail
      : article.thumbnail || "/fallback.jpg";

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white text-sm mb-4">
        <ArrowLeft size={16} className="mr-2" />
        Back to Feed
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-4 text-gray-400 mb-6">
        <span className="px-3 py-1 bg-ptek-blue/10 border border-ptek-blue/20 rounded">
          {article.category}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={14} />
          {formatDate(article.date)}
        </span>
      </div>

      {/* IMAGE */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/10">
        <Image src={img} alt={article.title} fill className="object-cover" unoptimized />
      </div>

      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
        {article.summary}
      </p>

      <div className="mt-10 flex justify-between items-center">
        <a
          href={article.link}
          target="_blank"
          className="bg-ptek-blue px-8 py-3 rounded-full text-black font-bold hover:bg-white transition"
        >
          Open Original <ExternalLink className="inline ml-2" size={18} />
        </a>

        <ShareButton url={article.link} title={article.title} />
      </div>
    </article>
  );
}