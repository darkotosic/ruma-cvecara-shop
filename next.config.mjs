/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/cdn-loader.ts",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
