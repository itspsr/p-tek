import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-2xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* LEFT SIDE - LOGO + NAV */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 group">

                        {/* LOGO ICON */}
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-ptek-blue to-ptek-purple 
                            flex items-center justify-center font-extrabold text-black text-sm 
                            group-hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] transition-all duration-300">
                            PT
                        </div>

                        {/* BRANDING */}
                        <div className="flex flex-col leading-tight">
                            <span className="font-bold text-lg tracking-tight text-white group-hover:text-ptek-blue transition-colors">
                                P-TEK
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                Intelligence
                            </span>
                        </div>
                    </Link>

                    {/* NAVIGATION */}
                    <nav className="hidden md:flex items-center gap-6 font-medium text-gray-400">
                        {['World', 'Tech', 'Finance'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="uppercase text-xs tracking-wide hover:text-ptek-blue transition-all"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* RIGHT SIDE - SEARCH BAR (Disabled) */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search disabled"
                            disabled
                            className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 
                            text-sm text-gray-300 w-64 opacity-70 cursor-not-allowed focus:outline-none"
                        />
                    </div>
                </div>

            </div>
        </header>
    );
}