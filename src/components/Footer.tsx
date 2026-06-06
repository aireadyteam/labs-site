import Link from 'next/link';

const cols = [
  {
    title: 'Community',
    links: [
      { href: '/community#women', label: 'Women in Wellness' },
      { href: '/community#lead-well', label: 'Lead Well Leadership Circle' },
      { href: '/community#biohackers', label: 'Biohackers Social' },
      { href: '/community', label: 'Join Circle' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/resources', label: 'Cheat Sheet Library' },
      { href: '/blog', label: 'Blog' },
      { href: '/newsletter', label: 'LABS Report Newsletter' },
      { href: '/events', label: 'Events Calendar' },
      { href: '/conference', label: 'Annual Conference' },
    ],
  },
  {
    title: 'LABS',
    links: [
      { href: '/about', label: 'About' },
      { href: '/membership', label: 'Membership' },
      { href: '/partners', label: 'Partners' },
      { href: '/join', label: 'Join Free' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-tint)',
      borderTop: '1.5px solid var(--rule)',
      padding: 56,
      display: 'grid',
      gridTemplateColumns: '240px repeat(3, 1fr)',
      gap: 48,
    }}>
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, letterSpacing: '0.1em', color: 'var(--ink)', marginBottom: 4 }}>LABS</div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--g-700)', marginBottom: 12, display: 'block' }}>Longevity &amp; Biohacking Society</div>
        <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.68, margin: '0 0 16px' }}>A professional community for health-curious people who want to live better, longer.</p>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)', lineHeight: 1.6 }}>
          Powered by<br />
          <a href="https://joineta.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g-700)', textDecoration: 'none' }}>Enterprise Technology Association</a>
        </div>
      </div>

      {cols.map((col) => (
        <div key={col.title}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 16 }}>{col.title}</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {col.links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--rule)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.06em', color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
          © 2026 LABS — Longevity and Biohacking Society. All rights reserved.
        </div>
        <p style={{ fontSize: 11.5, color: 'var(--ink-4)', maxWidth: 580, textAlign: 'right', lineHeight: 1.6, margin: 0 }}>
          Nothing published by LABS constitutes medical advice. All content is for informational purposes only. Consult a qualified healthcare provider before making changes to your health regimen.
        </p>
      </div>
    </footer>
  );
}
