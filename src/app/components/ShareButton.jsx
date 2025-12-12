"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ url, title }) {
  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
    >
      <Share2 size={20} />
    </button>
  );
}