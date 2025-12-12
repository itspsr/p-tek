import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 glass-panel border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="group">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ptek-blue to-ptek-purple hover:to-white transition-all duration-300">
                            P-TEK Intelligence
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-1 md:gap-6 text-sm font-medium text-gray-300 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                    {[
                        { name: "Home", href: "/" },
                        { name: "World", href: "/world" },
                        { name: "Tech", href: "/tech" },
                        { name: "Finance", href: "/finance" },
                        { name: "About", href: "/about" },
                        { name: "Contact", href: "/contact" },
                        { name: "Privacy", href: "/privacy" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-ptek-blue transition-colors whitespace-nowrap"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
