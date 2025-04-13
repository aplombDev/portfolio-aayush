import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["example.com", "anotherdomain.com"],
  },

  i18n: {
    locales: ["en", "es", "fr", "np"],
    defaultLocale: "en",
  },

  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  },

  experimental: {
    esmExternals: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
