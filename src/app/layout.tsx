import type { Metadata } from 'next';
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const BASE_URL = 'https://longevityandbiohacking.org';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Core ──────────────────────────────────────────────────
  title: {
    default: 'LABS — Longevity & Biohacking Society',
    template: '%s | LABS — Longevity & Biohacking Society',
  },
  description:
    'LABS is a professional community for wellness, biohacking, and longevity — science-backed insights, live events, expert protocols, and peer networking. Join free.',

  keywords: [
    'longevity community',
    'biohacking society',
    'wellness community',
    'longevity insights',
    'biohacking events',
    'healthspan optimization',
    'longevity networking',
    'functional medicine community',
    'performance optimization',
    'longevity science',
    'biohacking protocols',
    'wellness networking',
    'health optimization community',
    'longevity conference',
    'biohacking resources',
    'HRV monitoring',
    'VO2 max training',
    'cold plunge sauna protocol',
    'intermittent fasting guide',
    'peptides longevity',
  ],

  authors: [{ name: 'LABS — Longevity and Biohacking Society', url: BASE_URL }],
  creator: 'LABS — Longevity and Biohacking Society',
  publisher: 'Enterprise Technology Association',

  // ── Canonical ─────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: { 'en-US': BASE_URL },
  },

  // ── Robots ────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'LABS — Longevity & Biohacking Society',
    title: 'LABS — Longevity & Biohacking Society',
    description:
      'A professional community for wellness, biohacking, and longevity — science-backed insights, live events, expert protocols, and peer networking.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LABS — Longevity & Biohacking Society',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'LABS — Longevity & Biohacking Society',
    description:
      'A professional community for wellness, biohacking, and longevity — science-backed insights, live events, and peer networking.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@LABSSociety',
    site: '@LABSSociety',
  },

  // ── Verification ──────────────────────────────────────────
  // verification: { google: 'YOUR_GOOGLE_VERIFY_TOKEN' },

  // ── Icons ─────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#138a48' },
    ],
  },

  // ── Manifest ──────────────────────────────────────────────
  manifest: '/site.webmanifest',

  // ── App metadata ──────────────────────────────────────────
  applicationName: 'LABS',
  category: 'health',
};

// ── Structured data (JSON-LD) ──────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'LABS — Longevity and Biohacking Society',
      alternateName: 'LABS',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description:
        'A professional community for wellness, biohacking, and longevity — science-backed insights, live events, expert protocols, and peer networking.',
      foundingDate: '2026',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Enterprise Technology Association',
        url: 'https://joineta.org',
      },
      sameAs: [
        'https://longevityandbiohacking.org',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@longevityandbiohacking.org',
        contactType: 'customer support',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'LABS — Longevity & Biohacking Society',
      description:
        'Professional community for wellness, biohacking, and longevity insights, events, and networking.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/resources?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'MedicalOrganization',
      '@id': `${BASE_URL}/#medorg`,
      name: 'LABS — Longevity and Biohacking Society',
      url: BASE_URL,
      description:
        'Science-backed professional community providing longevity and biohacking education, protocols, and peer networking.',
      medicalSpecialty: [
        'Preventive Medicine',
        'Sports Medicine',
        'Nutrition',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* GEO tags for location-based discovery */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="37.09024;-95.712891" />
        <meta name="ICBM" content="37.09024, -95.712891" />

        {/* Theme color */}
        <meta name="theme-color" content="#112119" />
        <meta name="msapplication-TileColor" content="#112119" />
        <meta name="color-scheme" content="light" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
