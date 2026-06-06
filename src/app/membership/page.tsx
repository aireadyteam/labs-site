import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'LABS membership tiers — Explorer (free), PRO ($999/yr), Leader ($2,999/yr), and Partner. Compare what is included in each tier.',
};

const tiers = [
  {
    id: 'explorer',
    tag: 'Explorer', tagClass: 'tag-gray',
    name: 'Explorer',
    price: 'Free',
    period: 'Always free',
    highlight: false,
    desc: 'The starting point for all LABS members. Access public content, receive the newsletter, and attend free virtual events.',
    features: [
      'Monthly LABS Report newsletter',
      'Cheat sheet previews (3 of 20)',
      'Public LABS blog and content',
      'Free public virtual events',
    ],
    notIncluded: [
      'Circle community access',
      'Full cheat sheet library',
      'Conference access',
      'In-person events',
      'Partner discounts',
    ],
    cta: 'Join Free',
    ctaClass: 'btn-primary',
    href: '#join',
    note: 'No credit card required. Upgrade anytime.',
  },
  {
    id: 'pro',
    tag: 'PRO', tagClass: 'tag-green',
    name: 'PRO',
    price: '$999',
    period: 'per year',
    highlight: true,
    popular: true,
    desc: 'Full LABS access — the cheat sheet library, Circle community, annual conference, and all in-person events.',
    features: [
      'Everything in Explorer',
      'Full Circle community — all three founding groups',
      'Full cheat sheet library (all 20 guides)',
      'Annual LABS Conference access',
      'All in-person wellness events and meetups',
      'Member portal with curated protocols',
      'Vetted partner discount directory',
      'Expert Q&A sessions and deep-dive programming',
      'Priority access to new content and features',
    ],
    notIncluded: [
      'VIP conference access',
      'Executive Leadership & Wellness Retreat',
      'Advisory network access',
    ],
    cta: 'Join PRO',
    ctaClass: 'btn-primary',
    href: '#join-pro',
    note: 'Billed annually. Cancel anytime.',
  },
  {
    id: 'leader',
    tag: 'Leader', tagClass: 'tag-amber',
    name: 'Leader',
    price: '$2,999',
    period: 'per year',
    highlight: false,
    desc: 'For senior executives and operators who want VIP event access and a reserved seat at the annual leadership retreat.',
    features: [
      'Everything in PRO',
      'VIP access to annual LABS Conference',
      'Reserved seat at Executive Leadership & Wellness Retreat',
      'Small-group leadership programming',
      'Early access to new content, tools, and partners',
      'Direct access to LABS advisory network',
      'Concierge event registration and support',
    ],
    notIncluded: [],
    cta: 'Join Leader',
    ctaClass: 'btn-secondary',
    href: '#join-leader',
    note: 'Billed annually. Cancel anytime.',
  },
  {
    id: 'partner',
    tag: 'Partner', tagClass: 'tag-blue',
    name: 'Partner',
    price: 'From $5,000',
    period: 'per year · custom packages',
    highlight: false,
    desc: 'Custom packages for brands, clinics, and platforms that meet LABS evidence standards. All partner content is editorially independent.',
    features: [
      'Custom brand and content packages',
      'Placement in vetted partner directory',
      'Member offers and discount program',
      'Event and conference sponsorship options',
      'Co-created educational content',
      'Newsletter partner features (editorial, not ads)',
      'Advisory seat and community input opportunities',
    ],
    notIncluded: [],
    cta: 'Inquire',
    ctaClass: 'btn-secondary',
    href: '/partners',
    note: 'All partners must meet LABS evidence standards.',
  },
];

