import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LABS — Longevity and Biohacking Society',
  description: 'A professional community for health-curious people who want to extend their healthspan, optimize performance, and stay ahead of the research.',
};

const pillars = [
  { num: '01', name: 'Longevity', desc: 'Healthspan extension, epigenetics, biological aging markers, and the interventions with the strongest evidence.' },
  { num: '02', name: 'Performance', desc: 'Cognitive optimization, sleep architecture, HRV, recovery, and stress physiology for sustainable high performance.' },
  { num: '03', name: 'Biohacking', desc: 'CGM, peptides, cold and heat therapy, photobiomodulation, wearables, and emerging protocols.' },
  { num: '04', name: 'AI + Health', desc: 'AI-driven diagnostics, precision medicine, digital biomarkers, and the tools that help you act on your own data.' },
];

const groups = [
  { id: 'women', name: 'Women in Wellness', desc: "A dedicated space for women navigating longevity, hormonal health, and performance. Grounded in research specific to women's physiology.", color: 'green' },
  { id: 'lead-well', name: 'Lead Well Leadership Circle', desc: 'For executives focused on the intersection of leadership performance, cognitive health, and sustainable high output over a long career.', color: 'amber' },
  { id: 'biohackers', name: 'Biohackers Social', desc: 'A peer community for members actively experimenting with protocols — wearables, labs, CGM, cold and heat therapy, supplements.', color: 'blue' },
];

const tiers = [
  { tag: 'Explorer', tagClass: 'tag-gray', name: 'Explorer', highlight: false, features: ['Monthly LABS Report newsletter','Cheat sheet previews','Public LABS content and blog','Free public virtual events'], cta: 'Join Free', ctaClass: 'btn-primary', href: '/membership' },
  { tag: 'PRO', tagClass: 'tag-green', name: 'PRO', highlight: true, popular: true, features: ['Everything in Explorer','Full Circle community','Full cheat sheet library','Annual LABS conference access','All in-person events','Member portal and protocols','Partner discount directory','Expert Q&A programming'], cta: 'See PRO Details', ctaClass: 'btn-outline-green', href: '/membership#pro' },
  { tag: 'Leader', tagClass: 'tag-amber', name: 'Leader', highlight: false, features: ['Everything in PRO','VIP conference access','Reserved seat: Executive Retreat','Small-group leadership programming','Early access to content and partners','Access to LABS advisory network'], cta: 'See Leader Details', ctaClass: 'btn-secondary', href: '/membership#leader' },
  { tag: 'Partner', tagClass: 'tag-blue', name: 'Partner', highlight: false, features: ['Custom brand and content packages','Member offers and directory placement','Event and conference sponsorship','Co-created educational content','All content meets LABS editorial standards'], cta: 'Partner Inquiry', ctaClass: 'btn-secondary', href: '/partners' },
];

