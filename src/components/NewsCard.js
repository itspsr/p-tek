import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { timeAgo } from "../lib/utils";

export default function NewsCard({ article, minimal = false }) {
  if (!article) return null;

  return (
    <Link
      href={`/articles/${encodeURIComponent(article.id)}`}
      className="group block overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-ptek-blue/40 shadow-lg hover:shadow-ptek-blue/20 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className={`relative ${minimal ? "h-32" : "h-56"} w-full overflow-hidden`}>
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* CATEGORY LABEL */}
        <span className="absolute bottom-3 left-3 text-xs font-mono px-3 py-1 rounded-full bg-black/40 border border-ptek-blue/30 text-ptek-blue backdrop-blur">
          {article.category.toUpperCase()}
        </span>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-4 space-y-3">
        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{article.source}</span>
          <span>{timeAgo(article.date)}</span>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-white group-hover:text-ptek-blue transition-colors ${
            minimal ? "text-sm" : "text-lg"
          }`}
        >
          {article.title}
        </h3>

        {/* Summary */}
        {!minimal && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {article.summary.replace(/<[^>]*>?/gm, "")}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center text-xs text-ptek-blue pt-2 font-semibold group-hover:translate-x-1 transition-transform">
          READ INTEL <ArrowUpRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </Link>
  );
}