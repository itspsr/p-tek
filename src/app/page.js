import Link from "next/link";
import { getAllNews } from "../lib/rss";
import Ticker from "../components/Ticker";
import NewsCard from "../components/NewsCard";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
    const data = await getAllNews();
    const { world, tech, finance, breaking } = data;

    return (
        <div className="flex flex-col min-h-screen">

            {/* ================= HERO SECTION ================= */}
            <section className="relative flex flex-col items-center justify-center text-center px-4 py-32 overflow-hidden">

                {/* Background Galaxy Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,140,255,0.18),rgba(0,0,0,0.9))]"></div>

                {/* Neon Aura Layer */}
                <div className="absolute w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[200px] opacity-40"></div>
                <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[180px] opacity-30"></div>

                {/* Brand Title Floating */}
                <h1 className="absolute top-10 left-8 text-3xl font-extrabold tracking-tight">
                    <span className="hero-gradient hero-outer-glow text-transparent bg-clip-text">
                        P-TEK Intelligence
                    </span>
                </h1>

                {/* MAIN HERO CONTENT */}
                <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight space-y-2">
                        <span className="block hero-gradient hero-outer-glow">
                            Real-Time AI
                        </span>
                        <span className="block hero-gradient hero-inner-glow">
                            Powered
                        </span>
                        <span className="block text-6xl md:text-8xl text-glow text-white">
                            Breaking News
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Fastest, most accurate intelligence feed for the modern world.
                    </p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center px-6 py-2 border border-ptek-blue/40 
                        bg-black/30 backdrop-blur-lg rounded-full text-xs font-mono tracking-wider text-ptek-blue 
                        shadow-[0_0_20px_rgba(0,140,255,0.4)]">
                        :: SYSTEM ONLINE · INTELLIGENCE ACTIVE ::
                    </div>
                </div>
            </section>

            {/* ================= TICKER ================= */}
            <div className="sticky top-16 z-40">
                <Ticker news={breaking} />
            </div>

            {/* ================= GRID SECTION ================= */}
            <section className="container mx-auto px-4 py-20 space-y-20">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* WORLD */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> World
                            </h2>
                            <Link href="/world" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>

                        <div className="space-y-6">
                            {world.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal />
                            ))}
                        </div>
                    </div>

                    {/* TECH */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Tech
                            </h2>
                            <Link href="/tech" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>

                        <div className="space-y-6">
                            {tech.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal />
                            ))}
                        </div>
                    </div>

                    {/* FINANCE */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Finance
                            </h2>
                            <Link href="/finance" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>

                        <div className="space-y-6">
                            {finance.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}