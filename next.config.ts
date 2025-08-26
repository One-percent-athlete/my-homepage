import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://192.168.40.155:3000", // your LAN IP + port
    "http://localhost:3000",     // always include localhost
  ],
};

export default nextConfig;
