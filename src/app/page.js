import Link from 'next/link';
import { getAllNews } from '../lib/rss';
import Ticker from '../components/Ticker';
import NewsCard from '../components/NewsCard';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export default async function Home() {
    const data = await getAllNews();
    const { world, tech, finance, breaking } = data;

    return (
        <div className="flex flex-col min-h-screen">

            {/* ================= HERO ================= */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-36 overflow-hidden">

                {/* Futuristic Dark Glow Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18),rgba(0,0,0,1))] opacity-80"></div>

                {/* Soft Ambient Light */}
                <div className="absolute w-[750px] h-[750px] bg-blue-500/10 rounded-full blur-[180px]"></div>

                {/* MAIN TITLE */}
                <div className="relative z-10 max-w-5xl mx-auto space-y-8">

                    <h1 className="leading-[1.1] font-extrabold tracking-tight">

                        <span className="block text-5xl md:text-7xl bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text hero-outer-glow">
                            Real-Time AI Powered
                        </span>

                        <span className="block text-6xl md:text-8xl mt-2 font-extrabold text-white text-glow hero-inner-glow">
                            BREAKING NEWS
                        </span>
                    </h1>

                    {/* SUB-TEXT */}
                    <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                        The fastest, most accurate <span className="text-ptek-blue">AI-driven intelligence feed</span> across the globe.
                    </p>

                    {/* STATUS CHIP */}
                    <div className="inline-flex items-center px-6 py-2 border border-cyan-400/40 
                        bg-black/40 backdrop-blur-xl rounded-full text-xs font-mono 
                        text-cyan-300 tracking-widest shadow-[0_0_18px_rgba(0,200,255,0.4)]">
                        :: SYSTEM ACTIVE • FEED SYNCED ::
                    </div>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 animate-bounce text-gray-400 text-sm tracking-widest">
                    SCROLL ↓
                </div>

            </section>

            {/* ================= TICKER ================= */}
            <div className="sticky top-16 z-40">
                <Ticker news={breaking} />
            </div>

            {/* ================= GRID SECTION ================= */}
            <section className="container mx-auto px-4 py-24 space-y-24 page-transition">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* WORLD */}
                    <CategoryColumn 
                        title="World"
                        color="bg-blue-500"
                        items={world}
                    />

                    {/* TECH */}
                    <CategoryColumn 
                        title="Tech"
                        color="bg-purple-500"
                        items={tech}
                    />

                    {/* FINANCE */}
                    <CategoryColumn 
                        title="Finance"
                        color="bg-green-500"
                        items={finance}
                    />

                </div>

            </section>

        </div>
    );
}


function CategoryColumn({ title, color, items }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 ${color} rounded-full`}></span> {title}
                </h2>
                <Link href={`/${title.toLowerCase()}`} 
                    className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                    VIEW ALL <ArrowRight size={12} />
                </Link>
            </div>
            <div className="space-y-6">
                {items.slice(0, 3).map((item) => (
                    <NewsCard key={item.id} article={item} minimal />
                ))}
            </div>
        </div>
    );
}