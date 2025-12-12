import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-ptek-blue to-ptek-purple flex items-center justify-center font-bold text-black text-sm group-hover:shadow-[0_0_15px_rgba(0,242,254,0.5)] transition-shadow">
                            PT
                        </div>
                        <span className="font-bold text-xl tracking-tighter text-white">
                            P-TEK
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                        {['World', 'Tech', 'Finance'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="hover:text-ptek-blue transition-colors uppercase tracking-wide text-xs"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            disabled
                            className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-gray-300 focus:outline-none focus:border-ptek-blue/50 w-64 cursor-not-allowed opacity-70"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
