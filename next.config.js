/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'upload.wikimedia.org',
      'images.unsplash.com',
      'radartv.disway.id',
      'img.youtube.com'
    ],
  },
}

module.exports = nextConfig