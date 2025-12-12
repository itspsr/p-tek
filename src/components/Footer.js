import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="font-bold text-white text-lg tracking-tighter">P-TEK INTELLIGENCE</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            Real-time automated news aggregator powered by advanced algorithms.
                            Delivering the fastest intelligence for the modern world.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <Link href="/about" className="text-gray-400 hover:text-white text-sm">About</Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
                        </div>

                        <div className="h-4 w-px bg-gray-800"></div>

                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
                    &copy; 2025 P-TEK Intelligence Logic Systems. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
