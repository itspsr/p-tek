export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-fade-in max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">About P-TEK</h1>

            <div className="prose prose-invert prose-lg mx-auto">
                <p>
                    P-TEK Intelligence is a next-generation news aggregation platform designed to deliver
                    high-speed, verified global intelligence to decision-makers and enthusiasts alike.
                </p>
                <p>
                    Built on advanced algorithms and powered by real-time data ingestion, our system scans
                    thousands of sources to bring you the most relevant updates in World Politics, Technology,
                    and Global Finance.
                </p>
                <p>
                    We believe in a future where information is instantaneous, transparent, and accessible.
                    Our mission is to declutter the noise and provide pure signal.
                </p>
            </div>

            <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur">
                <h3 className="text-xl font-bold text-ptek-blue mb-4">Privacy First</h3>
                <p className="text-gray-400 text-sm">
                    We do not track you. We do not sell your data. P-TEK operates on a strictly anonymous
                    read-only basis. Your intellectual sovereignty is paramount.
                </p>
            </div>
        </div>
    );
}
