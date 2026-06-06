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

  // Normalise origin — always use non-www canonical
  const appUrl = origin.replace('://www.', '://');

  const response = NextResponse.redirect(`${appUrl}${next}`);
  const errorResponse = NextResponse.redirect(`${appUrl}/join?error=auth`);

  // Create a Supabase client that can set cookies on the response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // PKCE code exchange (standard magic link / OAuth flow)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return response;
    console.error('PKCE exchange error:', error.message);
    return errorResponse;
  }

  // Token hash flow (admin-generated links via /auth/v1/verify)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'email' | 'recovery' | 'invite',
    });
    if (!error) return response;
    console.error('OTP verify error:', error.message);
    return errorResponse;
  }

  return errorResponse;
}
