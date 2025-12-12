"use client";
import { ShieldCheck, Lock, Eye, Database, Globe2, Linkedin } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-gray-300 page-transition">
            
            {/* HEADER */}
            <div className="max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                    Privacy <span className="text-ptek-blue text-glow">Policy</span>
                </h1>
                <p className="text-gray-400 text-lg">
                    How P-TEK Intelligence collects, stores, and protects your data.
                </p>
            </div>

            {/* SECTIONS */}
            <div className="space-y-20 max-w-4xl mx-auto">

                {/* SECTION 1 */}
                <section className="ptek-card">
                    <div className="section-title">
                        <ShieldCheck className="text-ptek-blue" size={28} />
                        <h2>1. Overview</h2>
                    </div>
                    <p className="section-text">
                        P-TEK Intelligence is committed to ensuring the confidentiality,
                        integrity, and security of your information. We focus on
                        transparency, minimal data collection, and responsible technology usage.
                    </p>
                </section>

                {/* SECTION 2 */}
                <section className="ptek-card">
                    <div className="section-title">
                        <Database className="text-ptek-blue" size={28} />
                        <h2>2. Data We Collect</h2>
                    </div>

                    <ul className="section-list">
                        <li>Basic analytics (page activity, device type, interaction time)</li>
                        <li>No passwords or financial information is collected</li>
                        <li>No sensitive personal data is stored</li>
                        <li>Platform search queries (non-identifiable)</li>
                    </ul>

                    <p className="italic text-gray-500 mt-2">
                        *P-TEK NEVER sells or shares your data with advertisers.*
                    </p>
                </section>

                {/* SECTION 3 */}
                <section className="ptek-card">
                    <div className="section-title">
                        <Lock className="text-ptek-blue" size={28} />
                        <h2>3. How Your Data is Protected</h2>
                    </div>

                    <p className="section-text">
                        All collected information is anonymized and processed over secure 
                        encrypted channels. Our systems use enterprise-grade protection techniques.
                    </p>

                    <ul className="section-list">
                        <li>Encrypted requests (HTTPS / TLS 1.3)</li>
                        <li>Firewall-protected cloud infrastructure</li>
                        <li>Zero-access security for private logs</li>
                        <li>Routine vulnerability checks</li>
                    </ul>
                </section>

                {/* SECTION 4 */}
                <section className="ptek-card">
                    <div className="section-title">
                        <Eye className="text-ptek-blue" size={28} />
                        <h2>4. Cookies & Tracking</h2>
                    </div>

                    <p className="section-text">
                        P-TEK uses only minimal, anonymous analytics cookies to measure system performance.
                    </p>

                    <ul className="section-list">
                        <li>No personal identity information is stored</li>
                        <li>No third-party ad tracking is used</li>
                        <li>You may disable cookies anytime from your browser settings</li>
                    </ul>
                </section>

                {/* SECTION 5 */}
                <section className="ptek-card">
                    <div className="section-title">
                        <Globe2 className="text-ptek-blue" size={28} />
                        <h2>5. Third-Party Content</h2>
                    </div>

                    <p className="section-text">
                        P-TEK Intelligence aggregates publicly available news from verified 
                        publishers. These external sources may use independent privacy practices. 
                        However, P-TEK never transmits your personal data to any external entity.
                    </p>
                </section>

                {/* SECTION 6 — CONTACT */}
                <section className="ptek-card">
                    <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                    
                    <p className="section-text mb-4">
                        For privacy-related concerns or questions, you can reach us at:
                        <br />
                        <span className="text-ptek-blue font-semibold">support@ptek-intel.com</span>
                    </p>

                    <a
                        href="https://www.linkedin.com/in/data-by-pratik/"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                                   bg-ptek-blue/20 border border-ptek-blue/40 
                                   text-ptek-blue font-semibold hover:bg-ptek-blue 
                                   hover:text-black transition-all duration-300"
                    >
                        <Linkedin size={20} />
                        Connect with Pratik Kumar
                    </a>
                </section>
            </div>

            {/* FOOTER NOTE */}
            <div className="text-center mt-20 text-gray-500 text-xs">
                © {new Date().getFullYear()} P-TEK Intelligence Systems. Engineered for high-precision autonomy.
            </div>
        </div>
    );
}

/* --- EXTRA CSS CLASSES (AUTO APPLIED VIA GLOBAL.CSS TAILWIND) --- */