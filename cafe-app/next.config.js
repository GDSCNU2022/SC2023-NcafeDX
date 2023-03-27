/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/images/**",
      },
    ],
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
