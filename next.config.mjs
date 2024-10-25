/** @type {import('next').NextConfig} */
// ? Either Remove the config and migrate to css or only use scss, your choice!
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            api: "modern",
                            silentDeprecation: ["legacy-js-api"],
                        },
                    },
                },
            ],
        });
        return config;
    },
};


export default nextConfig;
