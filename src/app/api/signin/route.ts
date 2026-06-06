export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check user exists
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const existing = users.find((u: { email?: string }) =>
      u.email?.toLowerCase() === email.toLowerCase()
    );
    if (!existing) {
      return NextResponse.json({ error: 'no_account' }, { status: 404 });
    }

    // Generate magic link — get the hashed_token back
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: 'https://longevityandbiohacking.org/auth/callback?next=/members',
      },
    });

    if (linkError || !linkData?.properties?.hashed_token) {
      throw linkError || new Error('Failed to generate link');
    }

    // Build the verify URL using the raw hashed_token (no encoding issues)
    // This is sent via Resend REST API — no SMTP, no quoted-printable corruption
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const redirectTo = encodeURIComponent('https://longevityandbiohacking.org/auth/callback?next=/members');
    const verifyUrl = `${supabaseUrl}/auth/v1/verify?token=${linkData.properties.hashed_token}&type=magiclink&redirect_to=${redirectTo}`;

    const name = existing.user_metadata?.name || email.split('@')[0];
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'LABS <hello@longevityandbiohacking.org>',
      to: email,
      subject: 'Your LABS sign-in link',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border:1.5px solid #e0e6e2;border-radius:12px;overflow:hidden;max-width:100%;">
<tr><td style="background:#112119;padding:28px 40px;">
<p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5ee89a;font-family:monospace;">Longevity &amp; Biohacking Society</p>
<p style="margin:6px 0 0;font-size:26px;font-weight:700;color:#fff;letter-spacing:0.08em;">LABS</p>
</td></tr>
<tr><td style="padding:40px;">
<p style="margin:0 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#138a48;font-family:monospace;">Member Sign In</p>
<h1 style="margin:0 0 18px;font-size:26px;font-weight:700;color:#1a1a1a;line-height:1.2;">Welcome back, ${name}.</h1>
<p style="margin:0 0 28px;font-size:15px;color:#3d4d43;line-height:1.72;">Click below to sign in to your LABS member dashboard. This link expires in 1 hour and can only be used once.</p>
<table cellpadding="0" cellspacing="0"><tr><td>
<a href="${verifyUrl}" style="display:inline-block;background:#138a48;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">Sign in to LABS</a>
</td></tr></table>
<p style="margin:24px 0 0;font-size:12px;color:#94a89e;">If you did not request this, you can safely ignore this email.</p>
</td></tr>
<tr><td style="background:#f3f7f4;border-top:1px solid #e0e6e2;padding:18px 40px;">
<p style="margin:0;font-size:11px;color:#94a89e;font-family:monospace;">2026 LABS &mdash; longevityandbiohacking.org</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    console.error('signin error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
