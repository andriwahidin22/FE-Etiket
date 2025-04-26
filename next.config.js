/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'upload.wikimedia.org',
      'images.unsplash.com' 
    ],
  },
}

module.exports = nextConfig