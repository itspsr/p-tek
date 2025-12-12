export default function Ticker({ news = [] }) {
    if (!news.length) return null;

    // clean headlines
    const headlines = news.map((n) => ({
        id: n.id,
        title: n.title,
        category: n.category?.toUpperCase() || "NEWS",
    }));

    // duplicate list for infinite loop
    const items = [...headlines, ...headlines];

    return (
        <div className="w-full h-10 bg-black/50 border-y border-white/10 backdrop-blur flex items-center overflow-hidden relative">

            {/* LEFT FADE */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>

            {/* BREAKING LABEL */}
            <div className="absolute left-0 z-30 px-4 h-full flex items-center 
                            bg-black border-r border-ptek-blue/40 
                            text-xs font-mono font-bold text-ptek-blue tracking-widest uppercase">
                BREAKING
            </div>

            {/* MAIN MOVING STRIP */}
            <div className="animate-ticker flex whitespace-nowrap gap-14 ml-[140px]">

                {items.map((item, i) => (
                    <span key={item.id + "-" + i} className="flex items-center gap-3 text-sm text-gray-300">

                        {/* RED DOT */}
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>

                        {/* CATEGORY */}
                        <span className="text-xs font-mono text-gray-400">
                            [{item.category}]
                        </span>

                        {/* TITLE */}
                        <span className="font-medium">{item.title}</span>

                    </span>
                ))}
            </div>

            {/* RIGHT FADE */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
        </div>
    );
}