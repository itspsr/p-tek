import NewsCard from "../../components/NewsCard";
import { getCategoryNews } from "../../../lib/fetchNews";

export const metadata = {
    title: "World News | P-TEK Intelligence",
    description: "Global breaking news and geopolitical updates.",
};

export default async function WorldPage() {
    const news = await getCategoryNews("world");

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 border-b border-gray-800 pb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
                   World Intelligence
                </h1>
                <p className="text-xl text-gray-400">
                    Global developments, geopolitical shifts, and international affairs.
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
