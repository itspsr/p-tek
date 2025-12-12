import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/95 backdrop-blur-xl py-12 mt-20">
            <div className="container mx-auto px-4">

                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">

                    {/* BRANDING */}
                    <div className="text-center md:text-left max-w-sm space-y-2">
                        <h3 className="text-white text-2xl font-black tracking-tight">
                            P-TEK <span className="text-ptek-blue">Intelligence</span>
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            Real-time autonomous intelligence engine delivering the fastest,
                            algorithm-driven updates across World, Tech & Finance.
                        </p>
                    </div>

                    {/* LINKS + SOCIAL */}
                    <div className="flex flex-col md:flex-row items-center gap-8">

                        {/* QUICK LINKS */}
                        <div className="flex gap-6 text-sm">
                            <Link href="/about" className="text-gray-400 hover:text-ptek-blue transition-colors">
                                About
                            </Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-ptek-blue transition-colors">
                                Privacy
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-ptek-blue transition-colors">
                                Contact
                            </Link>
                        </div>

                        {/* SEPARATOR */}
                        <div className="hidden md:block h-6 w-px bg-white/10"></div>

                        {/* SOCIAL ICONS */}
                        <div className="flex gap-5">
                            <a
                                href="https://www.linkedin.com/in/data-by-pratik/"
                                target="_blank"
                                className="text-gray-400 hover:text-[#0A66C2] hover:scale-110 transition-all"
                            >
                                <Linkedin size={22} />
                            </a>
                            <a
                                href="https://github.com/itspsr"
                                target="_blank"
                                className="text-gray-400 hover:text-white hover:scale-110 transition-all"
                            >
                                <Github size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BOTTOM COPYRIGHT */}
                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs tracking-wide">
                        © 2025 P-TEK Intelligence Systems. Engineered & Maintained by Pratik Kumar.
                    </p>
                </div>
            </div>
        </footer>
    );
}