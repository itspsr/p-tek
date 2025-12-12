/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static01.nyt.com" },
      { protocol: "https", hostname: "media.guim.co.uk" },
      { protocol: "https", hostname: "*.bbci.co.uk" },
      { protocol: "https", hostname: "*.bbc.co.uk" },
      { protocol: "https", hostname: "i.guim.co.uk" },
      { protocol: "https", hostname: "cdn.arstechnica.net" },
      { protocol: "https", hostname: "cdn.vox-cdn.com" },
      { protocol: "https", hostname: "media.wired.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.marketwatch.com" },
      { protocol: "https", hostname: "*.investing.com" },
      { protocol: "https", hostname: "*" }, // universal fallback (useful)
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;