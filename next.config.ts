import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "bd.literesults.net",
      },
      {
        protocol: "https",
        hostname: "api.bigdaymi.com",
      },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "beauty.literesults.net" },
    ],
  },
};

export default nextConfig;
