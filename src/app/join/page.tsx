'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function JoinPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setMessage(data.message);
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: 'var(--bg-white)' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24 }}>✅</div>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Check your <em>inbox.</em></h1>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 24 }}>We sent a sign-in link to <strong>{email}</strong>. Click it to access your member dashboard — no password needed.</p>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)' }}>Didn&apos;t get it? Check your spam folder or <button onClick={() => setStatus('idle')} style={{ background: 'none', border: 'none', color: 'var(--g-700)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0, letterSpacing: 'inherit' }}>try again</button>.</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: 'var(--bg-white)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 16 }}>Explorer Membership — Free</div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 12 }}>Join <em>LABS.</em></h1>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 32 }}>Create your free Explorer account. No password — we&apos;ll send you a magic link to sign in.</p>

        <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: '32px 28px' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 8 }}>Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '12px 16px', fontFamily: "'Karla', sans-serif", fontSize: 15, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 8 }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '12px 16px', fontFamily: "'Karla', sans-serif", fontSize: 15, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' as const }}
            />
          </div>

          {status === 'error' && (
            <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>{message}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !name || !email}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: (status === 'loading' || !name || !email) ? 0.6 : 1 }}
          >
            {status === 'loading' ? 'Creating account…' : 'Join LABS Free'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#138a48" strokeWidth="1.2"/><path d="M4.5 7.2l1.8 1.8 3.2-3.6" stroke="#138a48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-4)' }}>No password. No credit card. Always free.</span>
          </div>
        </div>

        <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 10 }}>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)', margin: 0, lineHeight: 1.7 }}>
            Interested in PRO or Leader? <Link href="/membership" style={{ color: 'var(--g-700)' }}>Apply here →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
