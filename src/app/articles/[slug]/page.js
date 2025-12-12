import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Clock } from "lucide-react";
import ShareButton from "../../components/ShareButton";
import { getAllNews } from "../../../lib/rss";
import { formatDate } from "../../../lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { world, tech, finance } = await getAllNews();
  return [...world, ...tech, ...finance].map((i) => ({
    slug: i.id,
  }));
}

async function getArticleById(slug) {
  const { world, tech, finance } = await getAllNews();
  return [...world, ...tech, ...finance].find((i) => i.id === slug) || null;
}

export default async function ArticlePage({ params }) {
  const article = await getArticleById(params.slug);

  if (!article)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-white text-3xl mb-4">Article Not Found</h1>
        <Link href="/" className="bg-ptek-blue px-6 py-2 rounded-full">
          Return Home
        </Link>
      </div>
    );

  return (
    <article className="container mx-auto px-4 max-w-4xl py-10">
      <Link href="/" className="text-gray-400 flex items-center mb-4 hover:text-white">
        <ArrowLeft size={16} className="mr-2" /> Back
      </Link>

      <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>

      <div className="flex items-center gap-4 text-gray-400 mb-6">
        <span className="px-3 py-1 bg-ptek-blue/10 border border-ptek-blue/20 rounded">
          {article.category}
        </span>

        <span className="flex items-center gap-2">
          <Clock size={14} /> {formatDate(article.date)}
        </span>
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
        <Image src={article.thumbnail} alt={article.title} fill className="object-cover" />
      </div>

      <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
        {article.summary}
      </p>

      <div className="mt-10 flex justify-between items-center">
        <a
          href={article.link}
          target="_blank"
          className="px-6 py-3 rounded-full bg-ptek-blue text-black font-bold hover:bg-white transition"
        >
          Open Original <ExternalLink size={16} className="inline ml-2" />
        </a>

        <ShareButton url={article.link} title={article.title} />
      </div>
    </article>
  );
}