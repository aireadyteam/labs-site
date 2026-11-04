export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { explorerWelcomeEmail, adminNewMemberEmail } from '@/lib/email/templates'
import { allow, clientIp, str, validEmail, withTimeout } from '@/lib/guard'

export async function POST(req: NextRequest) {
  try {
    if (!(await allow(`signup:${clientIp(req)}`, 8, 3600))) {
      return NextResponse.json({ error: 'Too many sign-up attempts. Please try again in an hour.' }, { status: 429 })
    }
    const body = await req.json().catch(() => ({}))
    const name = str(body.name, 120)
    const email = str(body.email, 320).toLowerCase()
    const password = typeof body.password === 'string' ? body.password : ''
    const source = str(body.source, 60) || null
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }
    if (!validEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (password.length < 8 || password.length > 200) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // The on_auth_user_created trigger creates the Explorer member row from this metadata.
    const { data: authData, error: authError } = await withTimeout(supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, signup_source: source || 'join' },
    }), 10000) as { data: { user: { id: string } } | null; error: { message?: string } | null }
    if (authError || !authData?.user) {
      if (authError?.message?.includes('already been registered'))
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
      console.error('createUser failed:', authError?.message)
      return NextResponse.json({ error: 'We could not create your account. Please try again.' }, { status: 500 })
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`
      const welcome = explorerWelcomeEmail(name)
      const alert = adminNewMemberEmail(name, email, 'Explorer')
      await withTimeout(Promise.all([
        resend.emails.send({ from, to: email, subject: welcome.subject, html: welcome.html }),
        resend.emails.send({ from, to: process.env.ADMIN_EMAIL || 'zack@joineta.org', subject: alert.subject, html: alert.html }),
      ]), 10000)
    } catch (emailErr) {
      console.error('Welcome/admin email failed (non-blocking):', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Account created.' })
  } catch (err: unknown) {
    console.error('signup failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
