export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { allow, str, withTimeout } from '@/lib/guard'

const MODEL = process.env.CONCIERGE_MODEL || 'claude-haiku-5-5'

/**
 * POST /api/concierge  { message }
 * Signed-in members only. The Anthropic key stays on the server.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Sign in to use the concierge.' }, { status: 401 })
    if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'The concierge is not set up yet.' }, { status: 503 })
    if (!(await allow(`concierge:${user.id}`, 30, 3600))) {
      return NextResponse.json({ error: "You've reached the hourly limit. Try again a little later." }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const message = str(body.message, 2000)
    if (!message) return NextResponse.json({ error: 'Ask a question first.' }, { status: 400 })

    // Name and tier come from the database, never from the client.
    const { data: member } = await supabase.from('members').select('first_name, tier').eq('id', user.id).maybeSingle()
    const firstName = (member?.first_name || 'member').slice(0, 60)
    const tier = member?.tier || 'explorer'

    const res = await withTimeout(fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: `You are the LABS (Longevity and Biohacking Society) member concierge. Warm, knowledgeable, concise. Member first name: ${firstName}. Membership tier: ${tier}. Answer longevity and biohacking questions and help members find their way around the portal and cheat sheet library. Be clear about what the evidence does and does not show, and suggest talking with a clinician before changes to medication, supplements at high doses, fasting, or training when health conditions are involved. Keep answers to three sentences unless asked for detail. No markdown.`,
        messages: [{ role: 'user', content: message }],
      }),
    }), 25000)
    if (!res.ok) {
      console.error('concierge upstream error:', res.status, (await res.text()).slice(0, 300))
      return NextResponse.json({ error: "I'm having trouble connecting right now." }, { status: 502 })
    }
    const data = await res.json()
    const reply = Array.isArray(data.content) ? data.content.filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('\n').trim() : ''
    return NextResponse.json({ reply: reply || "I'm having trouble connecting right now." })
  } catch (err) {
    console.error('concierge failed:', err)
    return NextResponse.json({ error: "I'm having trouble connecting right now." }, { status: 500 })
  }
}
