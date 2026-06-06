export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check user exists first
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existing = users.find((u: { email?: string }) =>
      u.email?.toLowerCase() === email.toLowerCase()
    );
    if (!existing) {
      return NextResponse.json({ error: 'no_account' }, { status: 404 });
    }

    // Use anon client to send OTP — Supabase handles the email via our custom SMTP
    // This is the standard magic link flow and works reliably
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await anonClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'https://longevityandbiohacking.org/auth/callback?next=/members',
      },
    });

    if (error) {
      // If it says user not found, return no_account
      if (error.message.includes('not found') || error.message.includes('signup')) {
        return NextResponse.json({ error: 'no_account' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    console.error('signin error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
