'use client';
import { useState } from 'react';
import Link from 'next/link';

const tiers = [
  {
    id: 'explorer', tag: 'Explorer', tagClass: 'tag-gray', name: 'Explorer',
    price: 'Free', period: 'Always free', highlight: false,
    desc: 'The starting point for all LABS members. Access public content, receive the newsletter, and attend free virtual events.',
    features: ['Monthly LABS Report newsletter','Cheat sheet previews (3 of 20)','Public LABS blog and content','Free public virtual events'],
    notIncluded: ['Circle community access','Full cheat sheet library','Conference access','In-person events','Partner discounts'],
    cta: 'Join Free', ctaHref: '/join',
  },
  {
    id: 'pro', tag: 'PRO', tagClass: 'tag-green', name: 'PRO',
    price: '$999', period: 'per year', highlight: true, popular: true,
    desc: 'Full LABS access — the cheat sheet library, Circle community, annual conference, and all in-person events.',
    features: ['Everything in Explorer','Full Circle community — all three founding groups','Full cheat sheet library (all 20 guides)','Annual LABS Conference access','All in-person wellness events and meetups','Member portal with curated protocols','Vetted partner discount directory','Expert Q&A sessions and deep-dive programming','Priority access to new content and features'],
    notIncluded: ['VIP conference access','Executive Leadership & Wellness Retreat','Advisory network access'],
    cta: 'Apply for PRO', ctaHref: '#apply',
  },
  {
    id: 'leader', tag: 'Leader', tagClass: 'tag-amber', name: 'Leader',
    price: '$2,999', period: 'per year', highlight: false,
    desc: 'For senior executives who want VIP event access and a reserved seat at the annual leadership retreat.',
    features: ['Everything in PRO','VIP access to annual LABS Conference','Reserved seat at Executive Leadership & Wellness Retreat (January 2027, Tampa FL)','Small-group leadership programming','Early access to new content, tools, and partners','Direct access to LABS advisory network','Concierge event registration and support'],
    notIncluded: [],
    cta: 'Apply for Leader', ctaHref: '#apply',
  },
  {
    id: 'partner', tag: 'Partner', tagClass: 'tag-blue', name: 'Partner',
    price: 'From $5,000', period: 'per year · custom packages', highlight: false,
    desc: 'Custom packages for brands, clinics, and platforms that meet LABS evidence standards.',
    features: ['Custom brand and content packages','Placement in vetted partner directory','Member offers and discount program','Event and conference sponsorship options','Co-created educational content','Newsletter partner features (editorial, not ads)'],
    notIncluded: [],
    cta: 'Partner Inquiry', ctaHref: '/partners',
  },
];

const faqItems = [
  { q: 'Is Explorer really free forever?', a: 'Yes. The Explorer tier is free and will remain free. No credit card required.' },
  { q: 'What is the PRO and Leader application process?', a: 'Submit an application below. We review all applications and respond within five business days. PRO and Leader membership is by application during our founding period — this lets us ensure quality and collect the context we need for outreach.' },
  { q: 'What makes Leader different from PRO?', a: 'Leader includes everything in PRO plus VIP conference access, a reserved seat at the Executive Leadership and Wellness Retreat (January 2027, Tampa FL), small-group leadership programming, and access to the LABS advisory network.' },
  { q: 'Do ETA members get free access?', a: 'ETA members receive Explorer tier access as part of their ETA membership. To access the full LABS community, conference, and resource library, ETA members can apply for PRO or Leader at the standard annual rate.' },
  { q: 'When does Circle community access open?', a: 'The Circle community is being set up now and will open with the full summer 2026 launch. PRO and Leader applicants who are approved will receive Circle invites when it opens.' },
];

