import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LABS Report Newsletter',
  description: 'The LABS Report — a monthly newsletter covering longevity research, performance protocols, biohacking updates, and community highlights. Free for all Explorer members.',
};

const issues = [
  { issue: 'Issue 01', date: 'Launch Issue — Summer 2026', title: 'Welcome to LABS', topics: ['Introducing the Longevity and Biohacking Society', 'The three founding communities', 'First cheat sheet drop: Sleep Optimization', 'What we are building and why'], status: 'upcoming' },
];

export default function NewsletterPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Newsletter</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>The LABS <em>Report.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>A monthly newsletter covering new longevity research, protocol updates, community highlights, and what is worth reading across the four pillars. Free for all Explorer members. No filler. No sponsored content disguised as editorial.</p>
        </div>
        <div style={{ background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: '28px 28px' }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 16 }}>Each issue covers</div>
          {['Research worth knowing — new studies and what they mean','Protocol updates — when the evidence shifts','Community highlights — what members are working on','Resources — new cheat sheets and guides','Events — upcoming programming and announcements'].map((item) => (
            <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--ink-2)', marginBottom: 10, lineHeight: 1.5 }}>
              <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>—</span>{item}
            </div>
          ))}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--g-700)' }}>Free with Explorer membership</div>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' as const }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="label">Subscribe</span></div>
          <h2 style={{ marginBottom: 16 }}>Get the LABS Report <em>free.</em></h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 28, lineHeight: 1.72 }}>Subscribe below to receive the LABS Report monthly. Free for all Explorer members — no credit card required.</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '13px 18px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none' }} />
            <button className="btn btn-primary">Subscribe</button>
          </div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-4)' }}>No spam. Unsubscribe anytime. Published monthly.</div>
        </div>
      </section>

      <section className="section section-white">
        <div className="eyebrow"><span className="label">Archive</span></div>
        <h2 style={{ marginBottom: 32 }}>Past <em>issues</em></h2>
        {issues.map(({ issue, date, title, topics, status }) => (
          <div key={issue} className="card" style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 28, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 4 }}>{issue}</div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: 'var(--ink-4)', lineHeight: 1.5 }}>{date}</div>
              <div className="tag tag-amber" style={{ marginTop: 10 }}>{status === 'upcoming' ? 'Upcoming' : 'Published'}</div>
            </div>
            <div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{title}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
                {topics.map((t) => (
                  <li key={t} style={{ fontSize: 13.5, color: 'var(--ink-2)', display: 'flex', gap: 8, lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>—</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flexShrink: 0 }}>
              {status === 'upcoming'
                ? <button className="btn btn-secondary" style={{ fontSize: 13 }}>Coming Soon</button>
                : <Link href="/newsletter/issue-01" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>Read Issue →</Link>
              }
            </div>
          </div>
        ))}
        <div style={{ marginTop: 24, padding: '20px 24px', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 10 }}>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)', margin: 0 }}>The LABS Report launches with our summer 2026 soft launch. Subscribe above to receive the first issue.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">Editorial Policy</span></div>
            <h2 style={{ marginBottom: 20 }}>What the LABS Report <em>is not</em></h2>
            <p style={{ marginBottom: 14 }}>The LABS Report does not carry advertisements. Partner mentions are clearly disclosed and appear in a dedicated partner section, not integrated into editorial content.</p>
            <p style={{ marginBottom: 14 }}>We do not write about products or research in exchange for payment. If we cover something, it is because we think it is worth your attention.</p>
            <p>The report is written by the LABS editorial team. All claims follow the same citation and verification standards as our published content.</p>
          </div>
          <div className="checklist">
            {[
              ['🚫','No advertisements','The LABS Report does not carry display ads or sponsored content disguised as editorial.'],
              ['✅','Partner disclosure','When a LABS partner is mentioned, it is clearly labeled. Partners do not influence editorial coverage.'],
              ['📝','Cited claims','Research references link to primary sources. You can check everything we write.'],
              ['🔄','Updated when wrong','If we publish something that new evidence contradicts, we correct it in the next issue.'],
            ].map(([icon, title, body]) => (
              <div key={title} className="check-row">
                <div className="check-icon">{icon}</div>
                <p className="check-text"><strong>{title}</strong> — {body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
