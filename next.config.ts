import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
