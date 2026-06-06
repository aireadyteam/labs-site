import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cheat Sheet Library',
  description: 'Science-backed longevity and biohacking cheat sheets covering sleep, VO2 max, HRV, peptides, fasting, supplements, and more. Evidence-based protocols for health-curious professionals.',
  keywords: [
    'longevity cheat sheets', 'biohacking protocols', 'HRV monitoring guide',
    'VO2 max training', 'intermittent fasting protocol', 'peptides guide',
    'creatine protocol', 'sleep optimization', 'cold plunge protocol',
    'vitamin D3 guide', 'methylene blue', 'gut health protocol',
  ],
  openGraph: {
    title: 'Longevity & Biohacking Cheat Sheet Library — LABS',
    description: '20 science-backed reference guides on longevity, performance, biohacking, and AI+Health. Every claim cited. Every link verified.',
    url: 'https://longevityandbiohacking.org/resources',
  },
  alternates: { canonical: 'https://longevityandbiohacking.org/resources' },
};



const pillars = ['All', 'Longevity', 'Performance', 'Biohacking', 'AI + Health'];

// Placeholder cheat sheets — content to be integrated from Chrome instance
const sheets = [
  { title: 'Better Sleep', pillar: 'Performance', desc: 'Evidence-based protocols for sleep architecture, timing, environment, and the supplements with actual data behind them.', status: 'available' },
  { title: 'Key Biomarkers to Track', pillar: 'Longevity', desc: 'The blood panels, imaging, and functional tests that give you the clearest picture of your biological age and disease risk.', status: 'available' },
  { title: 'Longevity Nutrition', pillar: 'Longevity', desc: 'Dietary patterns with the strongest longevity evidence — protein targets, fasting approaches, and what the Blue Zones research actually shows.', status: 'available' },
  { title: 'HRV & Recovery', pillar: 'Performance', desc: 'How to measure heart rate variability, what the numbers mean, and how to use them to optimize training and recovery decisions.', status: 'available' },
  { title: 'VO2 Max & Zone 2 Training', pillar: 'Longevity', desc: 'Why VO2 max is the strongest predictor of longevity, how to measure it, and how Zone 2 cardio builds the aerobic base that matters most.', status: 'available' },
  { title: 'Cold Therapy Protocols', pillar: 'Biohacking', desc: 'Cold water immersion and cryotherapy — what the evidence shows for recovery, inflammation, and mood, with practical temperature and duration guidance.', status: 'available' },
  { title: 'Sauna & Heat Therapy', pillar: 'Biohacking', desc: 'The cardiovascular and longevity benefits of sauna use, the protocols behind the Finnish research, and how to integrate heat safely.', status: 'available' },
  { title: 'Cognitive Performance Stack', pillar: 'Performance', desc: 'Evidence-based approaches to cognitive optimization — sleep, movement, nutrition, and the supplements with legitimate data behind them.', status: 'available' },
  { title: 'Lab Tests Worth Ordering', pillar: 'Longevity', desc: 'Beyond standard blood work — the panels, functional tests, and biomarkers worth adding to your annual health review and why.', status: 'available' },
  { title: "Wearables Buyer's Guide", pillar: 'Biohacking', desc: 'A practical comparison of the leading wearables — what each measures accurately, where they fall short, and how to choose the right one.', status: 'available' },
  { title: 'Supplements 101', pillar: 'Performance', desc: 'The supplements with the strongest evidence base, common dosing guidance, and an honest look at what the research does and does not support.', status: 'available' },
  { title: 'Intermittent Fasting Protocols', pillar: 'Longevity', desc: 'A comparison of the major fasting approaches — 16:8, 5:2, extended fasting — and what the research shows for each outcome.', status: 'available' },
  { title: 'AI Health Tools', pillar: 'AI + Health', desc: 'The current landscape of AI-driven health tools — what is ready to use now, what is still experimental, and how to evaluate claims critically.', status: 'available' },
  { title: 'Epigenetics Basics', pillar: 'Longevity', desc: 'What epigenetic clocks measure, why biological age diverges from chronological age, and the interventions with the most evidence for slowing it.', status: 'available' },
  { title: 'Stress & Cortisol', pillar: 'Performance', desc: 'The physiology of chronic stress, its effects on longevity and performance, and evidence-based interventions that measurably reduce cortisol burden.', status: 'available' },
  { title: 'Peptides Primer', pillar: 'Biohacking', desc: 'An introduction to therapeutic peptides — what they are, which ones have clinical research behind them, and the regulatory and safety considerations.', status: 'available' },
  { title: 'Strength Training for Longevity', pillar: 'Longevity', desc: 'Why muscle mass is a longevity biomarker, the training protocols with the strongest evidence, and how to approach resistance training across decades.', status: 'available' },
  { title: 'Continuous Glucose Monitoring', pillar: 'Biohacking', desc: 'What a CGM actually tells you, how to interpret glucose data, and what the research says about glycemic variability and long-term health.', status: 'available' },
  { title: 'Hormonal Health', pillar: 'Performance', desc: 'The role of key hormones in performance and longevity, how to test accurately, and what the evidence says about optimization and replacement.', status: 'available' },
  { title: 'Digital Biomarkers & Precision Medicine', pillar: 'AI + Health', desc: 'How wearable data, genetic testing, and AI diagnostics are converging — what is clinically validated now and what to watch over the next three years.', status: 'available' },
];

