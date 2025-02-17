/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fotdmeakexgrkronxlof.supabase.co',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;