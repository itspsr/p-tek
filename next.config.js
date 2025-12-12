/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Render.com does NOT support Sharp → must disable optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "*" } // Allow all secure image sources
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

// MUST use CommonJS export for Render
module.exports = nextConfig;