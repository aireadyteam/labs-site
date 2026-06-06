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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#112119',
          padding: '64px 72px',
          fontFamily: 'serif',
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          display: 'flex',
        }} />

        {/* Top: logo + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: 'rgba(19,138,72,0.15)',
            border: '1.5px solid #138a48',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#138a48' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#ffffff', letterSpacing: '0.12em' }}>LABS</span>
            <span style={{ fontSize: 11, color: '#5ee89a', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Longevity &amp; Biohacking Society</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
          <div style={{
            display: 'flex', width: 56, height: 3,
            background: '#138a48', borderRadius: 2,
          }} />
          <div style={{ fontSize: 68, fontWeight: 900, color: '#ffffff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
            Live Better,
          </div>
          <div style={{ fontSize: 68, fontWeight: 900, color: '#5ee89a', fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
            Longer.
          </div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 640, fontWeight: 300 }}>
            Professional community for wellness, biohacking &amp; longevity — science-backed insights, live events, and peer networking.
          </div>
        </div>

        {/* Bottom: stats */}
        <div style={{ display: 'flex', gap: 32, position: 'relative' }}>
          {[
            ['20', 'Cheat Sheets'],
            ['4', 'Pillars of Practice'],
            ['3', 'Founding Communities'],
            ['Jan 2027', 'Annual Conference'],
          ].map(([val, label]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.02em' }}>{val}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace' }}>{label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.08em' }}>longevityandbiohacking.org</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
