'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackClient() {
  useEffect(() => {
    const supabase = createClient();

    // Handle hash-based token (implicit flow from Supabase verify redirect)
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      // Let Supabase's client-side auth pick up the hash tokens
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          const next = new URLSearchParams(window.location.search).get('next') || '/members';
          window.location.replace(next);
        } else {
          window.location.replace('/join?error=auth');
        }
      });
    } else {
      // No hash tokens — check if already authenticated
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          const next = new URLSearchParams(window.location.search).get('next') || '/members';
          window.location.replace(next);
        } else {
          window.location.replace('/join?error=auth');
        }
      });
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg-white)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, border: '3px solid var(--g-300)',
          borderTopColor: 'var(--g-700)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 11,
          letterSpacing: '0.1em', color: 'var(--ink-4)' }}>
          Signing you in…
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
