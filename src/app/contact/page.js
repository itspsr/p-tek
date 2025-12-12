import { Linkedin, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-2xl animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Contact Operations</h1>

            <div className="glass-card p-8 md:p-12 mb-12">
                <form className="space-y-6" action="mailto:contact@p-tek.intel" method="POST" encType="text/plain">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Identify Yourself</label>
                        <input type="text" name="name" className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-ptek-blue focus:outline-none transition-colors" placeholder="Name / Callsign" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Secure Comms (Email)</label>
                        <input type="email" name="email" className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-ptek-blue focus:outline-none transition-colors" placeholder="email@domain.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Intelligence Brief</label>
                        <textarea name="message" rows="4" className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-ptek-blue focus:outline-none transition-colors" placeholder="Enter your message..." required></textarea>
                    </div>

                    <button type="submit" className="w-full bg-ptek-blue text-black font-bold py-4 rounded hover:bg-white transition-colors">
                        TRANSMIT
                    </button>
                </form>
            </div>

            <div className="text-center">
                <p className="text-gray-500 mb-4">Connect via Secure Channels</p>
                <div className="flex justify-center gap-6">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-ptek-blue transition-colors px-4 py-2 border border-white/10 rounded-full hover:border-ptek-blue/50">
                        <Linkedin size={18} /> LinkedIn
                    </a>
                    <a href="mailto:contact@p-tek.intel" className="flex items-center gap-2 text-white hover:text-ptek-blue transition-colors px-4 py-2 border border-white/10 rounded-full hover:border-ptek-blue/50">
                        <Mail size={18} /> Email
                    </a>
                </div>
            </div>
        </div>
    );
}