const faqItems = [
  { q: 'Is Explorer really free forever?', a: 'Yes. The Explorer tier is free and will remain free. It gives you access to the LABS newsletter, cheat sheet previews, public content, and free virtual events. No credit card required.' },
  { q: 'What is included in PRO that is not in Explorer?', a: 'PRO unlocks the full Circle community (all three founding groups), the complete cheat sheet library (all 20 guides), the annual LABS Conference, all in-person wellness events, the member portal, and the partner discount directory.' },
  { q: 'What makes Leader different from PRO?', a: 'Leader includes everything in PRO plus VIP conference access, a reserved seat at the annual Executive Leadership and Wellness Retreat, small-group leadership programming, and access to the LABS advisory network.' },
  { q: 'Do ETA members get free access?', a: 'ETA members receive Explorer tier access as part of their ETA membership. To access the full LABS community, conference, and resource library, ETA members can upgrade to PRO or Leader at the standard annual rate.' },
  { q: 'Can I cancel my membership?', a: 'Yes. PRO and Leader memberships can be cancelled at any time. Access continues through the end of the billing period. We do not offer partial refunds for unused time.' },
  { q: 'How are Partner packages structured?', a: 'Partner packages are custom and start at $5,000 per year. All partners are vetted against LABS evidence standards before onboarding — we do not accept every applicant. Contact us through the Partners page to start a conversation.' },
];

export default function MembershipPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Membership</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Join the <em>society.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>LABS is free to join. Paid tiers unlock the full resource library, Circle community, annual conference, and VIP programming. Every tier is billed annually with no long-term commitment required.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {tiers.map(({ id, tag, tagClass, name, price, period, highlight, popular, desc, features, notIncluded, cta, ctaClass, href, note }) => (
            <div key={id} id={id} style={{ background: highlight ? 'linear-gradient(170deg, var(--g-100) 0%, var(--bg-white) 45%)' : 'var(--bg-white)', border: `1.5px solid ${highlight ? 'var(--g-600)' : 'var(--rule)'}`, borderRadius: 14, padding: '28px 24px', display: 'flex', flexDirection: 'column' as const, gap: 16, position: 'relative' as const }}>
              {popular && <div style={{ position: 'absolute' as const, top: 12, right: 12, fontFamily: "'Fira Code', monospace", fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase' as const, background: 'var(--g-600)', color: '#fff', padding: '3px 8px', borderRadius: 4 }}>Most Popular</div>}
              <div className={`tag ${tagClass}`}>{tag}</div>
              <div>
                <h2 style={{ fontSize: 26, marginBottom: 4 }}>{name}</h2>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 32, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>{price}</div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginTop: 4 }}>{period}</div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, borderBottom: '1px solid var(--rule)', paddingBottom: 16 }}>{desc}</p>
              <div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 10 }}>Includes</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                  {features.map((f) => (
                    <li key={f} style={{ fontSize: 12.5, color: 'var(--ink-2)', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.45 }}>
                      <span style={{ color: 'var(--g-600)', flexShrink: 0, fontSize: 11, marginTop: 1 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              {notIncluded.length > 0 && (
                <div>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 10 }}>Not included</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                    {notIncluded.map((f) => (
                      <li key={f} style={{ fontSize: 12, color: 'var(--ink-4)', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
                        <span style={{ flexShrink: 0, fontSize: 11, marginTop: 1 }}>–</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div style={{ marginTop: 'auto' }}>
                <Link href={href} className={`btn ${ctaClass}`} style={{ display: 'block', textAlign: 'center' as const, padding: 12, borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{cta}</Link>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.08em', color: 'var(--ink-4)', textAlign: 'center' as const }}>{note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">FAQ</span></div>
            <h2 style={{ marginBottom: 8 }}>Common <em>questions</em></h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginTop: 32, border: '1.5px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
          {faqItems.map(({ q, a }, i) => (
            <div key={q} style={{ padding: '24px 28px', borderBottom: i < faqItems.length - 2 ? '1px solid var(--rule)' : undefined, borderRight: i % 2 === 0 ? '1px solid var(--rule)' : undefined, background: 'var(--bg-white)' }}>
              <h4 style={{ marginBottom: 10, color: 'var(--ink)' }}>{q}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-tint)', borderTop: '1px solid var(--rule)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ marginBottom: 12 }}>Start with <em>Explorer.</em><br />Upgrade when ready.</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 300, maxWidth: 480 }}>Explorer is always free. Join today, access public content and the newsletter, and upgrade to PRO when you are ready for the full library and community.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="#explorer" className="btn btn-primary btn-lg">Join Free</Link>
          <Link href="/partners" className="btn btn-secondary btn-lg">Partner Inquiry</Link>
        </div>
      </section>
    </>
  );
}
