export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { applicationReceivedEmail, adminNewApplicationEmail } from '@/lib/email/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, tier, organization, role, why } = await req.json()
    if (!name || !email || !tier) return NextResponse.json({ error: 'Name, email, and tier are required' }, { status: 400 })

    const supabase = createAdminClient()
    await supabase.from('applications').insert({ name, email, tier, organization: organization || null, role: role || null, why: why || null, status: 'pending' })

    const confirm = applicationReceivedEmail(name, tier)
    await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL}>`, to: email, subject: confirm.subject, html: confirm.html })
    const alert = adminNewApplicationEmail(name, email, tier, why || 'Not provided')
    await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL}>`, to: process.env.ADMIN_EMAIL!, subject: alert.subject, html: alert.html })

    return NextResponse.json({ success: true, message: "Application received. We'll be in touch soon." })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
