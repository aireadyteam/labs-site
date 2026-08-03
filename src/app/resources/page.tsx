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
        description: 'Dozens of science-backed reference guides on longevity, performance, biohacking, and AI+Health. Every claim cited. Every link verified.',
    url: 'https://longevityandbiohacking.org/resources',
  },
  alternates: { canonical: 'https://longevityandbiohacking.org/resources' },
};



const pillars = ['All', 'Longevity', 'Performance', 'Biohacking', 'AI + Health'];

// 40 cheat sheets — matches public/resources/*.html and members portal RESOURCES
const sheets = [
  { title: 'Better Sleep', pillar: 'Performance', desc: 'Evidence-based protocols for sleep architecture, timing, environment, and the supplements with actual data behind them.', status: 'available' },
  { title: 'Sauna & Cold Plunge', pillar: 'Biohacking', desc: 'Cold water immersion and sauna — what the evidence shows for recovery, inflammation, longevity, and mood. Protocols included.', status: 'available' },
  { title: 'Healthy Diet Foundations', pillar: 'Longevity', desc: 'Dietary patterns with the strongest longevity evidence — protein targets, fasting approaches, and what the research actually shows.', status: 'available' },
{ title: 'Heart Rate Variability', pillar: 'Performance', desc: 'How to measure HRV, what the numbers mean, and how to use them to optimize training, recovery, and nervous system regulation.', status: 'available' },
  { title: 'VO2 Max & Zone 2 Training', pillar: 'Longevity', desc: 'Why VO2 max is the strongest predictor of longevity, how to measure it, and how Zone 2 cardio builds the aerobic base that matters most.', status: 'available' },
  { title: 'Creatine Protocol', pillar: 'Performance', desc: 'The most evidence-backed supplement in existence. Dosing, timing, forms, and the longevity and cognitive benefits beyond muscle.', status: 'available' },
  { title: 'Vitamin D3 & K2', pillar: 'Longevity', desc: 'Optimal dosing, testing, co-factors, and the research on D3 and longevity, immune function, and cardiovascular health.', status: 'available' },
  { title: 'Methylene Blue', pillar: 'Biohacking', desc: 'Emerging research on mitochondrial function, cognitive enhancement, and antimicrobial applications. Dosing and safety considerations.', status: 'available' },
  { title: 'Glutathione', pillar: 'Biohacking', desc: 'The master antioxidant: how to raise it, why it depletes with age, and what the evidence says about NAC, liposomal forms, and IV therapy.', status: 'available' },
  { title: 'Red Light & NIR Therapy', pillar: 'Biohacking', desc: 'Photobiomodulation protocols for recovery, skin health, cognitive function, and mitochondrial support. Device selection and dosing.', status: 'available' },
  { title: 'Breathwork Protocols', pillar: 'Performance', desc: 'Pranayama, box breathing, cyclic sighing, and Wim Hof — evidence-based applications for HRV, stress, performance, and sleep.', status: 'available' },
  { title: 'Meditation & Mindfulness', pillar: 'Performance', desc: 'What the research shows about meditation types, dose-response, and measurable effects on brain structure, stress hormones, and longevity.', status: 'available' },
  { title: 'Gut Health Protocol', pillar: 'Longevity', desc: 'Microbiome optimization, prebiotics, probiotics, and dietary interventions for a resilient gut-brain axis and immune function.', status: 'available' },
  { title: 'Skin Health & Aging', pillar: 'Longevity', desc: 'Evidence-based skincare for longevity: retinoids, SPF, collagen synthesis, and the interventions with the strongest data.', status: 'available' },
  { title: 'Peptides Primer', pillar: 'Biohacking', desc: 'BPC-157, TB-500, Semaglutide, and beyond — clinical context, regulatory status, and what the evidence does and does not support.', status: 'available' },
  { title: 'Sugar & Fasting Science', pillar: 'Longevity', desc: 'Glycemic control, insulin sensitivity, and the science of sugar reduction as a longevity intervention. CGM data and dietary strategies.', status: 'available' },
  { title: 'Fasting Protocols', pillar: 'Longevity', desc: 'Extended fasting, autophagy, and the evidence for multi-day fasts. Protocol design, refeeding, electrolytes, and what to expect.', status: 'available' },
  { title: 'Intermittent Fasting', pillar: 'Longevity', desc: 'The 16:8, 5:2, and OMAD frameworks compared — evidence for each outcome, implementation, and who benefits most.', status: 'available' },
  { title: 'Metabolic Training', pillar: 'Performance', desc: 'HIIT, circuit training, and metabolic conditioning — protocols that maximize insulin sensitivity, VO2 max, and longevity biomarkers.', status: 'available' },
  { title: 'Longevity Hacks for Professionals', pillar: 'Longevity', desc: 'Curated high-leverage interventions for busy professionals — the 20% of actions that drive 80% of longevity outcomes.', status: 'available' },
  { title: 'Omega-3 Fish Oil', pillar: 'Longevity', desc: 'EPA and DHA: the essential fatty acids that reduce inflammation, protect your heart, and support brain structure. Most people are critically deficient.', status: 'available' },
  { title: 'NAD+ NMN & NR', pillar: 'Longevity', desc: 'The coenzyme in every cell that declines with age. NAD+ boosting is the most debated frontier in longevity science.', status: 'available' },
  { title: 'Testosterone & Hormonal Health', pillar: 'Longevity', desc: 'Natural optimization through sleep, training, nutrition, and stress management. When to test, optimal ranges, and an honest overview of TRT.', status: 'available' },
  { title: 'Blood Work & Lab Testing', pillar: 'Longevity', desc: 'The definitive guide to knowing your numbers. What to test, how often, optimal ranges, and where to order.', status: 'available' },
  { title: 'Strength Training for Longevity', pillar: 'Performance', desc: 'Muscle mass is the #2 predictor of longevity after VO2 max. Compound lifts, progressive overload, and training for the decades ahead.', status: 'available' },
  { title: 'Stress & Cortisol', pillar: 'Performance', desc: "Chronic stress accelerates aging across every system. The HPA axis, cortisol rhythm, and practical interventions that go beyond 'just relax.'", status: 'available' },
  { title: 'Magnesium Essential', pillar: 'Longevity', desc: 'The most common deficiency nobody tests for. 8 forms, 300+ enzymatic reactions, and the sleep-muscle-mood connection.', status: 'available' },
  { title: 'Nootropics & Cognition', pillar: 'Biohacking', desc: "Evidence-based cognitive enhancement. What works, what doesn't, and how to build a sustainable focus stack.", status: 'available' },
  { title: 'Mobility & Joint Health', pillar: 'Performance', desc: 'The pillar most biohackers neglect. Flexibility, joint longevity, and injury prevention for sustainable training across decades.', status: 'available' },
  { title: 'Circadian Biology', pillar: 'Longevity', desc: 'Your body runs on a 24-hour clock. Light, meal timing, and exercise timing are the three levers that set it — or break it.', status: 'available' },
  { title: 'Hydration Optimization', pillar: 'Longevity', desc: "Beyond 'drink more water.' Electrolyte balance, mineral content, and the signs most people miss.", status: 'available' },
  { title: 'Wearables & Tracking', pillar: 'Biohacking', desc: 'Oura, WHOOP, Apple Watch, CGM, and Eight Sleep. What each tracks, how accurate they are, and which to buy for your goals.', status: 'available' },
  { title: 'Epigenetics & Biological Age', pillar: 'Longevity', desc: 'Your genes are not your destiny. Epigenetic clocks measure biological aging — and your behaviors directly influence the readings.', status: 'available' },
  { title: 'Adaptogens & Herbs', pillar: 'Biohacking', desc: 'Ashwagandha, rhodiola, holy basil, and reishi. What the evidence actually supports, dosing, and cycling protocols.', status: 'available' },
  { title: 'Hyperbaric Oxygen', pillar: 'Biohacking', desc: 'Pressurized oxygen therapy for wound healing, brain health, and anti-aging. The Israeli aging trial and what it means for longevity.', status: 'available' },
  { title: 'Alcohol & Longevity', pillar: 'Longevity', desc: 'The data has shifted. No safe level for cancer risk. Sleep destruction, gut damage, and the honest truth about moderate drinking.', status: 'available' },
  { title: 'Dental Health', pillar: 'Longevity', desc: 'Oral microbiome, periodontal disease as cardiovascular risk, and the mouth-body connection most people miss.', status: 'available' },
  { title: 'Grounding & Earthing', pillar: 'Biohacking', desc: "Direct contact with the earth's surface. What the limited evidence says about inflammation, cortisol, and sleep.", status: 'available' },
  { title: "Women's Hormonal Health", pillar: 'Longevity', desc: 'Perimenopause, menopause, HRT evidence, cycle-synced nutrition, and the underserved space in biohacking.', status: 'available' },
  { title: 'Social Connection & Purpose', pillar: 'Longevity', desc: 'The Blue Zones data shows relationships and purpose predict longevity as strongly as exercise. The pillar most biohackers ignore.', status: 'available' },
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
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>{sheets.length} science-backed reference guides across longevity, performance, biohacking, and AI + Health. Every claim is cited. Every link is verified. Free previews for all members — full access with PRO.</p>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {sheets.map(({ title, pillar, desc }, i) => (
            <div key={title} className="card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' as const, overflow: 'hidden' }}>
              <div className={`tag ${pillarColors[pillar]}`}>{pillar}</div>
              <div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>Full description available with PRO membership.</p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--ink-4)' }}>
                  <span>PDF + Web</span>
                  <span>·</span>
                  <span>Cited</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--rule)', padding: '64px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 56, alignItems: 'center' }}>
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
        <h2>Unlock all {sheets.length} cheat sheets<br />with <em>PRO membership.</em></h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 460, lineHeight: 1.72 }}>PRO members get the full library, plus community access, annual conference, in-person events, and the full member portal.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">Upgrade to PRO</Link>
          <Link href="/membership" className="btn btn-secondary btn-lg">Compare All Tiers</Link>
        </div>
      </section>
    </>
  );
}
