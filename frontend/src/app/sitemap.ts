import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/stet-cse',
    '/stet-cse/pyqs',
    '/stet-cse/mock-tests',
    '/bpsc-tre',
    '/bpsc-tre/pyqs',
    '/bpsc-tre/pyqs/tre-1',
    '/bpsc-tre/pyqs/tre-2',
    '/bpsc-tre/pyqs/tre-3',
    '/bpsc-tre/mock-tests',
    '/leaderboard',
    '/about',
    '/contact',
    '/faq',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.includes('mock') || route.includes('pyqs') ? 0.9 : 0.7,
  }));
}
