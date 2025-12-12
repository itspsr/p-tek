"use client";
import { ShieldCheck, Lock, Eye, Database, Globe2 } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 text-gray-300">
            
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
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-ptek-blue" size={28} />
                        <h2 className="text-2xl font-bold text-white">1. Overview</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        P-TEK Intelligence is committed to maintaining the confidentiality, 
                        integrity, and security of your personal information. Our systems 
                        prioritize transparency, minimal data collection, and responsible usage.
                    </p>
                </section>

                {/* SECTION 2 */}
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="text-ptek-blue" size={28} />
                        <h2 className="text-2xl font-bold text-white">2. Data We Collect</h2>
                    </div>

                    <ul className="list-disc list-inside text-gray-400 space-y-2 leading-relaxed">
                        <li>Basic analytics (page views, device type, time spent)</li>
                        <li>No passwords or financial details are collected</li>
                        <li>No sensitive personal data is stored</li>
                        <li>Search queries used within the platform (non-identifying)</li>
                    </ul>

                    <p className="text-gray-500 mt-2 italic">
                        *We do NOT sell or trade your data. Ever.*
                    </p>
                </section>

                {/* SECTION 3 */}
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="text-ptek-blue" size={28} />
                        <h2 className="text-2xl font-bold text-white">3. How Your Data Is Protected</h2>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                        Our infrastructure uses multi-layer encryption, secure access protocols, 
                        and continuous monitoring. All logs and analytics are anonymized to ensure 
                        that your identity remains protected.
                    </p>

                    <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                        <li>Encrypted transmission (HTTPS/TLS 1.3)</li>
                        <li>Firewall-protected servers</li>
                        <li>Strict access controls</li>
                        <li>Routine security audits</li>
                    </ul>
                </section>

                {/* SECTION 4 */}
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="text-ptek-blue" size={28} />
                        <h2 className="text-2xl font-bold text-white">4. Cookies & Tracking</h2>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                        We use minimal tracking technologies such as anonymous analytics cookies
                        to identify platform performance, improve user experience, and detect anomalies.
                    </p>

                    <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                        <li>No personal identities are stored in cookies</li>
                        <li>We do not use any third-party advertising trackers</li>
                        <li>Users can disable cookies anytime from their browser</li>
                    </ul>
                </section>

                {/* SECTION 5 */}
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe2 className="text-ptek-blue" size={28} />
                        <h2 className="text-2xl font-bold text-white">5. Third-Party Services</h2>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                        P-TEK Intelligence aggregates external news sources. These sources may 
                        have their own privacy policies. We do not control third-party tracking, 
                        but we never transmit your personal information to them.
                    </p>
                </section>

                {/* SECTION 6 */}
                <section className="bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-ptek-blue/30 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-white mb-4">6. Contact</h2>
                    <p className="text-gray-400 leading-relaxed">
                        For privacy-related concerns, reach out at:
                        <br />
                        <span className="text-ptek-blue font-semibold">
                            support@ptek-intel.com
                        </span>
                    </p>
                </section>
            </div>

            {/* FOOTER NOTE */}
            <div className="text-center mt-20 text-gray-500 text-xs">
                © {new Date().getFullYear()} P-TEK Intelligence Systems.  
                Engineered with precision for next-generation autonomy.
            </div>
        </div>
    );
}