import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, research digests, expert conversations, and member spotlights from the LABS community.',
};

const featured = {
  tag: 'Longevity', tagClass: 'tag-green',
  title: 'What VO2 Max Actually Predicts — And How to Improve It',
  excerpt: 'VO2 max has emerged as the single strongest predictor of all-cause mortality — stronger than smoking, diabetes, or hypertension. Here is what the research says about how to measure it, what counts as a meaningful improvement, and the training approach with the most evidence behind it.',
  readTime: '8 min read',
  date: 'Coming at launch',
};

const posts = [
  { tag: 'Performance', tagClass: 'tag-blue', title: 'The Sleep Architecture Most Professionals Are Missing', excerpt: 'Most sleep tracking focuses on duration. The research on longevity and cognitive performance points to something more specific.', readTime: '6 min', date: 'Coming at launch' },
  { tag: 'Biohacking', tagClass: 'tag-amber', title: 'Cold Water Immersion: What the Evidence Actually Shows', excerpt: 'A review of the clinical literature on cold exposure — separating the outcomes with solid evidence from the ones that are more contested.', readTime: '7 min', date: 'Coming at launch' },
  { tag: 'AI + Health', tagClass: 'tag-purple', title: 'AI-Driven Health Diagnostics: What Is Ready to Use Now', excerpt: 'A practical guide to the AI health tools that have clinical validation behind them and the ones that are still experimental.', readTime: '9 min', date: 'Coming at launch' },
  { tag: 'Longevity', tagClass: 'tag-green', title: 'Understanding Biological Age Tests: A Critical Review', excerpt: 'Epigenetic clocks, telomere testing, and biological age calculators — what they measure, what they do not, and how to interpret results.', readTime: '10 min', date: 'Coming at launch' },
  { tag: 'Performance', tagClass: 'tag-blue', title: 'HRV Fundamentals: How to Measure and What to Do With the Data', excerpt: 'Heart rate variability is a useful signal — but most people are tracking it incorrectly and interpreting it without context.', readTime: '7 min', date: 'Coming at launch' },
  { tag: 'Biohacking', tagClass: 'tag-amber', title: 'CGM Beyond Diabetes: What Continuous Glucose Data Tells Healthy People', excerpt: 'Continuous glucose monitors are increasingly used by people without diabetes. Here is what the data can and cannot tell you.', readTime: '8 min', date: 'Coming at launch' },
];

export default function BlogPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Blog</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Research, reviewed.<br /><em>Without the noise.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>Articles, research digests, expert conversations, and protocol deep dives. Every claim is cited. Every link is verified. Published at launch and updated as the research evolves.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="eyebrow"><span className="label">Featured</span></div>
        <div className="card" style={{ padding: '40px 44px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 48, alignItems: 'center', marginBottom: 48 }}>
          <div>
            <div className={`tag ${featured.tagClass}`} style={{ marginBottom: 16 }}>{featured.tag}</div>
            <h2 style={{ fontSize: 32, marginBottom: 16 }}>{featured.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.78, marginBottom: 24 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Link href="/blog/vo2-max" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>Read article →</Link>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-4)' }}>{featured.readTime} · {featured.date}</span>
            </div>
          </div>
          <div style={{ background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--g-700)' }}>In this article</div>
            {['What VO2 max measures and why it matters', 'The all-cause mortality data', 'How to test your VO2 max accurately', 'Zone 2 training — the evidence', 'How long meaningful improvement takes'].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>—</span>{item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' as const }}>
          {['All', 'Longevity', 'Performance', 'Biohacking', 'AI + Health', 'Research Reviews', 'Expert Q&As'].map((f) => (
            <button key={f} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '6px 14px', borderRadius: 6, border: f === 'All' ? '1.5px solid var(--g-600)' : '1.5px solid var(--rule)', background: f === 'All' ? 'var(--g-100)' : 'var(--bg-white)', color: f === 'All' ? 'var(--g-700)' : 'var(--ink-3)', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {posts.map(({ tag, tagClass, title, excerpt, readTime, date }) => (
            <div key={title} className="card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              <div className={`tag ${tagClass}`}>{tag}</div>
              <h3 style={{ fontSize: 17 }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0, flex: 1 }}>{excerpt}</p>
              <div style={{ paddingTop: 14, borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink-4)' }}>{readTime} · {date}</span>
                <Link href="/blog" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>Read →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--rule)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ marginBottom: 12 }}>Get new articles<br /><em>in the LABS Report.</em></h2>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 300, maxWidth: 440 }}>The LABS Report is a monthly newsletter covering new research, protocol updates, and community highlights. Free for all Explorer members.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, maxWidth: 400, width: '100%' }}>
          <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 8, padding: '12px 16px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none' }} />
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </section>
    </>
  );
}
