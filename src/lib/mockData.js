export const MOCK_NEWS = {
    world: [
        {
            id: "mock-w-1",
            title: "Global Summit Reaches Historic Agreement on Climate Action",
            summary: "Leaders from over 100 nations have signed a binding agreement to reduce carbon emissions by 40% within the next decade.",
            date: new Date().toISOString(),
            thumbnail: "/fallback.jpg",
            source: "Reuters",
            link: "#",
            category: "World"
        },
        {
            id: "mock-w-2",
            title: "Breakthrough in Renewable Energy Storage Technology",
            summary: "Scientists have unveiled a new battery technology that could revolutionize how we store solar and wind energy.",
            date: new Date(Date.now() - 3600000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "BBC",
            link: "#",
            category: "World"
        },
        {
            id: "mock-w-3",
            title: "Major Diplomatic Visit Scheduled for Next Week",
            summary: "Top diplomats are set to meet in Geneva to discuss ongoing peace treaties.",
            date: new Date(Date.now() - 7200000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "Guardian",
            link: "#",
            category: "World"
        }
    ],
    tech: [
        {
            id: "mock-t-1",
            title: "AI Model Surpasses Human Performance in Medical Diagnosis",
            summary: "A new AI model has demonstrated 99% accuracy in diagnosing rare diseases, outperforming improved human specialists.",
            date: new Date().toISOString(),
            thumbnail: "/fallback.jpg",
            source: "TechCrunch",
            link: "#",
            category: "Tech"
        },
        {
            id: "mock-t-2",
            title: "The Future of Quantum Computing is Here",
            summary: "Google and IBM announce major milestones in qubit stability.",
            date: new Date(Date.now() - 5000000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "Verge",
            link: "#",
            category: "Tech"
        },
        {
            id: "mock-t-3",
            title: "New Smartphone Battery lasts 7 Days",
            summary: "Revolutionary graphene battery tech promises week-long battery life for flagship phones.",
            date: new Date(Date.now() - 10000000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "Ars Technica",
            link: "#",
            category: "Tech"
        }
    ],
    finance: [
        {
            id: "mock-f-1",
            title: "Markets Rally as Inflation Data Shows Improvement",
            summary: "Global stock markets hit record highs today following positive inflation reports from major economies.",
            date: new Date().toISOString(),
            thumbnail: "/fallback.jpg",
            source: "CNBC",
            link: "#",
            category: "Finance"
        },
        {
            id: "mock-f-2",
            title: "Crypto Regulation Talks begin in EU Parliament",
            summary: "European lawmakers are drafting comprehensive regulations for digital assets.",
            date: new Date(Date.now() - 8640000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "CoinDesk",
            link: "#",
            category: "Finance"
        },
        {
            id: "mock-f-3",
            title: "Tech Stocks Surge on AI Hype",
            summary: "NVIDIA and Microsoft lead the charge as AI continues to drive market growth.",
            date: new Date(Date.now() - 14000000).toISOString(),
            thumbnail: "/fallback.jpg",
            source: "Bloomberg",
            link: "#",
            category: "Finance"
        }
    ]
};
