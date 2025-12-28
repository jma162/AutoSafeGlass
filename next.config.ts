import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true, // Enable gzip compression for responses
  // Optimize for better memory usage
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Limit request body size
    },
  },
};

export default nextConfig;
