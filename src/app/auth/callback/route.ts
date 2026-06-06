export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as string;
  const next = searchParams.get('next') ?? '/members';
  const error = searchParams.get('error');

  const appUrl = 'https://longevityandbiohacking.org';

  // If there's an error param but no code/token, redirect to error page
  if (error && !code && !token_hash) {
    return NextResponse.redirect(`${appUrl}/join?error=auth`);
  }

  // Build response that redirects to /members
  const response = NextResponse.redirect(`${appUrl}${next}`);
  const errorResponse = NextResponse.redirect(`${appUrl}/join?error=auth`);

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

  // PKCE code exchange
  if (code) {
    const { error: err } = await supabase.auth.exchangeCodeForSession(code);
    if (!err) return response;
    console.error('PKCE exchange error:', err.message);
    return errorResponse;
  }

  // Token hash flow
  if (token_hash && type) {
    const { error: err } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'email' | 'recovery' | 'invite',
    });
    if (!err) return response;
    console.error('OTP verify error:', err.message);
    return errorResponse;
  }

  // No code or token — the hash-based implicit flow will be handled client-side
  // Redirect to the callback page which has a client component to handle it
  return NextResponse.redirect(`${appUrl}/auth/callback-process${next ? `?next=${encodeURIComponent(next)}` : ''}`);
}
