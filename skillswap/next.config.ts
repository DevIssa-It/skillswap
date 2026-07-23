import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strvid.nyc3.cdn.digitaloceanspaces.com',
      },
    ],
  },
};

export default nextConfig;
