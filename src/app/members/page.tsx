'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

/* ─── Types ─── */
type Tier = 'explorer' | 'pro' | 'leader' | 'partner';
interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  title: string;
  bio: string;
  location: string;
  tier: Tier;
  interests: string[];
  created_at: string;
}

/* ─── Constants ─── */
const PRO_WHITELIST = ['zack@joineta.org'];
const TIER_RANK: Record<Tier, number> = { explorer: 1, pro: 2, leader: 3, partner: 4 };
const AMBER = '#D4A847';

const RESOURCES = [
  { id: 1, title: 'Sleep Optimization Protocol', desc: 'Evidence-based frameworks for deep sleep, HRV optimization, and circadian alignment.', tag: 'Sleep', free: true },
  { id: 2, title: 'Longevity Supplement Stack', desc: 'Research-backed supplementation protocols: NMN, resveratrol, metformin context.', tag: 'Longevity', free: true },
  { id: 3, title: 'Metabolic Health Cheat Sheet', desc: 'Key biomarkers, CGM interpretation, and dietary strategies for metabolic resilience.', tag: 'Nutrition', free: true },
  { id: 4, title: 'Cognitive Performance Blueprint', desc: 'Nootropics, lifestyle factors, and training protocols for peak executive function.', tag: 'Neuroscience', free: false },
  { id: 5, title: 'Zone 2 Training Guide', desc: 'How to build your aerobic base for longevity: VO2 max, mitochondrial biogenesis.', tag: 'Performance', free: false },
  { id: 6, title: 'Cold & Heat Therapy Protocols', desc: 'Sauna, cold plunge, and contrast therapy science for recovery and longevity.', tag: 'Performance', free: false },
  { id: 7, title: 'Hormonal Optimization for Men', desc: 'Testosterone, thyroid, and cortisol management through lifestyle and intervention.', tag: 'Longevity', free: false },
  { id: 8, title: 'Hormonal Optimization for Women', desc: 'Navigating perimenopause, HRT, and cycle-synced training for long-term vitality.', tag: 'Longevity', free: false },
  { id: 9, title: 'Gut Microbiome Reset Protocol', desc: 'Prebiotics, probiotics, and dietary interventions for a resilient gut-brain axis.', tag: 'Nutrition', free: false },
  { id: 10, title: 'Breathwork & HRV Mastery', desc: 'Pranayama, box breathing, and biofeedback for nervous system regulation.', tag: 'Neuroscience', free: false },
  { id: 11, title: 'Lab Work Interpretation Guide', desc: 'How to read your bloodwork like a longevity physician — key panels explained.', tag: 'Longevity', free: false },
  { id: 12, title: 'Blue Zone Lifestyle Framework', desc: "Extracted principles from the world's longest-lived populations, made actionable.", tag: 'Longevity', free: false },
  { id: 13, title: 'Fasting & Caloric Restriction', desc: 'Time-restricted eating, extended fasting protocols, and autophagy optimization.', tag: 'Nutrition', free: false },
  { id: 14, title: 'Strength Training for Longevity', desc: 'Evidence-based resistance training protocols targeting muscle mass and bone density.', tag: 'Performance', free: false },
  { id: 15, title: 'Stress Resilience Toolkit', desc: 'Cortisol management, adaptogen stacks, and mind-body practices for executives.', tag: 'Neuroscience', free: false },
  { id: 16, title: 'Sleep Tech & Wearable Guide', desc: 'Oura, Whoop, Eight Sleep setup and data interpretation for sleep optimization.', tag: 'Sleep', free: false },
  { id: 17, title: 'Peptide Therapy Overview', desc: 'BPC-157, TB-500, Semaglutide — clinical context and regenerative applications.', tag: 'Longevity', free: false },
  { id: 18, title: 'Executive Nutrition Protocol', desc: 'High-performance eating patterns for sustained energy, cognition, and longevity.', tag: 'Nutrition', free: false },
  { id: 19, title: 'Mitochondrial Health Blueprint', desc: 'Targeted interventions to boost mitochondrial density, energy, and cellular repair.', tag: 'Longevity', free: false },
  { id: 20, title: 'Annual Longevity Blood Panel', desc: 'The definitive list of labs to run yearly, with optimal ranges and action thresholds.', tag: 'Longevity', free: false },
];

