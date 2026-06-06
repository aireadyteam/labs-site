'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type Mode = 'join' | 'signin';
type Status = 'idle' | 'loading' | 'success' | 'error';

function JoinForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>('join');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('mode') === 'signin') setMode('signin');
  }, [searchParams]);

  function reset() { setStatus('idle'); setMessage(''); }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 404 && data.error === 'no_account') {
        setMode('join');
        setStatus('error');
        setMessage('No account found for that email. Create one below.');
        return;
      }
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setMode('signin');
        setStatus('error');
        setMessage('You already have an account. Enter your email below to get a sign-in link.');
        return;
      }
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
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
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 24 }}>
            We sent a sign-in link to <strong>{email}</strong>. Click it to access your member dashboard instantly.
          </p>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)' }}>
            Didn&apos;t get it? Check spam or{' '}
            <button onClick={reset} style={{ background: 'none', border: 'none', color: 'var(--g-700)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>try again</button>.
          </p>
        </div>
      </section>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)',
    borderRadius: 8, padding: '12px 16px', fontFamily: "'Karla', sans-serif",
    fontSize: 15, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8,
  };

  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: 'var(--bg-white)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 10, padding: 4 }}>
          {(['join', 'signin'] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); reset(); }} style={{
              flex: 1, padding: '9px 0', border: 'none', borderRadius: 7, cursor: 'pointer',
              fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              background: mode === m ? 'var(--bg-white)' : 'transparent',
              color: mode === m ? 'var(--ink)' : 'var(--ink-3)',
              boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              fontWeight: mode === m ? 600 : 400, transition: 'all 0.18s',
            }}>
              {m === 'join' ? 'Create Account' : 'Sign In'}
            </button>
          ))}
        </div>

        {mode === 'signin' ? (
          <>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 16 }}>Member Sign In</div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12 }}>Welcome <em>back.</em></h1>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 32 }}>Enter your email and we&apos;ll send a magic link straight to your inbox.</p>
            <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: '32px 28px' }}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>{message}</div>
              )}
              <form onSubmit={handleSignin}>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required style={inputStyle} autoFocus />
                </div>
                <button type="submit" disabled={status === 'loading' || !email} className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: (status === 'loading' || !email) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Sending link…' : 'Send Sign-In Link'}
                </button>
                <div style={{ marginTop: 14, textAlign: 'center' as const }}>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-4)' }}>
                    No account?{' '}
                    <button type="button" onClick={() => { setMode('join'); reset(); }} style={{ background: 'none', border: 'none', color: 'var(--g-700)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>
                      Create one free →
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 16 }}>Explorer Membership — Free</div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12 }}>Join <em>LABS.</em></h1>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 32 }}>Create your free Explorer account. No password — we&apos;ll send you a magic link to sign in.</p>
            <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: '32px 28px' }}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>{message}</div>
              )}
              <form onSubmit={handleSignup}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading' || !name || !email} className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: (status === 'loading' || !name || !email) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Creating account…' : 'Join LABS Free'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#138a48" strokeWidth="1.2"/><path d="M4.5 7.2l1.8 1.8 3.2-3.6" stroke="#138a48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-4)' }}>No password. No credit card. Always free.</span>
                </div>
              </form>
            </div>
            <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 10 }}>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)', margin: 0, lineHeight: 1.7 }}>
                Interested in PRO or Leader? <Link href="/membership" style={{ color: 'var(--g-700)' }}>Apply here →</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function JoinPage() {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  );
}
