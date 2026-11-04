export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { contactNotificationEmail } from '@/lib/email/templates'
import { escapeHtml, sendAdminNotification } from '@/lib/email/notify'
import { getClientIp, hashIp, storeInquiry } from '@/lib/inquiries'
import { allow, clientIp, str, validEmail } from '@/lib/guard'

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

    // Store first so a message is never lost, even if email delivery fails.
    let stored = false
    try {
      await storeInquiry({ kind: 'contact', name, email, subject, message, ipHash: hashIp(getClientIp(req)) })
      stored = true
    } catch (err) {
      console.error('[contact] failed to store inquiry', err)
    }

    const notification = contactNotificationEmail(escapeHtml(name), escapeHtml(email), escapeHtml(subject), escapeHtml(message))
    const emailed = await sendAdminNotification({ subject: `LABS contact: ${subject}`, html: notification.html, replyTo: email })

    if (!stored && !emailed) return NextResponse.json({ error: 'We could not send your message. Please try again shortly.' }, { status: 500 })
    return NextResponse.json({ success: true, message: "Message sent. We'll respond within five business days." })
  } catch (err: unknown) {
    console.error('contact failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
