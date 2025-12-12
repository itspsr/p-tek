export default function Ticker({ news = [] }) {
    if (!news.length) return null;

    // Flatten the news if passed as object or just use as is
    const headlines = news.map(n => ({
        title: n.title,
        id: n.id,
        category: n.category
    }));

    return (
        <div className="w-full bg-black/50 border-y border-white/5 backdrop-blur-sm overflow-hidden h-10 flex items-center relative">
            <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>
            <div className="absolute left-0 z-20 px-4 h-full flex items-center bg-black border-r border-ptek-blue/30 text-xs font-bold text-ptek-blue uppercase tracking-widest">
                BREAKING
            </div>

            <div className="animate-ticker whitespace-nowrap flex items-center gap-12 pl-[100%]">
                {headlines.map((item, idx) => (
                    <span key={`${item.id}-${idx}`} className="text-sm text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="font-mono text-gray-400 text-xs">[{item.category}]</span>
                        <span className="font-medium">{item.title}</span>
                    </span>
                ))}
                {/* Duplicate for infinite loop illusion simple trick without complex JS */}
                {headlines.map((item, idx) => (
                    <span key={`dup-${item.id}-${idx}`} className="text-sm text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="font-mono text-gray-400 text-xs">[{item.category}]</span>
                        <span className="font-medium">{item.title}</span>
                    </span>
                ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"></div>
        </div>
    );
}
