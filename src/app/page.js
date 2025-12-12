import Link from 'next/link';
import { getAllNews } from '../lib/rss';
import Ticker from '../components/Ticker';
import NewsCard from '../components/NewsCard';
import { ArrowRight } from 'lucide-react';

export const dynamic = "force-dynamic";     // FIX 1
export const revalidate = 3600;             // FIX 2

export default async function Home() {
    const data = await getAllNews();
    const { world, tech, finance, breaking } = data;

    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
                    from-blue-900/20 via-black to-black opacity-60 z-0"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[600px] h-[600px] bg-ptek-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-ptek-blue/30 
                        bg-ptek-blue/10 backdrop-blur text-xs font-mono text-ptek-blue mb-4">
                        :: SYSTEM ONLINE :: LIVE FEED ACTIVE
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            Real-Time AI Powered
                        </span><br />
                        <span className="text-ptek-blue text-glow">Breaking News</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                        Global intelligence network aggregating World, Tech, and Finance updates.
                    </p>
                </div>
            </section>

            {/* TICKER */}
            <div className="sticky top-16 z-40">
                <Ticker news={breaking} />
            </div>

            {/* GRID SECTION */}
            <section className="container mx-auto px-4 py-20 space-y-20">
                {/* 3 COLUMNS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* WORLD */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> World
                            </h2>
                            <Link href="/world" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            {world.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal={true} />
                            ))}
                        </div>
                    </div>

                    {/* TECH */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Tech
                            </h2>
                            <Link href="/tech" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            {tech.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal={true} />
                            ))}
                        </div>
                    </div>

                    {/* FINANCE */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Finance
                            </h2>
                            <Link href="/finance" className="text-xs text-ptek-blue hover:text-white transition-colors flex items-center gap-1">
                                VIEW ALL <ArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            {finance.slice(0, 3).map(item => (
                                <NewsCard key={item.id} article={item} minimal={true} />
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}