import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About LABS',
  description: 'Why LABS exists — a science-backed professional community for wellness, biohacking, and longevity. Our mission, editorial standards, and the people behind it.',
  openGraph: {
    title: 'About LABS — Longevity & Biohacking Society',
    description: 'Why LABS exists — a science-backed professional community for wellness, biohacking, and longevity. Our mission, editorial standards, and the people behind it.',
    url: 'https://longevityandbiohacking.org/about',
  },
  alternates: { canonical: 'https://longevityandbiohacking.org/about' },
};



export default function AboutPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / About</div>
          <h1 style={{ fontSize: 'clamp(48px, 5.5vw, 72px)', marginBottom: 24 }}>Why LABS <em>exists.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300, maxWidth: 540 }}>The science of human longevity has never been more actionable. And yet most professionals have no reliable way to cut through the noise, make sense of the research, or connect with others doing the same work. LABS was built to change that.</p>
        </div>
        <div style={{ borderLeft: '3px solid var(--g-600)', paddingLeft: 24 }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 22, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 12 }}>&ldquo;The goal is not to live forever. It is to be fully alive for as long as you are here.&rdquo;</p>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)' }}>The LABS founding principle</div>
        </div>
      </section>

      <section className="section section-white">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div className="eyebrow"><span className="label">Origin</span></div>
            <h2 style={{ marginBottom: 24 }}>Where this <em>came from</em></h2>
            <p style={{ marginBottom: 16 }}>LABS grew out of a simple observation: professionals who care about their health are getting better information from podcasts and social media than from their own physicians. Not because their doctors are negligent — but because the research is moving faster than clinical practice, and the people most equipped to act on it have no organized community to do so with.</p>
            <p style={{ marginBottom: 16 }}>At the same time, the longevity and biohacking space has developed a serious credibility problem. Influencers sell supplements they are paid to promote. Coaches make claims unsupported by the literature. The signal-to-noise ratio has collapsed.</p>
            <p style={{ marginBottom: 16 }}>LABS was built on a different premise: that health-curious professionals deserve a community that holds itself to a higher standard. Where claims are cited. Where nuance is respected. Where peer conversation replaces guru culture.</p>
            <p style={{ fontSize: 15, color: 'var(--ink)', fontWeight: 500, paddingTop: 20, borderTop: '1px solid var(--rule)', lineHeight: 1.7 }}>We are the Longevity and Biohacking Society. We launched in summer 2026. Our first annual conference is January 2027.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1.5px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { n: 'Summer 2026', l: 'Founding Year', note: 'Soft launch — founding members only' },
              { n: 'Jan 2027', l: 'First Annual Conference', note: 'Open to all PRO and Leader members' },
              { n: '4', l: 'Pillars of Practice', note: 'Longevity · Performance · Biohacking · AI+Health' },
              { n: '3', l: 'Founding Communities', note: 'Active with PRO membership and above' },
            ].map(({ n, l, note }, i) => (
              <div key={l} style={{ padding: '20px 24px', borderBottom: i < 3 ? '1px solid var(--rule)' : undefined, background: 'var(--bg-white)' }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: n.length > 4 ? 20 : 36, color: 'var(--ink)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginTop: 4 }}>{l}</div>
                <div style={{ fontSize: 12, color: 'var(--g-700)', fontWeight: 500, marginTop: 2 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="eyebrow"><span className="label">Clarity</span></div>
        <h2 style={{ marginBottom: 36 }}>What LABS is — and <em>is not</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {[
            { header: 'LABS is', cls: 'tag-green', items: [
              ['🔬','A science-backed professional community','Every resource we produce is grounded in peer-reviewed research or clearly labeled as emerging or anecdotal. We cite our sources.'],
              ['🤝','A peer network for health-curious professionals','Members share what they are actually doing — protocols, results, questions, and honest assessments — without the guru dynamic.'],
              ['📋','A curated library of actionable resources','Cheat sheets, protocols, and guides designed to help you understand your options and have better conversations with your healthcare team.'],
              ['📅','A programming calendar with real events','Virtual education, in-person meetups at AI Week and other gatherings, an annual conference, and a leadership and wellness retreat.'],
              ['🧭','A vetted partner ecosystem','Brands and practitioners in the LABS partner directory meet our evidence standards. No one buys their way in.'],
            ]},
            { header: 'LABS is not', cls: 'tag-amber', items: [
              ['🚫','Medical advice','Nothing we publish tells you what to do with your health. We inform — your physician decides. We include this disclaimer on every resource we produce.'],
              ['🚫','A supplement store or affiliate program','We do not earn commissions on products we recommend. Partner relationships are disclosed and do not influence editorial content.'],
              ['🚫','A wellness blog or influencer platform','There are no personal brands, sponsored posts, or lifestyle content here. LABS is a professional community — the standard is different.'],
              ['🚫','A place for unverified claims','We do not publish content that makes promises the evidence does not support. If the research is preliminary, we say so.'],
              ['🚫','A closed, gatekept community','The Explorer tier is free and always will be. Community access does not require a paid membership.'],
            ]},
          ].map(({ header, cls, items }) => (
            <div key={header}>
              <div className={`tag ${cls}`} style={{ marginBottom: 12 }}>{header}</div>
              <div style={{ border: '1.5px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
                {items.map(([icon, title, body], i) => (
                  <div key={title} style={{ background: 'var(--bg-white)', padding: '14px 18px', display: 'flex', gap: 12, borderBottom: i < items.length - 1 ? '1px solid var(--rule)' : undefined }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
                    <div><strong style={{ display: 'block', fontSize: 13, color: 'var(--ink)', marginBottom: 2 }}>{title}</strong><p style={{ fontSize: 12.5, margin: 0, lineHeight: 1.55 }}>{body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <div className="section-head">
          <div><div className="eyebrow"><span className="label">Audience</span></div><h2>Who <em>belongs here</em></h2></div>
          <p className="section-intro">LABS is built for health-curious professionals — people who want more than generic advice and are capable of engaging with the research. You do not need a medical background. You need intellectual curiosity and a genuine interest in your long-term health.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            ['💼','Executives & Senior Leaders','High-output professionals who understand that sustained performance depends on sustained health. Looking for tools and community to support long-term cognitive and physical function.'],
            ['🏃','Active Optimizers','People already tracking HRV, experimenting with sleep protocols, or wearing a CGM — who want peer community and better signal from the research, not just more content.'],
            ['🔍','Informed Beginners','Professionals just starting to take their health seriously — who want a reliable, noise-free starting point built on evidence, not hype. The cheat sheet library is designed for you.'],
            ['👩‍⚕️','Women Navigating Health','Professionals who want research specific to women's physiology — hormonal health, menopause, performance, and longevity — without filtering through content designed for men.'],
            ['🤖','Tech & AI Professionals','Those at the intersection of technology and health — interested in what AI-driven diagnostics, wearable data, and precision medicine tools can and cannot do right now.'],
            ['🏗️','Founders & Operators','People building companies who recognize that their own health is a business asset — and who want community with others navigating the same pressures and trade-offs.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, border: '1.5px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
              <h3 style={{ fontSize: 17 }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div className="eyebrow"><span className="label">Editorial Standard</span></div>
            <h2 style={{ marginBottom: 20 }}>How we <em>hold ourselves</em> accountable</h2>
            <p style={{ marginBottom: 14 }}>LABS operates under a simple editorial policy: if we cannot support a claim, we do not make it. If a link goes dead, we fix it. If new evidence contradicts what we have published, we update it.</p>
            <p style={{ marginBottom: 14 }}>This applies to everything we produce — cheat sheets, blog articles, partner listings, event programming, and community content. Our community manager and a content accuracy review process ensure standards are maintained as we grow.</p>
            <div style={{ marginTop: 20, padding: 20, background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8 }}>
              <strong style={{ display: 'block', fontSize: 13.5, color: 'var(--ink)', marginBottom: 6 }}>A note on AI-generated content</strong>
              <p style={{ fontSize: 13.5, margin: 0, lineHeight: 1.7 }}>LABS uses AI tools internally to assist with drafting and research. All content that goes live is reviewed, edited, and approved by a human. We do not publish raw AI output. If it reads like it was written by a machine, it does not ship.</p>
            </div>
          </div>
          <div className="checklist">
            {[
              ['✅','Claims are cited','Every factual claim links to a primary source, peer-reviewed study, or is clearly noted as expert opinion or emerging evidence.'],
              ['🔗','All links verified before publishing','Every URL is checked before it goes live. We audit our library on a regular cadence and fix broken links as they occur.'],
              ['🔍','Partners are vetted, not purchased','No brand enters the LABS partner directory without meeting our evidence standards. Sponsorship does not buy editorial placement.'],
              ['⚖️','We acknowledge nuance and uncertainty','When research is preliminary, contested, or context-dependent, we say so explicitly.'],
              ['🔄','We update when the evidence changes','Science moves. When it does, we update our resources rather than leaving outdated information in place.'],
              ['🩺','We are not your doctor','Nothing LABS publishes constitutes medical advice. We help you understand your options and have better conversations with your healthcare team.'],
              ['🚫','No paid editorial','Partners cannot purchase placement in our content library, cheat sheets, or newsletter editorial sections.'],
            ].map(([icon, title, body]) => (
              <div key={title} className="check-row">
                <div className="check-icon">{icon}</div>
                <p className="check-text"><strong>{title}</strong> — {body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="eyebrow"><span className="label">Advisory</span></div>
        <h2 style={{ marginBottom: 28 }}>Advisory board</h2>
        <div className="card" style={{ padding: 32, display: 'flex', gap: 24 }}>
          <div style={{ width: 52, height: 52, background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>🧬</div>
          <div>
            <h3 style={{ marginBottom: 10 }}>Coming Fall 2026</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.72, marginBottom: 12 }}>LABS is assembling an advisory board of longevity researchers, functional medicine practitioners, performance scientists, and health technology experts. Advisory board members help shape our editorial standards, review content for accuracy, and contribute to programming.</p>
            <p style={{ fontSize: 13.5, lineHeight: 1.72, marginBottom: 16 }}>We are prioritizing advisors with active clinical or research roles — people whose day job is working at the frontier of what we cover. Announcements will be made as advisors are confirmed.</p>
            <div className="tag tag-amber">Announcements: Fall 2026</div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-tint)', borderTop: '1px solid var(--rule)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ marginBottom: 12 }}>Ready to join?<br /><em>Explorer is always free.</em></h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 300, maxWidth: 480 }}>Start with a free Explorer membership — access public content, receive the monthly LABS Report newsletter, and attend free virtual events. No credit card required.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">Join LABS Free</Link>
          <Link href="/membership" className="btn btn-secondary btn-lg">View Membership</Link>
        </div>
      </section>
    </>
  );
}
