import NewsCard from "../../components/NewsCard";
import { getCategoryNews } from "../../../lib/fetchNews";

export const metadata = {
    title: "Tech Systems | P-TEK Intelligence",
    description: "The latest in AI, Quantum Computing, and Future Tech.",
};

export default async function TechPage() {
    const news = await getCategoryNews("tech");

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 border-b border-gray-800 pb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
                    Tech Systems
                </h1>
                <p className="text-xl text-gray-400">
                    Breakthroughs in artificial intelligence, hardware, and cybernetics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <div key={item.id} className="h-full">
                        <NewsCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
