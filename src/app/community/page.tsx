import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community — Groups & Networking',
  description: 'Three professional longevity and biohacking communities on Circle: Women in Wellness, Lead Well Leadership Circle, and Biohackers Social. Peer networking, expert Q&A, and protocol sharing.',
  openGraph: {
    title: 'Longevity & Biohacking Community — LABS',
    description: 'Three professional communities on Circle — Women in Wellness, Lead Well Leadership Circle, and Biohackers Social. Peer networking for health-curious professionals.',
    url: 'https://longevityandbiohacking.org/community',
  },
  alternates: { canonical: 'https://longevityandbiohacking.org/community' },
};



export default function CommunityPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px' }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Community</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>Where the <em>conversation happens.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>LABS community lives on Circle — a dedicated platform built for professional communities. Three founding groups are available from day one to PRO and above members. Discussions, resources, events, and peer connections, all in one place.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">How it works</span></div>
            <h2 style={{ marginBottom: 20 }}>Built on <em>Circle</em></h2>
            <p style={{ marginBottom: 14 }}>Circle is a professional community platform purpose-built for engaged, structured communities. LABS uses Circle to host all three founding groups with separate spaces for discussions, resources, events, and direct member connections.</p>
            <p style={{ marginBottom: 14 }}>All community activity is behind a PRO membership. This keeps the quality of conversation high and ensures members are genuinely invested in the community — not just passing through.</p>
            <p style={{ marginBottom: 24 }}>Explorer members can see what the communities contain, but full access — posting, replying, attending community events, and connecting with other members — requires PRO.</p>
            <Link href="/membership" className="btn btn-primary">Upgrade to PRO</Link>
          </div>
          <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32, display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
            <div className="eyebrow"><span className="label">What PRO members get</span></div>
            {[
              ['💬','Full posting and reply access in all three groups'],
              ['📁','Pinned resources and protocol libraries in each space'],
              ['📅','Community-only events and live Q&A sessions'],
              ['🔗','Direct member connections and introductions'],
              ['🔔','Group announcements and expert contributions'],
              ['📊','Peer sharing — protocols, results, and real-world data'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)' }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE GROUPS */}
      <section className="section section-white">
        <div className="eyebrow"><span className="label">Founding Communities</span></div>
        <h2 style={{ marginBottom: 12 }}>Three groups, <em>open at launch</em></h2>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 600, marginBottom: 48, lineHeight: 1.72 }}>Each group has its own focus, its own spaces, and its own programming. Join any or all with your PRO membership.</p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 24 }}>
          {/* Women in Wellness */}
          <div id="women" className="card" style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 32, alignItems: 'start' }}>
            <div style={{ width: 64, height: 64, background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👩‍⚕️</div>
            <div>
              <div className="tag tag-green" style={{ marginBottom: 12 }}>PRO &amp; Above</div>
              <h2 style={{ fontSize: 28, marginBottom: 12 }}>Women in Wellness</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 20, maxWidth: 580 }}>A dedicated space for women navigating longevity, hormonal health, and performance. Grounded in research specific to women&apos;s physiology — not generic advice with a pink filter applied. Discussions are led by members and occasionally joined by practitioners with relevant expertise.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {['Hormonal Health & HRT','Perimenopause & Menopause',"Women's Longevity Research",'Strength & Bone Density','Nutrition & Metabolic Health','Sleep & Stress'].map((topic) => (
                  <div key={topic} style={{ background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 6, padding: '8px 12px', fontSize: 12.5, color: 'var(--ink-2)' }}>{topic}</div>
                ))}
              </div>
            </div>
            <Link href="/membership" className="btn btn-outline-green" style={{ whiteSpace: 'nowrap' as const }}>Join with PRO</Link>
          </div>

          {/* Lead Well */}
          <div id="lead-well" className="card" style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 32, alignItems: 'start' }}>
            <div style={{ width: 64, height: 64, background: 'var(--a-100)', border: '1.5px solid var(--a-200)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🧭</div>
            <div>
              <div className="tag tag-amber" style={{ marginBottom: 12 }}>PRO &amp; Above</div>
              <h2 style={{ fontSize: 28, marginBottom: 12 }}>Lead Well Leadership Circle</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 20, maxWidth: 580 }}>For executives and senior professionals focused on the intersection of leadership performance, cognitive health, and sustainable high output over a long career. This is the space for professionals who recognize that their health is inseparable from their performance — and want to get serious about both.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {['Executive Performance','Cognitive Longevity','Stress & Resilience','Sleep Optimization','Energy Management','Decision-Making & Health'].map((topic) => (
                  <div key={topic} style={{ background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 6, padding: '8px 12px', fontSize: 12.5, color: 'var(--ink-2)' }}>{topic}</div>
                ))}
              </div>
            </div>
            <Link href="/membership" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' as const, borderColor: 'var(--a-700)', color: 'var(--a-700)' }}>Join with PRO</Link>
          </div>

          {/* Biohackers Social */}
          <div id="biohackers" className="card" style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 32, alignItems: 'start' }}>
            <div style={{ width: 64, height: 64, background: 'var(--b-100)', border: '1.5px solid var(--b-200)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🔬</div>
            <div>
              <div className="tag tag-blue" style={{ marginBottom: 12 }}>PRO &amp; Above</div>
              <h2 style={{ fontSize: 28, marginBottom: 12 }}>Biohackers Social</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, marginBottom: 20, maxWidth: 580 }}>A peer community for members actively experimenting with protocols — wearables, labs, CGM, cold and heat therapy, supplements, and more. Share what you are running, what the data shows, and what has not worked. This is the place for rigorous self-experimentation without the influencer noise.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {['Wearables & Tracking','Lab Work & Biomarkers','CGM & Glucose','Cold & Heat Therapy','Protocol Reviews',"What's Working"].map((topic) => (
                  <div key={topic} style={{ background: 'var(--bg-tint)', border: '1px solid var(--rule)', borderRadius: 6, padding: '8px 12px', fontSize: 12.5, color: 'var(--ink-2)' }}>{topic}</div>
                ))}
              </div>
            </div>
            <Link href="/membership" className="btn btn-secondary" style={{ whiteSpace: 'nowrap' as const, borderColor: 'var(--b-700)', color: 'var(--b-700)' }}>Join with PRO</Link>
          </div>
        </div>
      </section>

      {/* GUIDELINES */}
      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">Community Standards</span></div>
            <h2 style={{ marginBottom: 20 }}>How we <em>keep it good</em></h2>
            <p style={{ marginBottom: 14 }}>LABS community discussions are moderated to the same standard as our published content. Claims should be grounded. Sources should be shareable. Personal experience is welcome — it should be labeled as such.</p>
            <p style={{ marginBottom: 14 }}>Our community manager reviews flagged content and maintains the quality of discussion. Members who consistently post unsupported claims or promotional content will be removed from the community.</p>
            <p>These are not meant to be restrictive — they are what allow the community to be genuinely useful rather than another place where bad information circulates unchecked.</p>
          </div>
          <div className="checklist">
            {[
              ['✅','Cite your sources','If you reference a study or claim, share the source. Members can then evaluate it for themselves.'],
              ['🏷️','Label personal experience','Sharing what worked for you is valuable — just make clear it is anecdote, not evidence.'],
              ['🚫','No promotional content','Mentions of brands, products, or services that benefit you financially must be disclosed.'],
              ['🤝','Respectful disagreement','Challenge ideas, not people. The goal is better information for everyone.'],
              ['🩺','No medical prescriptions','Do not tell other members what medications to take or what dosages to use. Share information, not instructions.'],
              ['📋','Follow LABS editorial standards','The same accuracy standards that apply to our published content apply in the community.'],
            ].map(([icon, title, body]) => (
              <div key={title} className="check-row">
                <div className="check-icon">{icon}</div>
                <p className="check-text"><strong>{title}</strong> — {body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-dark)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
        <div>
          <h2 style={{ color: '#fff', marginBottom: 12 }}>Ready to join<br /><em style={{ color: '#5ee89a' }}>the conversation?</em></h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', maxWidth: 440, lineHeight: 1.72 }}>PRO membership includes full access to all three founding communities on Circle, plus the full cheat sheet library, annual conference, and all in-person events.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <Link href="/membership" className="btn btn-primary btn-lg">Upgrade to PRO</Link>
          <Link href="/membership" className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>View All Tiers</Link>
        </div>
      </section>
    </>
  );
}
