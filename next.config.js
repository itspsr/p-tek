/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ⬅ REMOVE EXPORT MODE
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;