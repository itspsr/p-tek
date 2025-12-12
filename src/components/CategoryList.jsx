import Link from "next/link";

export default function CategoryList() {
    const categories = [
        {
            id: "world",
            name: "World Intelligence",
            description: "Global geopolitical and social developments.",
            color: "from-blue-500 to-cyan-500",
            delay: "0",
        },
        {
            id: "tech",
            name: "Tech Systems",
            description: "Breakthroughs in AI, Quantum, and Cybernetics.",
            color: "from-purple-500 to-pink-500",
            delay: "100",
        },
        {
            id: "finance",
            name: "Global Finance",
            description: "Market shifts, crypto, and economic forecasting.",
            color: "from-emerald-500 to-teal-500",
            delay: "200",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 -mt-20 relative z-10">
            {categories.map((cat) => (
                <Link key={cat.id} href={`/${cat.id}`} className="group block">
                    <div className={`
            glass-panel p-8 rounded-2xl h-full card-hover
            border-t-4 border-transparent hover:border-ptek-blue
            flex flex-col
          `}>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-ptek-blue transition-colors">
                            {cat.name}
                        </h3>
                        <p className="text-gray-400 mb-6 flex-1">
                            {cat.description}
                        </p>
                        <div className="flex items-center text-sm font-mono text-gray-500 group-hover:text-white transition-colors">
                            ACCESS FEED <span className="ml-2">::</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
