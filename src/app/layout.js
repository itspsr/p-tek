import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoTop from "../components/GoTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "P-TEK Intelligence | Real-Time AI Powered Breaking News",
    description: "Fastest, most accurate intelligence feed for the modern world. Covering World, Tech, and Finance news.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col bg-black">
                    
                    {/* 🔵 FIXED HEADER ALWAYS AT TOP */}
                    <Header />

                    {/* 🔵 MAIN CONTENT */}
                    <main className="flex-1 w-full">
                        {children}
                    </main>

                    {/* 🔵 FOOTER */}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
