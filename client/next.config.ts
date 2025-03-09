import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ['res.cloudinary.com'], // Thêm domain của Cloudinary vào đây
  },
};

export default nextConfig;
