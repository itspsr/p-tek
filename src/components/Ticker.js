export default function Ticker({ news = [] }) {
    if (!news.length) return null;

    // Flatten news items for clean mapping
    const headlines = news.map(n => ({
        title: n.title,
        id: n.id,
        category: n.category
    }));

    return (
        <div className="w-full bg-black/50 border-y border-white/5 backdrop-blur-sm overflow-hidden h-10 flex items-center relative">
            
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>

            {/* BREAKING LABEL */}
            <div className="absolute left-0 z-20 px-4 h-full flex items-center bg-black border-r border-ptek-blue/30 text-xs font-bold text-ptek-blue uppercase tracking-widest">
                BREAKING
            </div>

            {/* Ticker Row */}
            <div className="animate-ticker flex items-center gap-12 ml-[140px]">
                {/* Loop Items */}
                {headlines.map((item) => (
                    <span key={item.id} className="text-sm text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="font-mono text-gray-400 text-xs">[{item.category}]</span>
                        <span className="font-medium">{item.title}</span>
                    </span>
                ))}

                {/* DUPLICATE COPY — Makes Infinite Loop Seamless */}
                {headlines.map((item) => (
                    <span key={`dup-${item.id}`} className="text-sm text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="font-mono text-gray-400 text-xs">[{item.category}]</span>
                        <span className="font-medium">{item.title}</span>
                    </span>
                ))}
            </div>

            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none"></div>
        </div>
    );
}