import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/members/',
          '/portal/',
          '/api/',
          '/_next/',
        ],
      },
      {
        // Block AI scrapers from member-only and API content
        userAgent: [
          'GPTBot',
          'Google-Extended',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'PerplexityBot',
          'Bytespider',
        ],
        disallow: ['/members/', '/portal/', '/api/'],
      },
    ],
    sitemap: 'https://longevityandbiohacking.org/sitemap.xml',
    host: 'https://longevityandbiohacking.org',
  };
}
