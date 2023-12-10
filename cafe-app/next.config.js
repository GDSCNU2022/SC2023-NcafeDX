/** @type {import('next').NextConfig} */
const path = require("path");
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
  webpack(config, options) {
    config.resolve.alias["@src"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
