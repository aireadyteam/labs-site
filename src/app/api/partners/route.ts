export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { contactNotificationEmail } from '@/lib/email/templates'
import { escapeHtml, sendAdminNotification } from '@/lib/email/notify'
import { clean, getClientIp, hashIp, isRateLimited, isValidEmail, storeInquiry } from '@/lib/inquiries'

const SUCCESS = { success: true, message: "Thanks. We'll be in touch soon." }

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot field. Bots fill it; people never see it.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') return NextResponse.json(SUCCESS)

  const company = clean(body.company, 200)
  const name = clean(body.name, 200)
  const email = clean(body.email, 254)
  const website = clean(body.website, 500)
  const message = clean(body.message, 5000)

  if (!company || !name || !email || !message) return NextResponse.json({ error: 'Company, name, email, and a short description are required.' }, { status: 400 })
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })

  const ipHash = hashIp(getClientIp(req))
  if (isRateLimited(`partners:${ipHash}`)) return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 })

  let stored = false
  try {
    await storeInquiry({ kind: 'partner', name, email, organization: company, subject: `Partner inquiry: ${company}`, message, payload: { website }, ipHash })
    stored = true
  } catch (err) {
    console.error('[partners] failed to store inquiry', err)
  }

  const detail = `${message}${website ? `\n\nWebsite: ${website}` : ''}\nCompany: ${company}`
  const notification = contactNotificationEmail(
    escapeHtml(name),
    escapeHtml(email),
    escapeHtml(`Partner inquiry: ${company}`),
    escapeHtml(detail).replace(/\n/g, '<br>'),
  )
  const emailed = await sendAdminNotification({ subject: `LABS partner inquiry: ${company}`, html: notification.html, replyTo: email })

  if (!stored && !emailed) return NextResponse.json({ error: 'We could not send your inquiry. Please try again shortly.' }, { status: 500 })
  return NextResponse.json(SUCCESS)
}
