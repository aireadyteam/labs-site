'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';

type Mode = 'join' | 'signin';
type Status = 'idle' | 'loading' | 'error';

function JoinForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<Mode>('join');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('mode') === 'signin') setMode('signin');
    if (searchParams.get('error') === 'auth') {
      setStatus('error');
      setMessage('That sign-in link did not work. Please try again.');
    }
  }, [searchParams]);

  async function handleGoogle() {
    setStatus('loading');
    const next = searchParams.get('next') || '/members';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next.startsWith('/') ? next : '/members')}` },
    });
    if (error) {
      setStatus('error');
      setMessage('Google sign-in is not available right now. Use your email instead.');
    }
  }

  function reset() { setStatus('idle'); setMessage(''); }

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('error');
      setMessage('Incorrect email or password.');
      return;
    }
    router.push('/members');
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setMode('signin');
        setStatus('error');
        setMessage('You already have an account. Sign in below.');
        return;
      }
      if (!res.ok) throw new Error(data.error);

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMode('signin');
        setStatus('error');
        setMessage('Account created — sign in below to continue.');
        return;
      }
      router.push('/members');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
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
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 8vw, 80px) clamp(16px, 4vw, 24px)', background: 'var(--bg-white)' }}>
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
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 32 }}>Enter your email and password to access your dashboard.</p>
            <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 'clamp(20px, 5vw, 32px) clamp(16px, 5vw, 28px)' }}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>{message}</div>
              )}
              <button type="button" onClick={handleGoogle} disabled={status === 'loading'}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 16px', marginBottom: 20,
                  background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8, cursor: 'pointer',
                  fontFamily: "'Karla', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--ink)', opacity: status === 'loading' ? 0.6 : 1 }}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>or with email</span>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
              <form onSubmit={handleSignin}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required style={inputStyle} autoFocus />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading' || !email || !password} className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: (status === 'loading' || !email || !password) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Signing in…' : 'Sign In'}
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
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.72, marginBottom: 32 }}>Create your free Explorer account in seconds.</p>
            <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 'clamp(20px, 5vw, 32px) clamp(16px, 5vw, 28px)' }}>
              {status === 'error' && (
                <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#dc2626' }}>{message}</div>
              )}
              <button type="button" onClick={handleGoogle} disabled={status === 'loading'}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 16px', marginBottom: 20,
                  background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8, cursor: 'pointer',
                  fontFamily: "'Karla', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--ink)', opacity: status === 'loading' ? 0.6 : 1 }}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>or with email</span>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>
              <form onSubmit={handleSignup}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required minLength={8} style={inputStyle} />
                </div>
                <button type="submit" disabled={status === 'loading' || !name || !email || !password} className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: (status === 'loading' || !name || !email || !password) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Creating account…' : 'Join LABS Free'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#138a48" strokeWidth="1.2"/><path d="M4.5 7.2l1.8 1.8 3.2-3.6" stroke="#138a48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-4)' }}>Free forever. No credit card required.</span>
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
