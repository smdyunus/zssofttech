import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nodemailer uses Node net/tls; bundling it can break API routes on Vercel/serverless.
  serverExternalPackages: ["nodemailer"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zssofttech-internships.netlify.app",
        pathname: "/**",
      },
    ],
  },
  compress: true,
};

export default nextConfig;
