import { Resend } from 'resend'

const FROM = () => `LABS <${process.env.FROM_EMAIL || 'hello@longevityandbiohacking.org'}>`
const ADMIN = () => process.env.ADMIN_EMAIL || 'zack@joineta.org'

/** Escape user input before interpolating it into HTML email templates. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Email the LABS admin inbox, with replies going to the submitter.
 * Returns true when Resend accepted the message. Never throws.
 */
export async function sendAdminNotification(opts: { subject: string; html: string; replyTo: string }): Promise<boolean> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: FROM(), to: ADMIN(), replyTo: opts.replyTo, subject: opts.subject, html: opts.html })
    if (error) {
      console.error('[email] admin notification failed', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] admin notification failed', err)
    return false
  }
}
