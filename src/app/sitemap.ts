import { MetadataRoute } from 'next';

const BASE = 'https://longevityandbiohacking.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE,                    priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/about`,         priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/membership`,    priority: 0.9,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/resources`,     priority: 0.9,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/events`,        priority: 0.85, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/community`,     priority: 0.8,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/conference`,    priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`,          priority: 0.75, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/newsletter`,    priority: 0.6,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/partners`,      priority: 0.65, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contact`,       priority: 0.6,  changeFrequency: 'yearly'  as const },
    { url: `${BASE}/join`,          priority: 0.95, changeFrequency: 'monthly' as const },
  ];

  return staticPages.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
