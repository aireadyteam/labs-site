export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { contactNotificationEmail } from '@/lib/email/templates'
import { escapeHtml, sendAdminNotification } from '@/lib/email/notify'
import { getClientIp, hashIp, storeInquiry } from '@/lib/inquiries'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })

    // Store first so a message is never lost, even if email delivery fails.
    let stored = false
    try {
      await storeInquiry({ kind: 'contact', name, email, subject: subject || null, message, ipHash: hashIp(getClientIp(req)) })
      stored = true
    } catch (err) {
      console.error('[contact] failed to store inquiry', err)
    }

    // Always send the admin email, as before.
    const notification = contactNotificationEmail(escapeHtml(name), escapeHtml(email), escapeHtml(subject || 'General inquiry'), escapeHtml(message))
    const emailed = await sendAdminNotification({ subject: `LABS contact: ${subject || 'General inquiry'}`, html: notification.html, replyTo: email })

    if (!stored && !emailed) return NextResponse.json({ error: 'We could not send your message. Please try again shortly.' }, { status: 500 })
    return NextResponse.json({ success: true, message: "Message sent. We'll respond within five business days." })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