const GROUPS = [
  { id: 'bio-fund', name: 'Biohacking Fundamentals', icon: '🔬', members: 142, desc: 'Core protocols, beginner stacks, and foundational longevity science.', tier: 'explorer' as Tier },
  { id: 'exec-health', name: 'Executive Health Circle', icon: '💼', members: 58, desc: 'High-performance health for founders and executives. NDA-protected discussions.', tier: 'pro' as Tier },
  { id: 'neuro-opt', name: 'Neuro Optimization Lab', icon: '🧠', members: 89, desc: 'Cognitive enhancement, neuroplasticity, and brain longevity research.', tier: 'pro' as Tier },
  { id: 'women-vital', name: "Women's Vitality Network", icon: '⚡', members: 74, desc: 'Female-specific longevity protocols, hormone health, and community support.', tier: 'pro' as Tier },
  { id: 'longevity-sci', name: 'Longevity Science Journal Club', icon: '📖', members: 63, desc: 'Monthly deep-dives into the latest longevity research and clinical trials.', tier: 'pro' as Tier },
  { id: 'gut-health', name: 'Gut & Microbiome Collective', icon: '🦠', members: 97, desc: 'Microbiome optimization, elimination diets, and GI health protocols.', tier: 'pro' as Tier },
  { id: 'leaders', name: 'LABS Leaders Circle', icon: '🏆', members: 21, desc: 'Exclusive forum for Leader-tier members. Direct access to LABS advisory board.', tier: 'leader' as Tier },
  { id: 'partners', name: 'Partner Network', icon: '🤝', members: 12, desc: 'Brand partners, sponsors, and institutional collaborators shaping LABS.', tier: 'partner' as Tier },
];

const ALL_INTERESTS = ['Sleep optimization', 'Cold therapy', 'Sauna & heat', 'Fasting', 'Gut health', 'Cognitive performance', 'Strength training', 'Zone 2 cardio', 'Supplements', 'HRV & wearables', 'Lab testing', 'Hormones', 'Peptides', 'Meditation', 'Nutrition science', 'Longevity research'];

