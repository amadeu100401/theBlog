import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
