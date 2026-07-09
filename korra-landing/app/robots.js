export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/merchants', '/merchant'] },
    ],
    sitemap: 'https://korra.com.ng/sitemap.xml',
  };
}
