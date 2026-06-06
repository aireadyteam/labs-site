import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LABS — Longevity & Biohacking Society';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#112119',
          padding: '64px 72px',
        }}
      >
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px', display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(19,138,72,0.15)', border: '1.5px solid #138a48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#138a48', display: 'flex' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '0.12em' }}>LABS</span>
            <span style={{ fontSize: 10, color: '#5ee89a', letterSpacing: '0.18em' }}>LONGEVITY &amp; BIOHACKING SOCIETY</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ width: 48, height: 3, background: '#138a48', borderRadius: 2, marginBottom: 20, display: 'flex' }} />
          <div style={{ fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 4, display: 'flex' }}>Live Better,</div>
          <div style={{ fontSize: 68, fontWeight: 900, color: '#5ee89a', fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 24, display: 'flex' }}>Longer.</div>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: 640, display: 'flex' }}>
            Professional community for wellness, biohacking &amp; longevity — science-backed insights, live events, and peer networking.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, position: 'relative' }}>
          {[['20', 'CHEAT SHEETS'], ['4', 'PILLARS'], ['3', 'COMMUNITIES'], ['Jan 2027', 'CONFERENCE']].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>{label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>longevityandbiohacking.org</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
