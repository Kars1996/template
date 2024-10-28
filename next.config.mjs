/** @type {import('next').NextConfig} */
// ? Good luck making sass work in NextJS :D
const nextConfig = {
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.scss$/,
    //         use: [
    //             "style-loader",
    //             "css-loader",
    //             {
    //                 loader: "sass-loader",
    //                 options: {
    //                     sassOptions: {
    //                         api: "modern",
    //                         silentDeprecation: ["legacy-js-api"],
    //                     },
    //                 },
    //             },
    //         ],
    //     });
    //     return config;
    // },
};


export default nextConfig;
