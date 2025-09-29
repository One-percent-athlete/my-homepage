import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // allow all paths under Cloudinary
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "http://192.168.40.155:3000", // your LAN IP + port
    "http://localhost:3000",     // always include localhost
  ],
};

export default nextConfig;
