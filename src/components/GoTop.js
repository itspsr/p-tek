"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function GoTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-ptek-blue text-black font-bold p-3 rounded-full shadow-lg hover:shadow-ptek-blue/40 transition-all"
      aria-label="Go to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
