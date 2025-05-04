/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "r2.resynced.design",
            },
        ],
    }
};


export default nextConfig;
