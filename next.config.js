/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build', // Direktori build
  images: {
    domains: ['ik.imagekit.io'], // Tambahkan domain untuk ImageKit
  },
};

module.exports = nextConfig;
