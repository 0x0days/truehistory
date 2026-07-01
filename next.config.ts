import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // images: allow Next.js Image Optimization to fetch from local /images
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
