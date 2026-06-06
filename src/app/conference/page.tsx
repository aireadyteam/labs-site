import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Annual Conference — January 2027',
  description: 'The first annual LABS Conference. A full-day in-person event for PRO and Leader members covering longevity, performance, biohacking, and AI+Health.',
};

export default function ConferencePage() {
  return (
    <>
      <section style={{ background: 'var(--bg-dark)', padding: '96px 56px 88px', position: 'relative' as const, overflow: 'hidden' }}>
        <div style={{ position: 'absolute' as const, inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,166,88,0.12) 0%, transparent 70%)', pointerEvents: 'none' as const }} />
        <div style={{ position: 'relative' as const, zIndex: 1, maxWidth: 720 }}>
          <div className="tag tag-green" style={{ marginBottom: 24 }}>January 2027 · Location TBA</div>
          <h1 style={{ color: '#fff', marginBottom: 8 }}>First Annual</h1>
          <h1 style={{ color: '#5ee89a', marginBottom: 28 }}><em>LABS Conference.</em></h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.78, maxWidth: 580, marginBottom: 40, fontWeight: 300 }}>A full-day in-person conference for PRO and Leader members. Keynotes, expert panels, breakout workshops, and a vetted partner expo — across all four pillars of longevity, performance, biohacking, and AI + Health.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <Link href="/membership" className="btn btn-primary btn-lg">Register with PRO</Link>
            <Link href="/membership#leader" className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>Leader VIP Access</Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 56 }}>
          {[
            { n: 'Jan 2027', l: 'Date', note: 'Exact date announced fall 2026' },
            { n: 'Full Day', l: 'Format', note: 'Morning keynotes through evening networking' },
            { n: 'PRO+', l: 'Access', note: 'Leader members receive VIP programming' },
            { n: 'TBA', l: 'Location', note: 'Announced to registered members first' },
          ].map(({ n, l, note }) => (
            <div key={l} style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 12, padding: '24px 22px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: n.length > 4 ? 22 : 36, color: 'var(--ink)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{n}</div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginTop: 5 }}>{l}</div>
              <div style={{ fontSize: 12, color: 'var(--g-700)', fontWeight: 500, marginTop: 3 }}>{note}</div>
            </div>
          ))}
        </div>

        <div className="eyebrow"><span className="label">Programming</span></div>
        <h2 style={{ marginBottom: 32 }}>What to <em>expect</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { icon: '🧬', pillar: 'Longevity', color: 'tag-green', sessions: ['Keynote: The current state of longevity science', 'Panel: Biological age testing — what it measures and what to do about it', 'Workshop: Building a personal longevity protocol', 'Research review: Interventions with the strongest evidence'] },
            { icon: '⚡', pillar: 'Performance', color: 'tag-blue', sessions: ['Keynote: Sleep as a performance variable', 'Panel: HRV, recovery, and training load — a practitioner conversation', 'Workshop: Cognitive performance optimization', 'Q&A: Managing stress physiology across a demanding career'] },
            { icon: '🔬', pillar: 'Biohacking', color: 'tag-amber', sessions: ['Keynote: What biohacking actually works — and what does not', 'Panel: CGM data interpretation — a clinical perspective', 'Workshop: Cold and heat therapy protocols', 'Roundtable: Wearables, tracking, and data overload'] },
            { icon: '🤖', pillar: 'AI + Health', color: 'tag-purple', sessions: ['Keynote: AI-driven diagnostics — where we are now', 'Panel: Precision medicine and personalized health data', 'Workshop: Evaluating AI health tools critically', 'Research review: Digital biomarkers and what they measure'] },
          ].map(({ icon, pillar, color, sessions }) => (
            <div key={pillar} className="card" style={{ padding: '28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div className={`tag ${color}`}>{pillar}</div>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                {sessions.map((s) => (
                  <li key={s} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink-2)', alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>—</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">Leader VIP</span></div>
            <h2 style={{ marginBottom: 20 }}>VIP &amp; Retreat<br /><em>access</em></h2>
            <p style={{ marginBottom: 14 }}>Leader tier members receive VIP access to the annual conference — including priority seating, an exclusive pre-conference session, and dedicated networking access throughout the day.</p>
            <p style={{ marginBottom: 28 }}>Leader membership also includes a reserved seat at the Executive Leadership and Wellness Retreat, held in Q4 2026. The retreat is a separate small-group, multi-day experience for senior professionals focused on the intersection of leadership and health.</p>
            <Link href="/membership#leader" className="btn btn-primary">See Leader Membership</Link>
          </div>
          <div style={{ background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32 }}>
            <div className="tag tag-amber" style={{ marginBottom: 20 }}>Leader — Conference VIP</div>
            {[
              'Priority seating for all keynotes and panels',
              'Exclusive pre-conference session with speakers',
              'Dedicated VIP networking reception',
              'Reserved seat at Q4 2026 Leadership and Wellness Retreat',
              'Early access to conference agenda and speaker list',
              'Concierge registration and support',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)', marginBottom: 12, lineHeight: 1.5 }}>
                <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>—</span>{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="eyebrow"><span className="label">Partners & Expo</span></div>
        <h2 style={{ marginBottom: 20 }}>Vetted <em>partner expo</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <p style={{ marginBottom: 14 }}>The LABS Conference partner expo features vetted brands and practitioners from across the longevity and biohacking ecosystem. Every exhibitor meets LABS evidence standards — this is not a pay-to-play sponsor floor.</p>
            <p style={{ marginBottom: 24 }}>Conference sponsorship and expo participation is available to approved LABS partners. Partner packages include co-created content, member offers, and event branding — not just a booth.</p>
            <Link href="/partners" className="btn btn-secondary">Partner Inquiry</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Diagnostics & Labs','Wearables & Devices','Functional Medicine','Supplements & Nutrition','Health AI Platforms','Longevity Clinics'].map((cat) => (
              <div key={cat} style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: var(--r) as unknown as string, padding: '14px 16px', fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500 }}>{cat}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-dark)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ color: '#fff', marginBottom: 12 }}>Register for<br /><em style={{ color: '#5ee89a' }}>January 2027.</em></h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', maxWidth: 440, lineHeight: 1.72 }}>Conference access is included with PRO and Leader membership. Registration opens to members in fall 2026. Join now to secure your spot.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">Get PRO Access</Link>
          <Link href="/membership#leader" className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>Leader VIP</Link>
        </div>
      </section>
    </>
  );
}
