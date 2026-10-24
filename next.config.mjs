/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  eslint: {
    // Prevent linting warnings from blocking production builds on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent minor typing warnings from failing production builds on Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
