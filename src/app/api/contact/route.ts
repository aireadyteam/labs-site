export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactNotificationEmail } from '@/lib/email/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })

    const notification = contactNotificationEmail(name, email, subject || 'General inquiry', message)
    await resend.emails.send({ from: `LABS <${process.env.FROM_EMAIL}>`, to: process.env.ADMIN_EMAIL!, replyTo: email, subject: notification.subject, html: notification.html })

    return NextResponse.json({ success: true, message: "Message sent. We'll respond within five business days." })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
