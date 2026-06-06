import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partners',
  description: 'LABS partner program for brands, clinics, and platforms that meet our evidence standards. Vetted directory, member offers, event sponsorship, and co-created content.',
};

const categories = [
  { icon: '🔬', name: 'Diagnostics & Labs', desc: 'Blood testing, functional panels, epigenetic clocks, microbiome analysis, and other diagnostic services with clinical validity.' },
  { icon: '⌚', name: 'Wearables & Devices', desc: 'Continuous monitoring devices, recovery trackers, CGM platforms, and health hardware with peer-reviewed data on accuracy.' },
  { icon: '🏥', name: 'Clinics & Practitioners', desc: 'Longevity clinics, functional medicine practices, and specialist practitioners with relevant credentials and evidence-based approaches.' },
  { icon: '💊', name: 'Supplements & Nutrition', desc: 'Supplement brands with third-party testing, transparent labeling, and formulations supported by legitimate research.' },
  { icon: '🤖', name: 'Health AI Platforms', desc: 'AI-driven health tools, digital therapeutics, and precision medicine platforms with clinical validation or transparent methodology.' },
  { icon: '📚', name: 'Education & Research', desc: 'Research institutions, publishers, continuing education providers, and organizations advancing the science LABS covers.' },
];

const packageFeatures = [
  { tier: 'Foundation', price: 'From $5,000/yr', features: ['Partner directory listing', 'Member offer (1 per quarter)', 'Newsletter partner mention (1 per quarter)', 'Conference expo table'] },
  { tier: 'Growth', price: 'From $12,000/yr', features: ['Everything in Foundation', 'Co-created cheat sheet or resource (1 per year)', 'Monthly newsletter partner feature', 'Virtual event presentation slot (1 per year)', 'Conference speaking opportunity (panel)'] },
  { tier: 'Strategic', price: 'Custom', features: ['Everything in Growth', 'Multiple co-created resources', 'Dedicated newsletter feature', 'Keynote or lead session at conference', 'Advisory seat and community input', 'Custom member programming'] },
];

export default function PartnersPage() {
  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '80px 56px 72px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 80, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>LABS / Partners</div>
          <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', marginBottom: 20 }}>The <em>partner program.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.78, fontWeight: 300 }}>LABS partners with brands, clinics, and platforms that meet our evidence standards. All partner relationships are transparent to members. Editorial content is never for sale.</p>
        </div>
        <div style={{ background: 'var(--g-100)', border: '1.5px solid var(--g-200)', borderRadius: 14, padding: '28px 28px' }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--g-700)', marginBottom: 16 }}>The LABS standard</div>
          {['Evidence-based products or services', 'Transparent ingredient or methodology disclosure', 'No unsubstantiated health claims', 'Third-party testing where applicable', 'No conflicts with LABS editorial independence'].map((item) => (
            <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--ink-2)', marginBottom: 10, lineHeight: 1.5 }}>
              <span style={{ color: 'var(--g-600)', flexShrink: 0 }}>✓</span>{item}
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="eyebrow"><span className="label">Categories</span></div>
        <h2 style={{ marginBottom: 12 }}>Who we <em>partner with</em></h2>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 580, marginBottom: 40, lineHeight: 1.72 }}>We partner with companies across six categories. Every partner must pass our evidence review before onboarding. We do not accept every applicant.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {categories.map(({ icon, name, desc }) => (
            <div key={name} className="card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
              <span style={{ fontSize: 28 }}>{icon}</span>
              <h3 style={{ fontSize: 17 }}>{name}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-white">
        <div className="eyebrow"><span className="label">Partner Packages</span></div>
        <h2 style={{ marginBottom: 12 }}>What <em>partners get</em></h2>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 580, marginBottom: 40, lineHeight: 1.72 }}>Partner packages are structured around three tiers. All prices are annual. Custom arrangements are available for Strategic partners.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {packageFeatures.map(({ tier, price, features }) => (
            <div key={tier} className="card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column' as const, gap: 18 }}>
              <div>
                <h3 style={{ fontSize: 22, marginBottom: 4 }}>{tier}</h3>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.015em' }}>{price}</div>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--rule)' }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
                {features.map((f) => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--ink-2)', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.45 }}>
                    <span style={{ color: 'var(--g-600)', flexShrink: 0, fontSize: 11, marginTop: 1 }}>—</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 10, padding: '20px 24px' }}>
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-3)', margin: 0, lineHeight: 1.7 }}>All partner content must meet LABS editorial standards. Partners cannot purchase placement in our cheat sheet library or editorial newsletter sections. Partnership benefits are clearly disclosed to members. LABS retains full editorial independence.</p>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="eyebrow"><span className="label">Get Started</span></div>
            <h2 style={{ marginBottom: 20 }}>Partner <em>inquiry</em></h2>
            <p style={{ marginBottom: 14 }}>If your brand, clinic, or platform meets LABS evidence standards and serves the professional health community, we want to hear from you. All inquiries are reviewed within five business days.</p>
            <p style={{ marginBottom: 28 }}>We are particularly interested in partners in diagnostics and lab testing, wearables with validated accuracy, and longevity-focused clinical practices.</p>
            <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-3)', lineHeight: 1.7 }}>Not every applicant is accepted. If we do not think your product or service is ready for LABS members, we will tell you why.</p>
          </div>
          <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32 }}>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>Partner inquiry form</div>
            {[
              { label: 'Company name', type: 'text', placeholder: 'Your company' },
              { label: 'Contact name', type: 'text', placeholder: 'Your full name' },
              { label: 'Email address', type: 'email', placeholder: 'your@company.com' },
              { label: 'Website', type: 'url', placeholder: 'https://' },
            ].map(({ label, type, placeholder }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>{label}</label>
                <input type={type} placeholder={placeholder} style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 6, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none' }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--ink-3)', marginBottom: 6 }}>Tell us about your product or service</label>
              <textarea rows={4} placeholder="What you offer, who it is for, and what evidence supports it..." style={{ width: '100%', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 6, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical' as const }} />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Inquiry</button>
          </div>
        </div>
      </section>
    </>
  );
}
