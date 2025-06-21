import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "umcclinic.com.vn",
      "https://res.cloudinary.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
