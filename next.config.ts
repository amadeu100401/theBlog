import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  cacheComponents: true,
  cacheLife: {
    seconds: {
      stale: 0,
      revalidate: 60,
      expire: 60,
    },
  },
};

export default nextConfig;
