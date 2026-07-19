import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.resynced.design",
      },
      {
        protocol: "https",
        hostname: "cdn.kars.bio",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
