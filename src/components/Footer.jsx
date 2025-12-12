import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-black/50 py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400 mb-4">
                    &copy; {new Date().getFullYear()} P-TEK Intelligence. All rights reserved.
                </p>
                <div className="flex justify-center gap-6 text-sm text-gray-500">
                    <Link href="/about" className="hover:text-ptek-blue transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-ptek-blue transition-colors">
                        Contact
                    </Link>
                    <Link href="/privacy" className="hover:text-ptek-blue transition-colors">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
