/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["ppi-test.canopi.in"],
  },
};

module.exports = nextConfig;
