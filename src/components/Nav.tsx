import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{
      background: 'rgba(250,250,250,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--rule)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 64,
      padding: '0 56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="19" stroke="#138a48" strokeWidth="1.8"/>
          <path d="M11 22C11 15 15.5 11 22 11C28.5 11 33 15 33 22" stroke="#138a48" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M11 22C11 29 15.5 33 22 33C28.5 33 33 29 33 22" stroke="#138a48" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
          <line x1="11" y1="22" x2="33" y2="22" stroke="#138a48" strokeWidth="1.2" opacity="0.25"/>
          <line x1="22" y1="11" x2="22" y2="33" stroke="#138a48" strokeWidth="1.2" opacity="0.25"/>
          <circle cx="22" cy="22" r="4.5" fill="#138a48"/>
          <circle cx="22" cy="22" r="7.5" stroke="#138a48" strokeWidth="1" fill="none" opacity="0.3"/>
        </svg>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, letterSpacing: '0.12em', color: 'var(--ink)', lineHeight: 1 }}>LABS</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 7, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--g-700)', marginTop: 3 }}>Longevity &amp; Biohacking Society</div>
        </div>
      </Link>

      <ul style={{ display: 'flex', gap: 24, listStyle: 'none' }}>
        {[
          { href: '/about', label: 'About' },
          { href: '/resources', label: 'Resources' },
          { href: '/community', label: 'Community' },
          { href: '/events', label: 'Events' },
          { href: '/membership', label: 'Membership' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link href="/members" style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}>Sign In</Link>
        <Link href="/join" className="btn btn-primary">Join LABS</Link>
      </div>
    </nav>
  );
}
