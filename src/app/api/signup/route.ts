export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { explorerWelcomeEmail, adminNewMemberEmail } from '@/lib/email/templates'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()
    if (!name || !email) return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })

    const resend = new Resend(process.env.RESEND_API_KEY)
    const supabase = createAdminClient()

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email, email_confirm: false, user_metadata: { name, tier: 'explorer' },
    })
    if (authError) {
      if (authError.message?.includes('already been registered'))
        return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
      throw authError
    }

    await supabase.from('members').insert({ id: authData.user.id, email, name, tier: 'explorer', status: 'active' })

    const welcome = explorerWelcomeEmail(name)
    await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`, to: email, subject: welcome.subject, html: welcome.html })

    const alert = adminNewMemberEmail(name, email, 'Explorer')
    await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`, to: process.env.ADMIN_EMAIL || 'zack@joineta.org', subject: alert.subject, html: alert.html })

    return NextResponse.json({ success: true, message: 'Account created. Check your email to sign in.' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
