import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "api-middleware-mcd.mcdonaldscupones.com",
      },
      {
        protocol: "https",
        hostname: "p2.trrsf.com",
      },
      {
        protocol: "https",
        hostname: "gkpb.com.br",
      },
    ],
  },
};

export default nextConfig;
