/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep the Vercel build friction-free: type-check stays on, lint won't block deploys.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
