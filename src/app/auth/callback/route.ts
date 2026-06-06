export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as string;
  const next = searchParams.get('next') ?? '/members';

  const appUrl = 'https://longevityandbiohacking.org';
  const successUrl = `${appUrl}${next}`;
  const errorUrl = `${appUrl}/join?error=auth`;

  // PKCE code exchange — standard flow
  if (code) {
    const response = NextResponse.redirect(successUrl);
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return response;
    console.error('PKCE exchange error:', error.message);
    return NextResponse.redirect(errorUrl);
  }

  // Token hash flow — admin-generated links
  if (token_hash && type) {
    const response = NextResponse.redirect(successUrl);
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'email' | 'recovery' | 'invite',
    });
    if (!error) return response;
    console.error('OTP verify error:', error.message);
    return NextResponse.redirect(errorUrl);
  }

  // No server-side params — Supabase is using the implicit hash flow
  // Redirect to client-side processor which reads the hash tokens
  const processUrl = `${appUrl}/auth/callback-process?next=${encodeURIComponent(next)}`;
  return NextResponse.redirect(processUrl);
}
