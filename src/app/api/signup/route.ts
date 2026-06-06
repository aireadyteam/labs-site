import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { explorerWelcomeEmail, adminNewMemberEmail } from '@/lib/email/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Create auth user with magic link (no password)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: false,
      user_metadata: { name, tier: 'explorer' },
    })

    if (authError) {
      // If user already exists, return a friendly message
      if (authError.message.includes('already been registered')) {
        return NextResponse.json({ error: 'An account with this email already exists. Check your inbox for a sign-in link.' }, { status: 409 })
      }
      throw authError
    }

    // Insert member record
    const { error: dbError } = await supabase.from('members').insert({
      id: authData.user.id,
      email,
      name,
      tier: 'explorer',
      status: 'active',
    })

    if (dbError) throw dbError

    // Send magic link so they can sign in
    await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/members` },
    })

    // Send welcome email
    const welcome = explorerWelcomeEmail(name)
    await resend.emails.send({
      from: `LABS <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: welcome.subject,
      html: welcome.html,
    })

    // Alert admin
    const alert = adminNewMemberEmail(name, email, 'Explorer')
    await resend.emails.send({
      from: `LABS <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: alert.subject,
      html: alert.html,
    })

    return NextResponse.json({ success: true, message: 'Account created. Check your email to sign in.' })
  } catch (err: unknown) {
    console.error('Signup error:', err)
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
