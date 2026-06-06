'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function CallbackProcessPage() {
  useEffect(() => {
    async function handleCallback() {
      const supabase = createClient();
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/members';

      // Give Supabase JS a moment to auto-detect the hash tokens
      // The client library automatically handles #access_token= hashes
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        window.location.replace(next);
      } else {
        // Try to get the hash params manually
        const hash = window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (!error) {
            window.location.replace(next);
            return;
          }
        }
        window.location.replace('/join?error=auth');
      }
    }

    handleCallback();
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
        <p style={{
          fontFamily: "'Fira Code', monospace", fontSize: 11,
          letterSpacing: '0.1em', color: 'var(--ink-4)', margin: 0
        }}>
          Signing you in…
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
