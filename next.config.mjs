/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: ['raw.githubusercontent.com'], // Add this line
  },
};

export default nextConfig;
