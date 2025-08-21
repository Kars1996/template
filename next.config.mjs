/** @type {import('next').NextConfig} */
const nextConfig = {
    typedRoutes: true,
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