const events = [
  { when: 'Summer 2026', title: 'Founding Member Virtual Kickoff', desc: 'Community welcome for founding members', badge: 'Virtual', badgeClass: 'tag-blue' },
  { when: 'AI Week 2026', title: 'LABS Wellness Programming & Meetup', desc: 'In-person sessions — PRO and Leader members', badge: 'In-Person', badgeClass: 'tag-amber' },
  { when: 'Fall 2026', title: 'Monthly Virtual Event Series', desc: 'One event per month across the four pillars', badge: 'Virtual', badgeClass: 'tag-blue' },
  { when: 'Q4 2026', title: 'Executive Leadership & Wellness Retreat', desc: 'Exclusive retreat for Leader tier members', badge: 'In-Person', badgeClass: 'tag-amber' },
  { when: 'January 2027', title: 'First Annual LABS Conference', desc: 'Full conference for PRO and Leader members', badge: 'Conference', badgeClass: 'tag-green' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: 'var(--py) var(--px)' }}>
        <div className="hero-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g-600)', animation: 'kpulse 3s ease-in-out infinite' }} />
              <span className="label">Longevity &amp; Biohacking Society</span>
            </div>
            <h1 style={{ marginBottom: 8 }}>Live Better,<br /><em>Longer.</em></h1>
            <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'var(--ink-2)', lineHeight: 1.75, maxWidth: 500, marginBottom: 36, fontWeight: 300 }}>
              LABS is a professional community for health-curious people who want to extend their healthspan, optimize performance, and stay ahead of the research. Science-backed. Peer-driven. Free of noise.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <Link href="/membership" className="btn btn-primary btn-lg">Join LABS Free</Link>
              <Link href="/membership" className="btn btn-secondary btn-lg">Explore Membership</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: "'Fira Code', monospace", fontSize: 11, letterSpacing: '0.06em', color: 'var(--ink-4)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#138a48" strokeWidth="1.2"/><path d="M4.5 7.2l1.8 1.8 3.2-3.6" stroke="#138a48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Explorer tier is always free — no credit card required
            </div>
          </div>

          <div className="hero-aside" style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 16px rgba(26,26,26,0.06)' }}>
            {[{ n: '4', l: 'Pillars of Practice', note: 'Longevity · Performance · Biohacking · AI+Health' },{ n: '3', l: 'Founding Communities', note: 'Included with PRO membership' },{ n: 'Jan 2027', l: 'First Annual Conference', note: 'PRO & Leader members' },{ n: 'Summer 2026', l: 'Soft Launch', note: 'Founding member enrollment open' }].map(({ n, l, note }, i) => (
              <div key={i} style={{ padding: '20px 24px', borderBottom: i < 3 ? '1px solid var(--rule)' : undefined }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: n.length > 4 ? 20 : 36, color: 'var(--ink)', lineHeight: 1.2, letterSpacing: '-0.025em' }}>{n}</div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginTop: 4 }}>{l}</div>
                <div style={{ fontSize: 12, color: 'var(--g-700)', fontWeight: 500, marginTop: 2 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section section-tint">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Foundation</span></div><h2>Four pillars<br />of practice</h2></div>
          <p className="section-intro">LABS organizes everything around four evidence-based domains. Each pillar has its own cheat sheet library, community discussions, and programming.</p>
        </div>
        <div className="pillars-grid">
          {pillars.map(({ num, name, desc }) => (
            <div key={num} style={{ background: 'var(--bg-white)', padding: '28px 24px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--g-700)' }}>{num}</div>
              <div style={{ width: 44, height: 44, background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="#138a48" strokeWidth="1.5"/><circle cx="11" cy="11" r="4" fill="#138a48" opacity="0.8"/></svg>
              </div>
              <h3>{name}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section section-white">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Community</span></div><h2>Three founding<br />communities</h2></div>
          <p className="section-intro">All three groups hosted on Circle and available to PRO and above. Join free as Explorer and upgrade to unlock full community access.</p>
        </div>
        <div className="grid-3" style={{ marginBottom: 16 }}>
          {groups.map(({ id, name, desc, color }) => (
            <div key={id} className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              <div className={`tag tag-${color}`}><div style={{ width: 5, height: 5, borderRadius: '50%', background: color === 'green' ? 'var(--g-600)' : color === 'amber' ? 'var(--a-700)' : 'var(--b-700)' }} />PRO &amp; Above</div>
              <h3>{name}</h3>
              <p style={{ fontSize: 13.5, flex: 1, margin: 0 }}>{desc}</p>
              <Link href={`/community#${id}`} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>Learn more →</Link>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 8, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g-600)', flexShrink: 0, animation: 'kpulse 3s infinite' }} />
          <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>All three groups on <strong style={{ color: 'var(--ink)' }}>Circle</strong> — available to <strong style={{ color: 'var(--ink)' }}>PRO and above members</strong>. Join free as Explorer — upgrade to unlock.</p>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="section section-tint">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Membership</span></div><h2>Four tiers,<br />one community</h2></div>
          <p className="section-intro">LABS is free to join. Paid tiers unlock the full resource library, annual conference, and VIP programming.</p>
        </div>
        <div className="tiers-grid">
          {tiers.map(({ tag, tagClass, name, highlight, popular, features, cta, ctaClass, href }) => (
            <div key={name} style={{ background: highlight ? 'linear-gradient(170deg, var(--g-100) 0%, var(--bg-white) 45%)' : 'var(--bg-white)', border: `1.5px solid ${highlight ? 'var(--g-600)' : 'var(--rule)'}`, borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column' as const, gap: 16, position: 'relative' as const }}>
              {popular && <div style={{ position: 'absolute' as const, top: 12, right: 12, fontFamily: "'Fira Code', monospace", fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase' as const, background: 'var(--g-600)', color: '#fff', padding: '3px 8px', borderRadius: 4 }}>Most Popular</div>}
              <div className={`tag ${tagClass}`}>{tag}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700 }}>{name}</h3>
              <hr style={{ border: 'none', borderTop: '1px solid var(--rule)' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 8, flex: 1 }}>
                {features.map((f) => (<li key={f} style={{ fontSize: 13, color: 'var(--ink-2)', display: 'flex', gap: 9, alignItems: 'flex-start', lineHeight: 1.45 }}><span style={{ color: 'var(--g-600)', flexShrink: 0, fontSize: 11, marginTop: 1 }}>—</span>{f}</li>))}
              </ul>
              <Link href={href} className={`btn ${ctaClass}`} style={{ textAlign: 'center' as const, display: 'block', padding: 11, borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 13.5 }}>{cta}</Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' as const, marginTop: 24 }}>
          <Link href="/membership" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>View full membership details and pricing →</Link>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="section section-white">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Editorial Standard</span></div><h2>What we hold<br />ourselves to</h2></div>
        </div>
        <div className="grid-2">
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(18px,2.5vw,28px)', color: 'var(--ink)', lineHeight: 1.3, paddingLeft: 20, borderLeft: '3px solid var(--g-600)', marginBottom: 20 }}>Everything we publish must be accurate, verifiable, and free of claims we cannot support.</div>
            <p style={{ fontSize: 15, lineHeight: 1.78 }}>The longevity and biohacking space has a noise problem. LABS exists because professionals deserve better. Every cheat sheet is reviewed against the primary literature. Every partner is vetted. If we&apos;re not certain, we say so.</p>
          </div>
          <div className="checklist">
            {[['✅','Claims are cited.','Every factual claim links to a primary source or peer-reviewed study.'],['🔗','All links verified.','Every URL is checked before going live and audited regularly.'],['🔍','Partners are vetted, not purchased.','No brand enters the directory without meeting our evidence standards.'],['⚖️','We acknowledge nuance.','When research is preliminary or contested, we say so explicitly.'],['🩺','We are not your doctor.','Nothing LABS publishes is medical advice.'],['🚫','No paid editorial.','Partners cannot buy placement in our content or cheat sheets.']].map(([icon, title, body]) => (
              <div key={title} className="check-row"><div className="check-icon">{icon}</div><p className="check-text"><strong>{title}</strong> {body}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="section section-tint">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Calendar</span></div><h2>Events &amp;<br />programming</h2></div>
          <p className="section-intro">Virtual programming from launch. In-person at AI Week. First annual LABS conference in January 2027.</p>
        </div>
        <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
          {events.map(({ when, title, desc, badge, badgeClass }, i) => (
            <div key={when} className="event-row" style={{ borderBottom: i < events.length - 1 ? '1px solid var(--rule)' : undefined }}>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--a-700)' }}>{when}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{title}</div><div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{desc}</div></div>
              <div className={`tag ${badgeClass} event-badge`}>{badge}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' as const, marginTop: 24 }}>
          <Link href="/events" className="btn btn-secondary">View All Events</Link>
        </div>
      </section>

      {/* CAPTURE */}
      <section style={{ background: 'var(--bg-dark)', padding: 'var(--py) var(--px)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 22, textAlign: 'center' as const }}>
        <span className="label" style={{ color: 'rgba(94,232,154,0.7)' }}>Get Early Access</span>
        <h2 style={{ color: '#fff' }}>Join LABS before<br /><em style={{ color: '#5ee89a' }}>we open the doors.</em></h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.58)', maxWidth: 440, lineHeight: 1.7 }}>We launch summer 2026. Leave your email and you&apos;ll be among the first to access the community, cheat sheets, and founding member programming.</p>
        <div className="email-row">
          <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '13px 18px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: '#fff', outline: 'none', minWidth: 0 }} />
          <button className="btn btn-primary" style={{ background: '#1aa658', border: 'none', flexShrink: 0 }}>Get Early Access</button>
        </div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)' }}>No spam. No selling your data. One email when we launch.</div>
      </section>
    </>
  );
}
