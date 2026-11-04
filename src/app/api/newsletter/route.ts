export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, hashIp, isRateLimited, isValidEmail, storeInquiry } from '@/lib/inquiries'

const SUCCESS = { success: true, message: "You're subscribed." }

export async function POST(req: NextRequest) {
  let body: { email?: unknown; website?: unknown; source?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (typeof body.website === 'string' && body.website.trim() !== '') return NextResponse.json(SUCCESS)

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })

  const ipHash = hashIp(getClientIp(req))
  if (isRateLimited(`newsletter:${ipHash}`)) return NextResponse.json({ error: 'Too many attempts. Please try again in a few minutes.' }, { status: 429 })

  try {
    await storeInquiry({ kind: 'newsletter', email, payload: { source: typeof body.source === 'string' ? body.source.slice(0, 100) : 'newsletter-page' }, ipHash })
    return NextResponse.json(SUCCESS)
  } catch (err) {
    console.error('[newsletter] failed to store subscriber', err)
    return NextResponse.json({ error: 'We could not subscribe you right now. Please try again shortly.' }, { status: 500 })
  }
}
