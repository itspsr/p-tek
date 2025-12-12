import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";

import { getAllNews } from "../../../lib/rss";
import { formatDate } from "../../../lib/utils";
import ShareButton from "../../components/ShareButton";

export const revalidate = 3600;

/* STATIC PATHS */
export async function generateStaticParams() {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];

  return all.map((item) => ({
    slug: item.id
  }));
}

/* GET ARTICLE */
async function getArticle(slug) {
  const { world, tech, finance } = await getAllNews();
  const all = [...world, ...tech, ...finance];

  return all.find((a) => a.id === slug) || null;
}

/* META */
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article Not Found | P-TEK" };

  return {
    title: `${article.title} | P-TEK Intelligence`,
    description: article.summary
  };
}

/* PAGE */
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col">
        <h1 className="text-white text-2xl mb-3">Article Not Found</h1>
        <Link href="/" className="bg-ptek-blue px-6 py-2 rounded-full">
          Return to HQ
        </Link>
      </div>
    );
  }

  const img = article.thumbnail || "/fallback.jpg";

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">

      <Link href="/" className="text-gray-400 text-sm flex items-center mb-4 hover:text-white">
        <ArrowLeft size={16} className="mr-2" /> Back to Feed
      </Link>

      <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-4 text-gray-400 mb-6">
        <span className="px-3 py-1 bg-ptek-blue/10 border border-ptek-blue/20 rounded">
          {article.category}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={14} /> {formatDate(article.date)}
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
        <Image src={img} alt={article.title} fill className="object-cover" />
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
          Open Original <ExternalLink size={18} className="inline ml-2" />
        </a>

        <ShareButton url={article.link} title={article.title} />
      </div>
    </article>
  );
}