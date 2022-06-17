/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // env: {
  //   NEXT_PUBLIC_PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  // },
  // api: {
  //   bodyParser: false,
  // },
};

module.exports = nextConfig;
