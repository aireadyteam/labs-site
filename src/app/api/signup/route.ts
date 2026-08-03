export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { explorerWelcomeEmail, adminNewMemberEmail } from '@/lib/email/templates'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    })
    if (authError) {
      if (authError.message?.includes('already been registered'))
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
      throw authError
    }

    const [first_name, ...rest] = name.trim().split(' ')
    const last_name = rest.join(' ')

    await supabase.from('members').insert({
      id: authData.user.id,
      email,
      first_name,
      last_name,
      title: '',
      bio: '',
      location: '',
      tier: 'explorer',
      interests: [],
      created_at: new Date().toISOString(),
    })

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const welcome = explorerWelcomeEmail(name)
      await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`, to: email, subject: welcome.subject, html: welcome.html })

      const alert = adminNewMemberEmail(name, email, 'Explorer')
      await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`, to: process.env.ADMIN_EMAIL || 'zack@joineta.org', subject: alert.subject, html: alert.html })
    } catch (emailErr) {
      console.error('Welcome/admin email failed (non-blocking):', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Account created.' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
