/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        domains: ['lh3.googleusercontent.com', 'placehold.co', 'avatars.githubusercontent.com', 'res.cloudinary.com',]
    }
}

module.exports = nextConfig