export default function MembershipPage() {
  const [applyTier, setApplyTier] = useState('PRO');
  const [form, setForm] = useState({ name: '', email: '', organization: '', role: '', why: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier: applyTier }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('success');
      setMessage(data.message);
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Membership</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Join the <em>society.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>LABS is free to join as an Explorer. PRO and Leader tiers are by application during our founding period — this lets us build the right community from the start.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {tiers.map(({ id, tag, tagClass, name, price, period, highlight, popular, desc, features, notIncluded, cta, ctaHref }) => (
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
                      <li key={f} style={{ fontSize: 12, color: 'var(--ink-4)', display: 'flex', gap: 8, lineHeight: 1.4 }}>
                        <span style={{ flexShrink: 0, fontSize: 11 }}>–</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div style={{ marginTop: 'auto' }}>
                {ctaHref === '#apply' ? (
                  <button
                    onClick={() => { setApplyTier(name); document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`btn ${highlight ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ display: 'block', width: '100%', textAlign: 'center' as const, padding: 12, borderRadius: 8, fontWeight: 700, fontSize: 14 }}
                  >{cta}</button>
                ) : (
                  <Link href={ctaHref} className={`btn ${highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ display: 'block', textAlign: 'center' as const, padding: 12, borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>{cta}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">Apply</span></div>
            <h2 style={{ marginBottom: 20 }}>Apply for <em>PRO or Leader</em></h2>
            <p style={{ marginBottom: 14 }}>PRO and Leader memberships are by application during our founding period. We review all applications and respond within five business days.</p>
            <p style={{ marginBottom: 14 }}>We&apos;re building a community of health-curious professionals — your application helps us understand who&apos;s joining and what you&apos;re looking for.</p>
            <p style={{ marginBottom: 24, fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)', lineHeight: 1.7 }}>After approval, you&apos;ll receive pricing and payment details. Explorer access (free) is available immediately at <Link href="/join" style={{ color: 'var(--g-700)' }}>longevityandbiohacking.org/join</Link>.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '🔬', text: 'Full cheat sheet library (all 20 guides)' },
                { icon: '💬', text: 'Three founding communities on Circle' },
                { icon: '📅', text: 'Annual LABS Conference (January 2027, Tampa)' },
                { icon: '🧭', text: 'Leadership Retreat (Leader only)' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-2)' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: '32px 28px' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center' as const, padding: '24px 0' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>✅</div>
                <h3 style={{ marginBottom: 12 }}>Application received.</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>{message}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 16 }}>Want free access now? <Link href="/join" style={{ color: 'var(--g-700)' }}>Join as Explorer →</Link></p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                  {['PRO', 'Leader', 'Partner'].map((t) => (
                    <button key={t} onClick={() => setApplyTier(t)} style={{ flex: 1, fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '9px 0', borderRadius: 6, border: applyTier === t ? '1.5px solid var(--g-600)' : '1.5px solid var(--rule)', background: applyTier === t ? 'var(--g-100)' : 'var(--bg-white)', color: applyTier === t ? 'var(--g-700)' : 'var(--ink-3)', cursor: 'pointer' }}>{t}</button>
                  ))}
                </div>
                {[
                  { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your full name', required: true },
                  { label: 'Email address', key: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                  { label: 'Organization', key: 'organization', type: 'text', placeholder: 'Company or affiliation (optional)', required: false },
                  { label: 'Role / title', key: 'role', type: 'text', placeholder: 'Your current role (optional)', required: false },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' as const }} />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>Why are you interested in LABS {applyTier}?</label>
                  <textarea rows={3} placeholder="Tell us a bit about what you're looking for..." value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical' as const, boxSizing: 'border-box' as const }} />
                </div>
                {status === 'error' && <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>{message}</div>}
                <button onClick={handleApply} disabled={status === 'loading' || !form.name || !form.email} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: 13, opacity: (status === 'loading' || !form.name || !form.email) ? 0.6 : 1 }}>
                  {status === 'loading' ? 'Submitting…' : `Submit ${applyTier} Application`}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-tint">
        <div className="eyebrow"><span className="label">FAQ</span></div>
        <h2 style={{ marginBottom: 32 }}>Common <em>questions</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1.5px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
          {faqItems.map(({ q, a }, i) => (
            <div key={q} style={{ padding: '24px 28px', borderBottom: i < faqItems.length - 2 ? '1px solid var(--rule)' : undefined, borderRight: i % 2 === 0 ? '1px solid var(--rule)' : undefined, background: 'var(--bg-white)' }}>
              <h4 style={{ marginBottom: 10, color: 'var(--ink)' }}>{q}</h4>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
