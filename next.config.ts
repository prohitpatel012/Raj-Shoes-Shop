import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 1. Allow external image hostnames securely
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      
      },
      {
        protocol: 'https',
        hostname: 'g.sdlcdn.com',
      
      }
      
    ],
    // 2. (Optional) Optimize format serving
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
