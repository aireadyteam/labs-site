import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events & Programming',
  description: 'LABS longevity and biohacking events — virtual member calls, in-person meetups, the annual Executive Leadership & Wellness Retreat, and the first LABS Conference in January 2027.',
  openGraph: {
    title: 'Longevity & Biohacking Events — LABS',
    description: 'Virtual calls, in-person wellness events, and the first annual LABS Conference January 2027. Community programming for health-curious professionals.',
    url: 'https://longevityandbiohacking.org/events',
  },
  alternates: { canonical: 'https://longevityandbiohacking.org/events' },
};



const upcomingEvents = [
  { when: 'Summer 2026', date: 'Date TBA', title: 'Founding Member Virtual Kickoff', type: 'Virtual', typeClass: 'tag-blue', access: 'Explorer +', desc: 'The first LABS community gathering — a welcome session and orientation for founding members. We will cover what is coming in the first six months, introduce the community platform, and open the floor for questions and introductions.' },
  { when: 'AI Week 2026', date: 'Date TBA', title: 'LABS Wellness Programming & Meetup', type: 'In-Person', typeClass: 'tag-amber', access: 'PRO +', desc: 'LABS wellness sessions at AI Week, including a dedicated member meetup. Programming will cover topics across the four pillars with expert contributions and peer discussion. Location details announced to registered members.' },
  { when: 'Fall 2026', date: 'Monthly', title: 'Monthly Virtual Event Series', type: 'Virtual', typeClass: 'tag-blue', access: 'Explorer +', desc: 'One focused virtual event per month across the four pillars. Format rotates between expert conversations, member Q&As, protocol deep dives, and research reviews. Full schedule released at launch.' },
  { when: 'Q4 2026', date: 'Date TBA', title: 'Executive Leadership & Wellness Retreat', type: 'In-Person', typeClass: 'tag-amber', access: 'Leader Only', desc: 'An exclusive multi-day retreat for Leader tier members. Combines high-performance wellness programming with leadership peer discussion in a small-group format. Location, agenda, and speakers announced to Leader members in fall 2026.' },
  { when: 'January 2027', date: 'Date TBA', title: 'First Annual LABS Conference', type: 'Conference', typeClass: 'tag-green', access: 'PRO +', desc: 'The inaugural LABS annual conference. A full-day program covering longevity, performance, biohacking, and AI + Health — with keynotes, expert panels, breakout workshops, and a partner expo. VIP programming for Leader members.' },
];

const accessColors: Record<string, string> = {
  'Explorer +': 'tag-gray',
  'PRO +': 'tag-green',
  'Leader Only': 'tag-amber',
};

export default function EventsPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Events</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Events &amp; <em>programming.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>Virtual programming from launch. In-person events at AI Week and select gatherings. The Executive Leadership and Wellness Retreat for Leader members. The first annual LABS Conference in January 2027.</p>
        </div>
        <div style={{ background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 16 }}>Access by tier</div>
          {[
            { tier: 'Explorer', access: 'Free public virtual events', cls: 'tag-gray' },
            { tier: 'PRO', access: 'All virtual events + in-person + conference', cls: 'tag-green' },
            { tier: 'Leader', access: 'Everything in PRO + VIP + Retreat', cls: 'tag-amber' },
          ].map(({ tier, access, cls }) => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div className={`tag ${cls}`} style={{ minWidth: 72 }}>{tier}</div>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{access}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--g-200)' }}>
            <Link href="/membership" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>View membership tiers →</Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="eyebrow"><span className="label">2026 — 2027 Calendar</span></div>
        <h2 style={{ marginBottom: 40 }}>Upcoming <em>events</em></h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
          {upcomingEvents.map(({ when, date, title, type, typeClass, access, desc }) => (
            <div key={title} className="card" style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 28, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--a-700)', marginBottom: 4 }}>{when}</div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: 'var(--ink-4)' }}>{date}</div>
                <div className={`tag ${typeClass}`} style={{ marginTop: 10 }}>{type}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.72, margin: 0 }}>{desc}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
                <div className={`tag ${accessColors[access] || 'tag-gray'}`}>{access}</div>
                <Link href="/membership" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap' as const }}>Register →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">January 2027</span></div>
            <h2 style={{ marginBottom: 20 }}>First Annual <em>LABS Conference</em></h2>
            <p style={{ marginBottom: 14 }}>The inaugural LABS Conference is a full-day in-person event for PRO and Leader members. Programming spans all four pillars with keynotes from practitioners and researchers, expert panels, breakout workshops, and a vetted partner expo.</p>
            <p style={{ marginBottom: 14 }}>Leader tier members receive VIP access — including priority seating, an exclusive pre-conference session, and additional networking access.</p>
            <p style={{ marginBottom: 28 }}>Location and full agenda will be announced in fall 2026. PRO and Leader members receive first access to registration.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/conference" className="btn btn-primary">Conference Details</Link>
              <Link href="/membership" className="btn btn-secondary">Get PRO Access</Link>
            </div>
          </div>
          <div style={{ background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>Conference programming</div>
            {[
              ['🧬','Longevity','Keynotes and panels on healthspan extension, aging science, and clinical longevity interventions'],
              ['⚡','Performance','Sleep, cognitive health, HRV, and recovery — with expert practitioners sharing current protocols'],
              ['🔬','Biohacking','The interventions with the most evidence — wearables, CGM, cold and heat therapy, peptides'],
              ['🤖','AI + Health','Where AI-driven diagnostics and precision medicine are right now — and what is actually ready to use'],
            ].map(([icon, topic, desc]) => (
              <div key={topic} style={{ display: 'flex', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--rule)' }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <h4 style={{ fontSize: 15, marginBottom: 4 }}>{topic}</h4>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
            <Link href="/conference" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>Full conference details →</Link>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-tint)', borderTop: '1px solid var(--rule)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ marginBottom: 12 }}>Want in on<br /><em>all of it?</em></h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 300, maxWidth: 480 }}>PRO membership includes all virtual events, in-person wellness programming, and the annual conference. Leader adds VIP access and the Executive Leadership and Wellness Retreat.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">View Membership</Link>
          <Link href="/conference" className="btn btn-secondary btn-lg">Conference Details</Link>
        </div>
      </section>
    </>
  );
}
