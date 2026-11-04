'use client';
import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const labelStyle: React.CSSProperties = { display: 'block', fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6 };
const fieldStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', background: 'var(--bg-tint)', border: '1.5px solid var(--rule)', borderRadius: 6, padding: '10px 14px', fontFamily: "'Karla', sans-serif", fontSize: 14, color: 'var(--ink)', outline: 'none' };

const fields = [
  { key: 'company', label: 'Company name', type: 'text', placeholder: 'Your company', autoComplete: 'organization', required: true },
  { key: 'name', label: 'Contact name', type: 'text', placeholder: 'Your full name', autoComplete: 'name', required: true },
  { key: 'email', label: 'Email address', type: 'email', placeholder: 'your@company.com', autoComplete: 'email', required: true },
  { key: 'website', label: 'Website', type: 'url', placeholder: 'https://', autoComplete: 'url', required: false },
] as const;

type FormState = { company: string; name: string; email: string; website: string; message: string; hp: string };

export default function PartnerInquiryForm() {
  const [form, setForm] = useState<FormState>({ company: '', name: '', email: '', website: '', message: '', hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setMsg('');
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('success');
      setMsg(data.message || "Thanks. We'll be in touch soon.");
    } catch (err: unknown) {
      setStatus('error');
      setMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div style={{ background: 'var(--bg-white)', border: '1.5px solid var(--rule)', borderRadius: 14, padding: 32 }}>
      {status === 'success' ? (
        <div role="status" style={{ textAlign: 'center' as const, padding: '24px 0' }}>
          <h3 style={{ marginBottom: 12 }}>Inquiry received.</h3>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{msg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--ink-4)', marginBottom: 20 }}>Partner inquiry form</div>
          {fields.map(({ key, label, type, placeholder, autoComplete, required }) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label htmlFor={`partner-${key}`} style={labelStyle}>{label}{required ? '' : ' (optional)'}</label>
              <input id={`partner-${key}`} name={key} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={fieldStyle} />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label htmlFor="partner-message" style={labelStyle}>Tell us about your product or service</label>
            <textarea id="partner-message" name="message" rows={4} required placeholder="What you offer, who it is for, and what evidence supports it..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...fieldStyle, resize: 'vertical' }} />
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
            <label htmlFor="partner-hp">Leave this field empty</label>
            <input id="partner-hp" name="hp" type="text" tabIndex={-1} autoComplete="off" value={form.hp} onChange={(e) => setForm({ ...form, hp: e.target.value })} />
          </div>
          {status === 'error' && (
            <p role="alert" style={{ marginTop: 0, marginBottom: 14, fontSize: 13.5, color: '#b42318' }}>{msg}</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}>
            {status === 'loading' ? 'Sending...' : 'Submit inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}
