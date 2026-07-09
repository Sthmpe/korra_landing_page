/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Merchant/product images live on Firebase Storage + common CDNs.
    remotePatterns: [
      { protocol: 'https', hostname: '**.firebasestorage.app' },
      { protocol: 'https', hostname: '**.googleapis.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async redirects() {
    return [
      // Bare /store has no merchant — send it to the homepage.
      { source: '/store', destination: '/', permanent: false },
    ];
  },
};

module.exports = nextConfig;
