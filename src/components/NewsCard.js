"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { timeAgo } from "../lib/utils";  // ✅ Correct path

export default function NewsCard({ article, minimal = false }) {
    if (!article) return null;

    let safeThumbnail = "/fallback.jpg";

    if (article.thumbnail) {
        if (article.thumbnail.startsWith("//")) {
            safeThumbnail = "https:" + article.thumbnail;
        } else if (article.thumbnail.startsWith("http")) {
            safeThumbnail = article.thumbnail;
        }
    }

    return (
        <Link
            href={`/articles/${article.id}`}  
            className="group glass-card block overflow-hidden"
        >
            <div className={`relative ${minimal ? "h-32" : "h-48"} w-full overflow-hidden`}>
                <Image
                    src={safeThumbnail}
                    alt={article.title || "News Image"}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono text-ptek-blue uppercase tracking-wider bg-black/50 px-2 py-1 rounded border border-ptek-blue/20">
                        {article.category}
                    </span>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>{article.source}</span>
                    <span>{timeAgo(article.date)}</span>
                </div>

                <h3 className={`font-semibold text-gray-100 group-hover:text-ptek-blue transition-colors ${minimal ? "text-sm" : "text-lg"}`}>
                    {article.title}
                </h3>

                {!minimal && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                        {(article.summary || "").replace(/<[^>]*>?/gm, "")}
                    </p>
                )}

                <div className="flex items-center text-xs text-ptek-blue font-medium mt-auto pt-2">
                    READ INTEL
                    <ArrowUpRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}