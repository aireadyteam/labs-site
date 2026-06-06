'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      background: 'rgba(250,250,250,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--rule)',
      position: 'sticky', top: 0, zIndex: 100,
      height: 64,
      padding: '0 var(--px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
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

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0 }} className="nav-desktop">
        {[['About','/about'],['Resources','/resources'],['Community','/community'],['Events','/events'],['Membership','/membership']].map(([label, href]) => (
          <li key={href}>
            <Link href={href} style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}>{label}</Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTAs */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="nav-desktop">
        <Link href="/join?mode=signin" style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}>Sign In</Link>
        <Link href="/join" className="btn btn-primary">Join LABS</Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="nav-mobile-toggle"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}
        aria-label="Toggle menu"
      >
        <span style={{ display: 'block', width: 22, height: 2, background: open ? 'transparent' : 'var(--ink)', transition: 'all .2s', transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }} />
        <span style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', transition: 'all .2s', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', transition: 'all .2s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: 'rgba(250,250,250,0.98)', backdropFilter: 'blur(12px)',
          zIndex: 99, padding: '32px var(--px)',
          display: 'flex', flexDirection: 'column', gap: 8,
        }} onClick={() => setOpen(false)}>
          {[['About','/about'],['Resources','/resources'],['Community','/community'],['Events','/events'],['Membership','/membership']].map(([label, href]) => (
            <Link key={href} href={href} style={{ fontFamily: "'Karla', sans-serif", fontSize: 18, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid var(--rule)' }}>{label}</Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <Link href="/join?mode=signin" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: 13 }}>Sign In</Link>
            <Link href="/join" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 13 }}>Join LABS Free</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
