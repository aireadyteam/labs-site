import type { Metadata } from 'next';
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'LABS — Longevity and Biohacking Society', template: '%s — LABS' },
  description: 'A professional community for health-curious people who want to extend their healthspan, optimize performance, and stay ahead of the research. Science-backed. Peer-driven.',
  metadataBase: new URL('https://longevityandbiohacking.org'),
  openGraph: {
    siteName: 'LABS — Longevity and Biohacking Society',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