export default function MembersPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activePanel, setActivePanel] = useState('home');
  const [saveStatus, setSaveStatus] = useState('');
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState('success');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergeMessages, setConciergeMessages] = useState<{ role: string; text: string }[]>([]);
  const [conciergeInput, setConciergeInput] = useState('');
  const [pf, setPf] = useState({ first: '', last: '', title: '', bio: '', location: '' });
  const [reqType, setReqType] = useState('speak');
  const [reqMsg, setReqMsg] = useState('');

  const canAccess = (required: Tier) =>
    (TIER_RANK[profile?.tier || 'explorer'] || 0) >= TIER_RANK[required];

  /* ── Init ── */
  useEffect(() => {
    const saved = localStorage.getItem('labs-theme') as 'dark' | 'light' || 'dark';
    setTheme(saved);

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { router.replace('/join?mode=signin'); return; }

      const email = session.user.email!;
      const isWhitelisted = PRO_WHITELIST.includes(email);

      // Fetch or create member profile
      let { data } = await supabase.from('members').select('*').eq('email', email).single();

      if (!data) {
        const newP: Omit<Profile, 'id'> & { id: string } = {
          id: session.user.id,
          email,
          first_name: session.user.user_metadata?.first_name || email.split('@')[0],
          last_name: session.user.user_metadata?.last_name || '',
          title: '', bio: '', location: '',
          tier: isWhitelisted ? 'pro' : 'explorer',
          interests: [],
          created_at: new Date().toISOString(),
        };
        await supabase.from('members').upsert(newP);
        data = newP;
      } else if (isWhitelisted && data.tier === 'explorer') {
        await supabase.from('members').update({ tier: 'pro' }).eq('email', email);
        data.tier = 'pro';
      }

      setProfile(data as Profile);
      setPf({ first: data.first_name || '', last: data.last_name || '', title: data.title || '', bio: data.bio || '', location: data.location || '' });
      setSelectedInterests(new Set(data.interests || []));
      setConciergeMessages([{
        role: 'ai',
        text: `Hi ${data.first_name || email.split('@')[0]}! I'm your LABS concierge. As a ${data.tier} member, I can help you navigate resources, find protocols for your goals, or answer longevity questions. What are you working on?`
      }]);
      setLoading(false);
    })();
  }, []);

  /* ── Theme ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('labs-theme', theme);
  }, [theme]);

  /* ── Save profile ── */
  async function saveProfile() {
    if (!profile) return;
    setSaveStatus('saving');
    const updates = { first_name: pf.first, last_name: pf.last, title: pf.title, bio: pf.bio, location: pf.location, interests: [...selectedInterests], updated_at: new Date().toISOString() };
    const { error } = await supabase.from('members').update(updates).eq('email', profile.email);
    if (error) { setSaveStatus('error'); showToast('Save failed: ' + error.message, 'error'); return; }
    setProfile(p => p ? { ...p, ...updates } : p);
    setSaveStatus('saved');
    showToast('Profile updated ✓', 'success');
    setTimeout(() => setSaveStatus(''), 3000);
  }

  /* ── Toast ── */
  function showToast(msg: string, type = 'success') {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3000);
  }

  /* ── Sign out ── */
  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/join?mode=signin');
  }

  /* ── Concierge ── */
  async function sendConcierge() {
    if (!conciergeInput.trim()) return;
    const msg = conciergeInput.trim();
    setConciergeInput('');
    setConciergeMessages(m => [...m, { role: 'user', text: msg }]);
    setConciergeMessages(m => [...m, { role: 'ai', text: '…' }]);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: `You are the LABS (Longevity and Biohacking Society) member concierge. Warm, knowledgeable, concise. Member: ${profile?.first_name || 'member'}, tier: ${profile?.tier}. Answer longevity/biohacking questions, help navigate the portal. Max 3 sentences unless asked for detail. No markdown.`,
          messages: [{ role: 'user', content: msg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting right now.";
      setConciergeMessages(m => [...m.slice(0, -1), { role: 'ai', text: reply }]);
    } catch {
      setConciergeMessages(m => [...m.slice(0, -1), { role: 'ai', text: "I'm offline right now — explore resources directly!" }]);
    }
  }

  /* ── Loading ── */
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? '#0C0C0E' : '#F5F3EF' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: `3px solid rgba(212,168,71,0.3)`, borderTopColor: AMBER, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em', color: '#9E9A94' }}>Loading your portal…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (!profile) return null;

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.email.split('@')[0];
  const initials = ([profile.first_name?.[0], profile.last_name?.[0]].filter(Boolean).join('') || fullName[0] || '?').toUpperCase();
  const tierLabel = profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1);
  const tierColors: Record<Tier, string> = { explorer: '#5B8FD4', pro: '#D4A847', leader: '#A78BFA', partner: '#34D399' };
  const tc = tierColors[profile.tier];

  const isDark = theme === 'dark';
  const bg = isDark ? '#0C0C0E' : '#F5F3EF';
  const surface = isDark ? '#141416' : '#FFFFFF';
  const card = isDark ? '#1A1A1E' : '#FFFFFF';
  const hover = isDark ? '#222228' : '#F0EDE8';
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const borderMd = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.13)';
  const text1 = isDark ? '#F0EDE8' : '#1A1816';
  const text2 = isDark ? '#9E9A94' : '#6B6560';
  const text3 = isDark ? '#5C5855' : '#A09B96';

  const S: Record<string, React.CSSProperties> = {
    body: { fontFamily: "'DM Sans', sans-serif", background: bg, color: text1, minHeight: '100vh', display: 'flex' },
    sidebar: { width: 240, background: surface, borderRight: `1px solid ${border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, transition: 'background 0.2s' },
    main: { marginLeft: 240, flex: 1, minHeight: '100vh' },
    navItem: (active: boolean): React.CSSProperties => ({
      display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
      borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
      color: active ? AMBER : text2,
      background: active ? 'rgba(212,168,71,0.12)' : 'transparent',
      transition: 'all 0.2s', marginBottom: 1,
    }),
    card: { background: card, border: `1px solid ${border}`, borderRadius: 12, padding: '20px' },
    btn: { padding: '10px 20px', background: AMBER, color: '#0C0C0E', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit' },
    input: { width: '100%', padding: '10px 13px', background: surface, border: `1px solid ${borderMd}`, borderRadius: 8, color: text1, fontSize: 14, outline: 'none', fontFamily: 'inherit' },
    lockOverlay: { position: 'absolute', inset: 0, background: isDark ? 'rgba(12,12,14,0.85)' : 'rgba(245,243,239,0.88)', backdropFilter: 'blur(6px)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', padding: 16 },
  };

  /* ── filtered resources ── */
  const filteredResources = RESOURCES.filter(r =>
    resourceFilter === 'all' || r.tag.toLowerCase() === resourceFilter
  );

  return (
    <div style={S.body}>
      {/* ── SIDEBAR ── */}
      <aside style={S.sidebar}>
        <div style={{ padding: '22px 20px 14px', borderBottom: `1px solid ${border}` }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: AMBER }}>LABS</div>
          <div style={{ fontSize: 10, color: text3, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>Member Portal</div>
        </div>

        {/* Tier badge */}
        <div style={{ margin: '12px 14px', padding: '10px 14px', borderRadius: 8, border: `1px solid ${border}`, background: card, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: tc, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: tc }}>{tierLabel}</div>
            <div style={{ fontSize: 10, color: text3 }}>Current tier</div>
          </div>
          {profile.tier === 'explorer' && (
            <button onClick={() => setActivePanel('request')} style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', background: 'rgba(212,168,71,0.12)', color: AMBER, borderRadius: 4, border: '1px solid rgba(212,168,71,0.2)', cursor: 'pointer' }}>Upgrade ↑</button>
          )}
        </div>

        <nav style={{ flex: 1, padding: '10px 12px', overflowY: 'auto' }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'resources', label: 'Resources' },
            { id: 'events', label: 'Events' },
            { id: 'community', label: 'Community' },
            { id: 'profile', label: 'My Profile' },
            { id: 'request', label: 'Submit Request' },
            { id: 'invite', label: 'Invite Friends' },
          ].map(item => (
            <div key={item.id} style={S.navItem(activePanel === item.id)} onClick={() => setActivePanel(item.id)}>
              {item.label}
            </div>
          ))}
        </nav>

        <div style={{ padding: '14px 16px', borderTop: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: AMBER, flexShrink: 0 }}>{initials}</div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</div>
              <div style={{ fontSize: 11, color: text3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              style={{ flex: 1, padding: '7px 6px', borderRadius: 8, border: `1px solid ${border}`, fontSize: 11, color: text2, cursor: 'pointer', background: 'transparent', fontFamily: 'inherit' }}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={signOut}
              style={{ flex: 1, padding: '7px 6px', borderRadius: 8, border: `1px solid ${border}`, fontSize: 11, color: text2, cursor: 'pointer', background: 'transparent', fontFamily: 'inherit' }}>
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={S.main}>
        <div style={{ padding: '24px 32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 400 }}>
            {{ home: 'Home', resources: 'Resources & Protocols', events: 'Events', community: 'Community', profile: 'My Profile', request: 'Submit Request', invite: 'Invite Friends' }[activePanel]}
          </div>
        </div>

        <div style={{ padding: '20px 32px 48px' }}>

          {/* ══ HOME ══ */}
          {activePanel === 'home' && (
            <div>
              <div style={{ ...S.card, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: AMBER, marginBottom: 6 }}>Good day, {tierLabel}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30 }}>Welcome back, {profile.first_name || fullName}</div>
                <div style={{ fontSize: 14, color: text2, marginTop: 4 }}>Your longevity dashboard · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                  {[['Resources', 'resources'], ['Events', 'events'], ['Community', 'community']].map(([label, panel]) => (
                    <button key={panel} onClick={() => setActivePanel(panel)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: surface, border: `1px solid ${border}`, borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: text1, fontFamily: 'inherit' }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'Resources unlocked', value: canAccess('pro') ? 20 : 3, sub: 'of 20 total' },
                  { label: 'Events available', value: 4, sub: 'this quarter' },
                  { label: 'Groups', value: canAccess('pro') ? 6 : 1, sub: 'available to you' },
                  { label: 'Your tier', value: tierLabel, sub: 'membership level' },
                ].map(s => (
                  <div key={s.label} style={S.card}>
                    <div style={{ fontSize: 11, color: text3, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: text2, marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 18, fontFamily: "'Fraunces', serif", marginBottom: 12 }}>Recent activity</div>
              {[
                { icon: '📚', text: 'Sleep Optimization Protocol — new resource available', time: '2h ago' },
                { icon: '📅', text: 'Wellness Week Tampa 2027 — registration now open', time: '1d ago' },
                { icon: '👥', text: 'Biohacking Fundamentals — 3 new discussions', time: '2d ago' },
              ].map((item, i) => (
                <div key={i} style={{ ...S.card, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ fontSize: 20 }}>{item.icon}</div>
                  <div style={{ flex: 1, fontSize: 13 }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: text3 }}>{item.time}</div>
                </div>
              ))}
            </div>
          )}

          {/* ══ RESOURCES ══ */}
          {activePanel === 'resources' && (
            <div>
              <div style={{ fontSize: 13, color: canAccess('pro') ? '#34D399' : text2, marginBottom: 16 }}>
                {canAccess('pro') ? `Full library unlocked — ${RESOURCES.length} protocols` : `Explorer access: 3 of ${RESOURCES.length} · `}
                {!canAccess('pro') && <button onClick={() => setActivePanel('request')} style={{ color: AMBER, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>Upgrade for full access</button>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {['all', 'sleep', 'longevity', 'nutrition', 'neuroscience', 'performance'].map(f => (
                  <button key={f} onClick={() => setResourceFilter(f)} style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${resourceFilter === f ? 'rgba(212,168,71,0.3)' : border}`, background: resourceFilter === f ? 'rgba(212,168,71,0.12)' : 'transparent', color: resourceFilter === f ? AMBER : text2, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
                {filteredResources.map(r => {
                  const accessible = r.free || canAccess('pro');
                  return (
                    <div key={r.id} style={{ ...S.card, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, display: 'inline-block', marginBottom: 10, background: 'rgba(212,168,71,0.12)', color: AMBER }}>{r.tag}</div>
                      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: text2, lineHeight: 1.5, marginBottom: 14 }}>{r.desc}</div>
                      {accessible
                        ? <button style={{ fontSize: 12, fontWeight: 600, color: AMBER, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View protocol →</button>
                        : <span style={{ fontSize: 11, color: text3 }}>🔒 PRO & above</span>
                      }
                      {!accessible && (
                        <div style={S.lockOverlay}>
                          <div style={{ fontSize: 24 }}>🔒</div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>PRO resource</div>
                          <div style={{ fontSize: 11, color: text2 }}>Upgrade to unlock all 20 protocols</div>
                          <button onClick={() => setActivePanel('request')} style={{ marginTop: 8, padding: '6px 14px', background: AMBER, color: '#0C0C0E', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>Upgrade to PRO</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ EVENTS ══ */}
          {activePanel === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { month: 'JAN', day: 19, title: 'Wellness Week Tampa 2027', meta: '📍 Tampa, FL · Multi-day conference · All tiers', desc: 'The annual LABS flagship event — keynotes, workshops, longevity clinics, and community dinners.' },
                { month: 'JAN', day: 24, title: 'Executive Leadership & Wellness Retreat', meta: '📍 Tampa, FL · 3-day retreat · PRO+', desc: 'A curated leadership retreat blending executive coaching with longevity science. Limited to 40 attendees.' },
                { month: 'AUG', day: 12, title: 'Biohacking Masterclass: Wearables & Biomarkers', meta: '💻 Virtual · 90-min workshop · All members', desc: 'Deep dive into interpreting Oura, Whoop, and Levels data for personalized longevity protocols.' },
                { month: 'SEP', day: 5, title: "Member Q&A: Dr. Rhonda Patrick on NAD+ Optimization", meta: '💻 Virtual · 60-min AMA · PRO+', desc: 'Exclusive live Q&A session on NAD+ precursors, supplementation stacks, and mitochondrial health.' },
              ].map((ev, i) => (
                <div key={i} style={{ ...S.card, display: 'flex', gap: 20 }}>
                  <div style={{ minWidth: 52, textAlign: 'center', background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.2)', borderRadius: 8, padding: 8 }}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: AMBER, fontWeight: 700 }}>{ev.month}</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>{ev.day}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: text2, marginBottom: 8 }}>{ev.meta}</div>
                    <div style={{ fontSize: 12, color: text2, lineHeight: 1.5, marginBottom: 10 }}>{ev.desc}</div>
                    <button style={{ padding: '6px 14px', background: AMBER, color: '#0C0C0E', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>RSVP Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ COMMUNITY ══ */}
          {activePanel === 'community' && (
            <div>
              <div style={{ fontSize: 13, color: text2, marginBottom: 16 }}>
                {canAccess('pro') ? 'PRO access — 6 of 8 groups unlocked' : 'Explorer access: 1 group · '}
                {!canAccess('pro') && <button onClick={() => setActivePanel('request')} style={{ color: AMBER, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>Upgrade to join more</button>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
                {GROUPS.map(g => {
                  const accessible = canAccess(g.tier);
                  const joined = joinedGroups.has(g.id);
                  return (
                    <div key={g.id} style={{ ...S.card, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ fontSize: 24, marginBottom: 6 }}>{g.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{g.name}</div>
                      <div style={{ fontSize: 11, color: text2, marginBottom: 8 }}>👥 {g.members} members</div>
                      <div style={{ fontSize: 12, color: text2, lineHeight: 1.5, marginBottom: 12 }}>{g.desc}</div>
                      {accessible && (
                        <button onClick={() => setJoinedGroups(s => { const n = new Set(s); joined ? n.delete(g.id) : n.add(g.id); return n; })}
                          style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${joined ? border : 'rgba(212,168,71,0.2)'}`, background: joined ? 'transparent' : 'rgba(212,168,71,0.12)', color: joined ? text2 : AMBER, fontFamily: 'inherit' }}>
                          {joined ? '✓ Joined' : 'Join group'}
                        </button>
                      )}
                      {!accessible && (
                        <div style={S.lockOverlay}>
                          <div style={{ fontSize: 22 }}>🔒</div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{g.tier.charAt(0).toUpperCase() + g.tier.slice(1)}+ only</div>
                          <button onClick={() => showToast(`Access request sent for ${g.name} ✓`, 'success')} style={{ marginTop: 8, padding: '5px 12px', background: AMBER, color: '#0C0C0E', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>Request access</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ PROFILE ══ */}
          {activePanel === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
              <div style={{ ...S.card, textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px', background: 'rgba(212,168,71,0.12)', border: '2px solid rgba(212,168,71,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fraunces',serif", fontSize: 30, color: AMBER }}>{initials}</div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{fullName}</div>
                <div style={{ fontSize: 12, color: text2, marginBottom: 14 }}>{profile.email}</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${tc}22`, color: tc, marginBottom: 14 }}>{tierLabel} Member</div>
                <div style={{ fontSize: 11, color: text3 }}>Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>
              <div style={S.card}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, marginBottom: 20 }}>Edit profile</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { label: 'First name', key: 'first', placeholder: 'Your first name' },
                    { label: 'Last name', key: 'last', placeholder: 'Your last name' },
                  ].map(f => (
                    <div key={f.key}>
                      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 5 }}>{f.label}</div>
                      <input style={S.input} value={pf[f.key as keyof typeof pf]} onChange={e => setPf(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div style={{ gridColumn: '1/-1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 5 }}>Email</div>
                    <input style={{ ...S.input, opacity: 0.5, cursor: 'not-allowed' }} value={profile.email} disabled />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 5 }}>Title & Company</div>
                    <input style={S.input} value={pf.title} onChange={e => setPf(p => ({ ...p, title: e.target.value }))} placeholder="e.g. CEO at Acme Corp" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 5 }}>Bio</div>
                    <textarea style={{ ...S.input, resize: 'vertical', minHeight: 80 }} value={pf.bio} onChange={e => setPf(p => ({ ...p, bio: e.target.value }))} placeholder="Tell the community about your longevity journey…" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 5 }}>Location</div>
                    <input style={S.input} value={pf.location} onChange={e => setPf(p => ({ ...p, location: e.target.value }))} placeholder="City, State" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 8 }}>Interests</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {ALL_INTERESTS.map(i => {
                        const sel = selectedInterests.has(i);
                        return <button key={i} onClick={() => setSelectedInterests(s => { const n = new Set(s); sel ? n.delete(i) : n.add(i); return n; })} style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${sel ? 'rgba(212,168,71,0.3)' : border}`, background: sel ? 'rgba(212,168,71,0.12)' : 'transparent', color: sel ? AMBER : text2, cursor: 'pointer', fontFamily: 'inherit' }}>{i}</button>;
                      })}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                  <button onClick={saveProfile} style={S.btn}>Save changes</button>
                  <span style={{ fontSize: 12, color: saveStatus === 'saved' ? '#34D399' : saveStatus === 'error' ? '#E05252' : text2 }}>
                    {saveStatus === 'saving' ? 'Saving…' : saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'error' ? '✗ Error' : ''}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ══ REQUEST ══ */}
          {activePanel === 'request' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
                {[
                  { id: 'speak', icon: '🎤', label: 'Speaking inquiry' },
                  { id: 'sponsor', icon: '🤝', label: 'Sponsorship' },
                  { id: 'resource', icon: '📋', label: 'Suggest resource' },
                  { id: 'upgrade', icon: '⬆️', label: 'Upgrade account' },
                  { id: 'expert', icon: '🧠', label: 'Expert connection' },
                  { id: 'other', icon: '💬', label: 'General feedback' },
                ].map(rt => (
                  <div key={rt.id} onClick={() => setReqType(rt.id)} style={{ ...S.card, textAlign: 'center', cursor: 'pointer', border: `1px solid ${reqType === rt.id ? 'rgba(212,168,71,0.3)' : border}`, background: reqType === rt.id ? 'rgba(212,168,71,0.08)' : card }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{rt.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{rt.label}</div>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: text2, marginBottom: 8 }}>Message</div>
                <textarea style={{ ...S.input, resize: 'vertical', minHeight: 120 }} value={reqMsg} onChange={e => setReqMsg(e.target.value)} placeholder="Tell us about your request…" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <button onClick={() => { if (!reqMsg.trim()) return; setReqMsg(''); showToast('Request submitted ✓', 'success'); }} style={S.btn}>Send request</button>
                </div>
              </div>
            </div>
          )}

          {/* ══ INVITE ══ */}
          {activePanel === 'invite' && (
            <div>
              <div style={{ ...S.card, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, marginBottom: 6 }}>Invite & Earn</div>
                <div style={{ fontSize: 13, color: text2, marginBottom: 14 }}>Share your referral link. When your friend joins, you both level up.</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, padding: '10px 14px', background: surface, border: `1px solid ${borderMd}`, borderRadius: 8, fontFamily: 'monospace', fontSize: 12, color: text2 }}>
                    longevityandbiohacking.org/join?ref={profile.id.slice(0, 8)}
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(`https://longevityandbiohacking.org/join?ref=${profile.id.slice(0, 8)}`); showToast('Referral link copied ✓', 'success'); }} style={S.btn}>Copy</button>
                </div>
              </div>
              <div style={S.card}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, marginBottom: 14 }}>Referral perks</div>
                {[
                  { count: 1, label: 'First referral', reward: '1 month PRO access' },
                  { count: 3, label: '3 referrals', reward: 'Full PRO upgrade + LABS swag' },
                  { count: 5, label: '5 referrals', reward: 'Leader tier + event pass' },
                  { count: 10, label: '10 referrals', reward: 'Partner recognition + advisory seat' },
                ].map(p => (
                  <div key={p.count} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: surface, borderRadius: 8, marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: AMBER, minWidth: 32 }}>{p.count}</div>
                    <div>
                      <div style={{ fontSize: 13 }}>{p.label}</div>
                      <div style={{ fontSize: 12, color: text2 }}>{p.reward}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── CONCIERGE ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 500 }}>
        {conciergeOpen && (
          <div style={{ position: 'absolute', bottom: 64, right: 0, width: 340, background: card, border: `1px solid ${borderMd}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#0C0C0E' }}>🧬</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>LABS Concierge</div>
                <div style={{ fontSize: 11, color: '#34D399' }}>● Online</div>
              </div>
              <button onClick={() => setConciergeOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: text3, cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ flex: 1, maxHeight: 280, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {conciergeMessages.map((m, i) => (
                <div key={i} style={{ maxWidth: '90%', fontSize: 13, lineHeight: 1.45, padding: '9px 12px', borderRadius: 10, background: m.role === 'ai' ? surface : AMBER, color: m.role === 'ai' ? text1 : '#0C0C0E', alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end' }}>
                  {m.text}
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 12px', borderTop: `1px solid ${border}`, display: 'flex', gap: 8 }}>
              <input style={{ flex: 1, background: surface, border: `1px solid ${borderMd}`, borderRadius: 20, padding: '8px 14px', fontSize: 13, color: text1, outline: 'none', fontFamily: 'inherit' }}
                value={conciergeInput} onChange={e => setConciergeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendConcierge()}
                placeholder="Ask me anything…" />
              <button onClick={sendConcierge} style={{ width: 32, height: 32, borderRadius: '50%', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0C0C0E', border: 'none', cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>→</button>
            </div>
          </div>
        )}
        <button onClick={() => setConciergeOpen(o => !o)} style={{ width: 52, height: 52, borderRadius: '50%', background: AMBER, color: '#0C0C0E', border: 'none', cursor: 'pointer', fontSize: 22, boxShadow: '0 4px 16px rgba(212,168,71,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</button>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 90, right: 24, zIndex: 600, background: card, border: `1px solid ${toastType === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(224,82,82,0.3)'}`, borderRadius: 8, padding: '10px 16px', fontSize: 13, color: toastType === 'success' ? '#34D399' : '#E05252', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
