/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'upload.wikimedia.org', 
      'images.unsplash.com',
      'radartv.disway.id',
      'www.asdp.id',
      'indonesiakaya.com',
      'lampungmediaonline.com',
      'lampungpro.co',
      'localhost' // ← Add this line for local development
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001', // ← Add your backend port
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig