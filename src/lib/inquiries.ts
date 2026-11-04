import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export type InquiryKind = 'contact' | 'partner' | 'newsletter'

export interface InquiryInput {
  kind: InquiryKind
  email: string
  name?: string | null
  organization?: string | null
  subject?: string | null
  message?: string | null
  payload?: Record<string, unknown>
  ipHash?: string | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length <= 254 && EMAIL_RE.test(email.trim())
}

export function clean(value: unknown, max = 5000): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : null
}

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') || 'unknown').trim()
}

export function hashIp(ip: string): string {
  return createHash('sha256').update(`${process.env.IP_HASH_SALT || 'labs'}:${ip}`).digest('hex')
}

// Basic in-memory per-IP throttle. Per server instance only; good enough to blunt abuse.
const hits = new Map<string, number[]>()
export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    hits.forEach((times, k) => { if (times.every((t) => now - t >= windowMs)) hits.delete(k) })
  }
  return false
}

/**
 * Insert an inquiry using the service role. Returns { duplicate: true } when a
 * unique constraint blocks the row (repeat newsletter subscribe). Throws on other errors.
 */
export async function storeInquiry(input: InquiryInput): Promise<{ duplicate: boolean }> {
  const supabase = createAdminClient()
  const { error } = await supabase.from('inquiries').insert({
    kind: input.kind,
    email: input.email.trim().toLowerCase(),
    name: input.name ?? null,
    organization: input.organization ?? null,
    subject: input.subject ?? null,
    message: input.message ?? null,
    payload: input.payload ?? {},
    ip_hash: input.ipHash ?? null,
  })
  if (error) {
    if (error.code === '23505') return { duplicate: true }
    throw new Error(`inquiries insert failed: ${error.message}`)
  }
  return { duplicate: false }
}
