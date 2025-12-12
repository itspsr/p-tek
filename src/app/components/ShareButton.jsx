"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ url, title }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: title || "News",
        url: url || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(url || window.location.href);
      alert("Link copied!");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Share2 size={20} />
    </button>
  );
}