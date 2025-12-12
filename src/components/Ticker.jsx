"use client";
import { useEffect, useState } from "react";

export default function Ticker() {
    const [items, setItems] = useState([]);

    async function loadNews() {
        try {
            const res = await fetch("/api/ticker.json");
            if (!res.ok) throw new Error("Failed to fetch ticker");
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Ticker fetch error:", error);
        }
    }

    useEffect(() => {
        loadNews();
        const interval = setInterval(loadNews, 3600000); // 60 minutes
        return () => clearInterval(interval);
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="w-full bg-black/80 border-b border-gray-800 backdrop-blur-sm overflow-hidden h-10 flex items-center">
            <div className="bg-ptek-blue text-black font-bold px-4 h-full flex items-center z-10">
                BREAKING
            </div>
            <div className="ticker-wrap flex-1 overflow-hidden whitespace-nowrap">
                {/* Using CSS animation as requested option or marquee tag as fallback/simple implementation 
            since JSX marquee is deprecated but supported in browsers, users prompt explicitly suggested <marquee> OR CSS.
            I'll use a marquee-like simple CSS implementation or just the <marquee> tag as user provided in example code.
        */}
                <marquee
                    behavior="scroll"
                    direction="left"
                    className="text-white text-sm font-mono py-2"
                    scrollamount="5"
                >
                    {items.map((n, i) => (
                        <span key={i} className="mx-8">
                            <span className="text-ptek-blue mr-2">[{n.category.toUpperCase()}]</span>
                            {n.title}
                        </span>
                    ))}
                </marquee>
            </div>
        </div>
    );
}
