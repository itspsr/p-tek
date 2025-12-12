export const metadata = {
  title: "About | P-TEK Intelligence",
  description: "The autonomous intelligence engine transforming real-time global reporting.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-gray-300 page-transition">
      <h1 className="text-5xl font-bold mb-6">
        <span className="text-ptek-blue">About</span> P-TEK Intelligence
      </h1>

      <p className="text-lg text-gray-400 max-w-3xl leading-relaxed mb-10">
        P-TEK Intelligence is an autonomous, algorithm-driven news engine crafted to deliver
        the fastest, most accurate intelligence signals across World Affairs, Technology, and Finance.
        Our system continuously processes verified sources, extracts insights, and presents
        real-time updates with unmatched clarity and speed.
      </p>

      <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-lg max-w-3xl shadow-xl space-y-6">
        <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
        <p className="text-gray-400 leading-relaxed">
          To engineer a next-generation intelligence platform capable of decoding global events in
          real time — empowering analysts, investors, journalists, and everyday users with instant clarity.
        </p>

        <h2 className="text-2xl font-semibold text-white">Why P-TEK?</h2>
        <p className="text-gray-400 leading-relaxed">
          Unlike traditional news websites, P-TEK Intelligence uses automated pipelines,
          natural-language extraction, anomaly detection, and multi-feed redundancy to produce
          high-accuracy intelligence with zero delay.
        </p>
      </div>

      <div className="mt-16 text-sm text-gray-500">
        Engineered & Maintained by <span className="text-ptek-blue font-semibold">Pratik Kumar</span>.
      </div>
    </div>
  );
}