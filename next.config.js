/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'storage.googleapis.com',
      'upload.wikimedia.org' // Domain baru yang ditambahkan
    ],
  },
}

module.exports = nextConfig