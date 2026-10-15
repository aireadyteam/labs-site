export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { contactNotificationEmail } from '@/lib/email/templates'
import { allow, clientIp, str, validEmail, withTimeout } from '@/lib/guard'

export async function POST(req: NextRequest) {
  try {
    if (!(await allow(`contact:${clientIp(req)}`, 5, 3600))) {
      return NextResponse.json({ error: 'Too many messages from this connection. Please try again later.' }, { status: 429 })
    }
    const body = await req.json().catch(() => ({}))
    const name = str(body.name, 120)
    const email = str(body.email, 320).toLowerCase()
    const subject = str(body.subject, 200) || 'General inquiry'
    const message = str(body.message, 5000)
    if (!name || !email || !message) return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    if (!validEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

    // Save first, so a message is never lost if email fails. Shows in the admin inbox.
    const supabase = createAdminClient()
    const { error } = await withTimeout(
      supabase.from('contact_submissions').insert({ name, email, subject, message }),
      10000,
    ) as { error: { message: string } | null }
    if (error) {
      console.error('contact insert failed:', error.message)
      return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 500 })
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const notification = contactNotificationEmail(name, email, subject, message)
      await withTimeout(resend.emails.send({
        from: `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`,
        to: process.env.ADMIN_EMAIL || 'zack@joineta.org', replyTo: email, subject: notification.subject, html: notification.html,
      }), 10000)
    } catch (emailErr) {
      console.error('Contact notification failed (message is saved):', emailErr)
    }

    return NextResponse.json({ success: true, message: "Message sent. We'll respond within five business days." })
  } catch (err: unknown) {
    console.error('contact failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
