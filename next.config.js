/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co'
        },
        {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com'
        }
      ],
    },
  }