export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { applicationReceivedEmail, adminNewApplicationEmail } from '@/lib/email/templates'
import { allow, clientIp, str, validEmail, withTimeout } from '@/lib/guard'

const TIERS = ['PRO', 'Leader', 'Partner']

export async function POST(req: NextRequest) {
  try {
    if (!(await allow(`apply:${clientIp(req)}`, 5, 3600))) {
      return NextResponse.json({ error: 'Too many applications from this connection. Please try again later.' }, { status: 429 })
    }
    const body = await req.json().catch(() => ({}))
    const name = str(body.name, 120)
    const email = str(body.email, 320).toLowerCase()
    const tier = str(body.tier, 20)
    const organization = str(body.organization, 200) || null
    const role = str(body.role, 200) || null
    const why = str(body.why, 4000) || null
    if (!name || !email || !tier) return NextResponse.json({ error: 'Name, email, and tier are required' }, { status: 400 })
    if (!validEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (!TIERS.includes(tier)) return NextResponse.json({ error: 'Choose PRO, Leader, or Partner.' }, { status: 400 })

    const supabase = createAdminClient()
    const { error } = await withTimeout(
      supabase.from('applications').insert({ name, email, tier, organization, role, why, status: 'pending' }),
      10000,
    ) as { error: { message: string } | null }
    if (error) {
      console.error('application insert failed:', error.message)
      return NextResponse.json({ error: 'We could not save your application. Please try again.' }, { status: 500 })
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const from = `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`
      const confirm = applicationReceivedEmail(name, tier)
      const alert = adminNewApplicationEmail(name, email, tier, why || 'Not provided')
      await withTimeout(Promise.all([
        resend.emails.send({ from, to: email, subject: confirm.subject, html: confirm.html }),
        resend.emails.send({ from, to: process.env.ADMIN_EMAIL || 'zack@joineta.org', subject: alert.subject, html: alert.html }),
      ]), 10000)
    } catch (emailErr) {
      console.error('Application emails failed (application is saved):', emailErr)
    }

    return NextResponse.json({ success: true, message: "Application received. We'll be in touch soon." })
  } catch (err: unknown) {
    console.error('apply failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
