'use client';
import { useState } from 'react';
import Link from 'next/link';

/* ─── LABS official molecule mark (inline SVG) ─── */
function MoleculeMark({ size = 36, dark = false }: { size?: number; dark?: boolean }) {
  const s = size / 44;
  const ink = dark ? '#F7F4EE' : '#0D2B4B';
  const cyan = '#3EC6D0';
  const aqua = '#8FDDE2';
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* outer hex */}
      <path d="M22 6.6L36.4 15V32L22 40.4L7.6 32V15Z"
        fill="none" stroke={ink} strokeWidth="1.5" strokeLinejoin="round"/>
      {/* inner hex */}
      <path d="M22 12.2L30.6 17.4V27.8L22 33L13.4 27.8V17.4Z"
        fill="none" stroke={ink} strokeWidth="0.7" strokeLinejoin="round" opacity="0.6"/>
      {/* outer bond line */}
      <line x1="36.4" y1="15" x2="41.6" y2="12" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
      {/* molecule nodes */}
      <circle cx="22" cy="22" r="2.4" fill={cyan}/>
      <circle cx="22" cy="6.6"  r="3.2" fill={cyan}/>
      <circle cx="36.4" cy="15" r="2.1" fill={ink}/>
      <circle cx="36.4" cy="32" r="2.1" fill={ink}/>
      <circle cx="22"   cy="40.4" r="2.5" fill={aqua}/>
      <circle cx="7.6"  cy="32" r="2.1" fill={ink}/>
      <circle cx="7.6"  cy="15" r="2.1" fill={ink}/>
      <circle cx="41.6" cy="12" r="1.8" fill={ink}/>
    </svg>
  );
}

const NAV_LINKS: [string, string][] = [
  ['About',      '/about'],
  ['Resources',  '/resources'],
  ['Community',  '/community'],
  ['Events',     '/events'],
  ['Membership', '/membership'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  const linkStyle = {
    fontFamily: "var(--ff-body, 'Sora', sans-serif)",
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--tidal)',
    textDecoration: 'none',
    transition: 'color 0.18s',
  } as const;

  return (
    <>
      <nav style={{
        background: 'rgba(247,244,238,0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--mist)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        padding: '0 var(--px)',
        display: 'flex', alignItems: 'center',
        gap: 0,
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0, marginRight: 'auto' }}
        >
          <MoleculeMark size={36} />
          <div>
            <div style={{
              fontFamily: "var(--ff-display, 'Fraunces', serif)",
              fontWeight: 700, fontSize: 19,
              letterSpacing: '0.08em',
              color: 'var(--navy)',
              lineHeight: 1,
            }}>
              LABS
            </div>
            <div style={{
              fontFamily: "var(--ff-mono, 'JetBrains Mono', monospace)",
              fontSize: 7, letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--tidal)',
              marginTop: 3, lineHeight: 1,
            }}>
              Longevity &amp; Biohacking Society
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 26, listStyle: 'none', margin: 0 }} className="nav-desktop">
          {NAV_LINKS.map(([label, href]) => (
            <li key={href}>
              <Link href={href} style={linkStyle}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginLeft: 24 }} className="nav-desktop">
          <Link href="/join?mode=signin" style={linkStyle}>Sign in</Link>
          <Link href="/join" className="btn btn-primary" style={{ fontSize: 13, padding: '9px 20px' }}>
            Join LABS
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-toggle"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
          aria-label="Toggle menu"
        >
          {[
            { transform: open ? 'rotate(45deg) translate(5px,5px)' : '', opacity: 1 },
            { transform: '',                                               opacity: open ? 0 : 1 },
            { transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '', opacity: 1 },
          ].map((s, i) => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--navy)', transition: 'all .2s', ...s }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 199,
          background: 'var(--bone)',
          borderBottom: '1px solid var(--mist)',
          padding: '20px var(--px) 28px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={href} href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--ff-body, 'Sora', sans-serif)",
                fontSize: 16, fontWeight: 500,
                color: 'var(--navy)', textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid var(--mist)',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Link href="/join?mode=signin" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setOpen(false)}>Sign in</Link>
            <Link href="/join" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setOpen(false)}>Join LABS</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 840px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
