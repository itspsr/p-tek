import NewsCard from "../../components/NewsCard";
import { getCategoryNews } from "../../../lib/fetchNews";

export const metadata = {
    title: "Global Finance | P-TEK Intelligence",
    description: "Market trends, crypto analysis, and economic forecasting.",
};

export default async function FinancePage() {
    const news = await getCategoryNews("finance");

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 border-b border-gray-800 pb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
                    Global Finance
                </h1>
                <p className="text-xl text-gray-400">
                    Real-time market analysis, cryptocurrency trends, and economic shifts.
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
