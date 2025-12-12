import createMetadata from "next"; // Assuming default meta or manual
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "P-TEK Intelligence | Real-Time AI Powered Breaking News",
    description: "Fastest, most accurate intelligence feed for the modern world. Covering World, Tech, and Finance news.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 flex flex-col">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