const pillarColors: Record<string, string> = {
  'Longevity': 'tag-green',
  'Performance': 'tag-blue',
  'Biohacking': 'tag-amber',
  'AI + Health': 'tag-purple',
};

export default function ResourcesPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 60px' }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Resources</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>The cheat sheet <em>library.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>Twenty science-backed reference guides across longevity, performance, biohacking, and AI + Health. Every claim is cited. Every link is verified. Free previews for all members — full access with PRO.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const }}>
          {pillars.map((p) => (
            <button key={p} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, padding: '6px 14px', borderRadius: 6, border: p === 'All' ? '1.5px solid var(--g-600)' : '1.5px solid var(--rule)', background: p === 'All' ? 'var(--g-100)' : 'var(--bg-white)', color: p === 'All' ? 'var(--g-700)' : 'var(--ink-3)', cursor: 'pointer' }}>{p}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 8, padding: '10px 18px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#138a48" strokeWidth="1.2"/><path d="M4.5 7.2l1.8 1.8 3.2-3.6" stroke="#138a48" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--g-700)' }}>Full library access with PRO membership</span>
            <Link href="/membership" style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--g-700)', fontWeight: 500 }}>Upgrade →</Link>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {sheets.map(({ title, pillar, desc }, i) => (
            <div key={title} className="card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' as const, overflow: 'hidden' }}>
              {i > 2 && (
                <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(250,250,250,0.7)', backdropFilter: 'blur(4px)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: 10, borderRadius: 12 }}>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--g-700)' }}>PRO Members</div>
                  <Link href="/membership" className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Unlock Full Library</Link>
                </div>
              )}
              <div className={`tag ${pillarColors[pillar]}`}>{pillar}</div>
              <div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-4)' }}>
                  <span>PDF + Web</span>
                  <span>·</span>
                  <span>Cited</span>
                </div>
                {i < 3 && <Link href={`/resources/${title.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>View →</Link>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--rule)', padding: '64px 56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="eyebrow"><span className="label">Editorial Standard</span></div>
          <h2 style={{ marginBottom: 16 }}>How we <em>build these</em></h2>
          <p style={{ marginBottom: 12 }}>Every cheat sheet in the LABS library is built from primary literature — not summaries of summaries. We work from peer-reviewed studies, systematic reviews, and meta-analyses where they exist.</p>
          <p style={{ marginBottom: 12 }}>All claims are cited inline. All links are verified before publishing. Where evidence is mixed or preliminary, we say so. These are reference tools, not prescriptions.</p>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-3)', lineHeight: 1.7 }}>Nothing in the LABS resource library constitutes medical advice. Consult a qualified healthcare provider before making changes to your health regimen.</p>
        </div>
        <div className="checklist">
          {[
            ['✅','Built from primary literature','We work from peer-reviewed studies and meta-analyses, not secondary summaries.'],
            ['🔗','All links verified','Every source link is checked before publishing and audited on a regular schedule.'],
            ['📝','Claims cited inline','You can check every factual statement against its source directly on the page.'],
            ['⚖️','Uncertainty acknowledged','We distinguish strong evidence from emerging research from expert consensus.'],
            ['🔄','Updated as evidence evolves','We revise resources when new research materially changes the picture.'],
          ].map(([icon, title, body]) => (
            <div key={title} className="check-row">
              <div className="check-icon">{icon}</div>
              <p className="check-text"><strong>{title}</strong> — {body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-tint)', borderTop: '1px solid var(--rule)', padding: '72px 56px', textAlign: 'center' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 20 }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="label">Full Access</span></div>
        <h2>Unlock all 20 cheat sheets<br />with <em>PRO membership.</em></h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 460, lineHeight: 1.72 }}>PRO members get the full library, plus community access, annual conference, in-person events, and the full member portal.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">Upgrade to PRO</Link>
          <Link href="/membership" className="btn btn-secondary btn-lg">Compare All Tiers</Link>
        </div>
      </section>
    </>
  );
}
