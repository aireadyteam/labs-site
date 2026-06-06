'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setResponseMsg(data.message);
    } catch (err: unknown) {
      setStatus('error');
      setResponseMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px' }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Contact</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Get in <em>touch.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>Questions about membership, partnership inquiries, editorial submissions, or anything else — we respond within five business days.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
            {[
              { icon: '💳', title: 'Membership questions', desc: 'Questions about tiers, billing, cancellation, or ETA member access.', link: '/membership', linkLabel: 'View membership details' },
              { icon: '🤝', title: 'Partnership inquiries', desc: 'Brands, clinics, or platforms interested in the LABS partner program.', link: '/partners', linkLabel: 'Partner inquiry form' },
              { icon: '📝', title: 'Editorial submissions', desc: 'Practitioners or researchers interested in contributing to LABS content.', link: null, linkLabel: null },
              { icon: '🐛', title: 'Report an issue', desc: 'Broken links, outdated information, or anything in our content that needs correction.', link: null, linkLabel: null },
            ].map(({ icon, title, desc, link, linkLabel }) => (
              <div key={title} className="card" style={{ padding: '22px 24px', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, margin: 0, lineHeight: 1.6, marginBottom: link ? 10 : 0 }}>{desc}</p>
                  {link && <Link href={link} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>{linkLabel} →</Link>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32 }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center' as const, padding: '24px 0' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>✅</div>
                <h3 style={{ marginBottom: 12 }}>Message sent.</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>{responseMsg}</p>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>Send a message</div>
                {[
                  { label: 'Your name', key: 'name', type: 'text', placeholder: 'Full name' },
                  { label: 'Email address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: 'What is this about?' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 6, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' as const }} />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>Message</label>
                  <textarea rows={5} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 6, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical' as const, boxSizing: 'border-box' as const }} />
                </div>
                {status === 'error' && <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>{responseMsg}</div>}
                <button onClick={handleSubmit} disabled={status === 'loading' || !form.name || !form.email || !form.message} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: (status === 'loading' || !form.name || !form.email || !form.message) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.08em', color: 'var(--ink-4)', textAlign: 'center' as const, marginTop: 12 }}>We respond within five business days.</div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
