import { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** Client IP as Vercel reports it. */
export function clientIp(req: NextRequest): string {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
}

/**
 * Server-side rate limit backed by public.check_rate_limit (service role only).
 * Fails open if the database can't be reached, so a database hiccup never blocks sign-ups.
 */
export async function allow(key: string, max: number, windowSeconds: number): Promise<boolean> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await withTimeout(
      supabase.rpc('check_rate_limit', { p_key: key.slice(0, 200), p_max: max, p_window_seconds: windowSeconds }),
      5000,
    ) as { data: boolean | null; error: { message: string } | null }
    if (error) { console.error('rate limit check failed:', error.message); return true }
    return data !== false
  } catch (err) {
    console.error('rate limit check failed:', err)
    return true
  }
}

export function withTimeout<T>(p: PromiseLike<T>, ms: number): Promise<T> {
  return Promise.race([
    Promise.resolve(p),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timed out')), ms)),
  ])
}

/** Trimmed string, capped length; empty becomes ''. */
export function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export function validEmail(v: string): boolean {
  return v.length <= 320 && EMAIL_RE.test(v)
}
