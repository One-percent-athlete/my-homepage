import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["flagcdn.com"],
  },
  allowedDevOrigins: [
    "http://192.168.40.155:3000", // your LAN IP + port
    "http://localhost:3000",     // always include localhost
  ],
};

export default nextConfig;
