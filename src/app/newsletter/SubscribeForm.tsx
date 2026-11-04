'use client';
import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const visuallyHidden: React.CSSProperties = { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 };

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, source: 'newsletter-page' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setMsg(data.message || "You're subscribed.");
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '14px 18px', marginBottom: 12, fontSize: 15, color: 'var(--g-700)', fontWeight: 500 }}>
        {msg}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} style={{ marginBottom: 12 }}>
      <label htmlFor="newsletter-email" style={visuallyHidden}>Email address</label>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          style={{ flex: '1 1 200px', minWidth: 0, background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '13px 18px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="newsletter-website">Website</label>
          <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" role="alert" style={{ marginTop: 10, marginBottom: 0, fontSize: 13.5, color: '#b42318' }}>{msg}</p>
      )}
    </form>
  );
}
