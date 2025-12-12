export const metadata = {
    title: "Privacy Policy | P-TEK Intelligence",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="glass-panel p-10 rounded-2xl border border-gray-800">
                <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>

                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        P-TEK Intelligence does not collect personal data unless voluntarily submitted.
                        We do not sell or share user information.
                    </p>
                    <p>
                        Basic analytics may be used to improve the experience.
                        External APIs may collect metadata under their policies.
                    </p>
                    <p className="pt-4 border-t border-gray-700">
                        By using our platform, you accept these minimal and privacy-safe terms.
                    </p>
                </div>
            </div>
        </div>
    );
}
