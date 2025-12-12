/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      // NYTimes
      { protocol: "https", hostname: "static01.nyt.com" },
      { protocol: "https", hostname: "www.nytimes.com" },

      // BBC
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
      { protocol: "https", hostname: "news.bbcimg.co.uk" },
      { protocol: "https", hostname: "bbc.co.uk" },
      { protocol: "https", hostname: "bbci.co.uk" },

      // Guardian
      { protocol: "https", hostname: "i.guim.co.uk" },
      { protocol: "https", hostname: "media.guim.co.uk" },

      // Verge
      { protocol: "https", hostname: "cdn.vox-cdn.com" },

      // Wired
      { protocol: "https", hostname: "media.wired.com" },
      { protocol: "https", hostname: "www.wired.com" },

      // ArsTechnica
      { protocol: "https", hostname: "cdn.arstechnica.net" },

      // MarketWatch
      { protocol: "https", hostname: "images.mktw.net" },
      { protocol: "https", hostname: "www.marketwatch.com" },

      // Investing.com
      { protocol: "https", hostname: "images.investing.com" },
      { protocol: "https", hostname: "www.investing.com" },

      // Fallback (Unsplash)
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;