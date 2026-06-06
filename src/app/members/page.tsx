import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Member Dashboard',
  description: 'Your LABS member dashboard',
};

const tierColors: Record<string, string> = {
  explorer: 'tag-gray',
  pro: 'tag-green',
  leader: 'tag-amber',
};

const tierResources: Record<string, { available: boolean; title: string; pillar: string }[]> = {
  explorer: [
    { available: true, title: 'Better Sleep', pillar: 'Performance' },
    { available: true, title: 'Key Biomarkers to Track', pillar: 'Longevity' },
    { available: true, title: 'Longevity Nutrition', pillar: 'Longevity' },
    { available: false, title: 'HRV & Recovery', pillar: 'Performance' },
    { available: false, title: 'VO2 Max & Zone 2', pillar: 'Longevity' },
    { available: false, title: 'Cold Therapy Protocols', pillar: 'Biohacking' },
  ],
  pro: [],
  leader: [],
};

export default async function MembersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/join');
  }

  // Get member record
  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('id', user.id)
    .single();

  const tier = member?.tier || 'explorer';
  const name = member?.name || user.user_metadata?.name || 'Member';
  const resources = tier === 'explorer' ? tierResources.explorer : [];

  return (
    <>
      <section style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--rule)', padding: '48px 56px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 12 }}>LABS / Member Dashboard</div>
            <h1 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: 8 }}>Welcome back, <em>{name}.</em></h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className={`tag ${tierColors[tier] || 'tag-gray'}`} style={{ textTransform: 'capitalize' as const }}>{tier} Member</div>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.1em' }}>{user.email}</span>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="btn btn-secondary" style={{ fontSize: 13 }}>Sign Out</button>
          </form>
        </div>
      </section>

      <section className="section section-tint">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 40 }}>
          {[
            { label: 'Tier', value: tier.charAt(0).toUpperCase() + tier.slice(1), note: 'Current membership level' },
            { label: 'Cheat Sheets', value: tier === 'explorer' ? '3 / 20' : '20 / 20', note: tier === 'explorer' ? 'Upgrade to PRO for full access' : 'Full library access' },
            { label: 'Community', value: tier === 'explorer' ? 'Not included' : 'Active', note: tier === 'explorer' ? 'PRO+ required' : 'Circle access active' },
          ].map(({ label, value, note }) => (
            <div key={label} style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 12, padding: '24px 22px' }}>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 24, color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{note}</div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="eyebrow"><span className="label">Your Resources</span></div>
        <h2 style={{ marginBottom: 24 }}>Cheat sheet <em>library</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {resources.map(({ available, title, pillar }) => (
            <div key={title} className="card" style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column' as const, gap: 12, opacity: available ? 1 : 0.5, position: 'relative' as const }}>
              {!available && (
                <div style={{ position: 'absolute' as const, inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: 8, background: 'rgba(243,247,244,0.85)', backdropFilter: 'blur(2px)', borderRadius: 12 }}>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)' }}>PRO Members</div>
                  <Link href="/membership" className="btn btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}>Upgrade</Link>
                </div>
              )}
              <div className="tag tag-green">{pillar}</div>
              <h3 style={{ fontSize: 16 }}>{title}</h3>
              {available && (
                <Link href={`/resources/${title.toLowerCase().replace(/\s+/g, '-')}`} style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--g-700)', textDecoration: 'none', fontWeight: 500 }}>View →</Link>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade CTA for Explorer */}
        {tier === 'explorer' && (
          <div style={{ background: 'var(--bg-dark)', borderRadius: 14, padding: '36px 40px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(94,232,154,0.7)', marginBottom: 10 }}>PRO Membership</div>
              <h3 style={{ color: '#fff', fontSize: 22, marginBottom: 10 }}>Unlock the full library, community, and conference.</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, margin: 0, lineHeight: 1.65 }}>PRO includes all 20 cheat sheets, access to all three founding communities on Circle, the annual LABS Conference, and all in-person events.</p>
            </div>
            <Link href="/membership" className="btn btn-primary btn-lg" style={{ background: '#1aa658', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>Apply for PRO</Link>
          </div>
        )}
      </section>
    </>
  );
}
