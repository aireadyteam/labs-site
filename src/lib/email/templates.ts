// Email templates for all transactional emails

export const explorerWelcomeEmail = (name: string) => ({
  subject: 'Welcome to LABS — you\'re in.',
  html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid #e0e6e2;border-radius:12px;overflow:hidden;max-width:100%;">
        <tr><td style="background:#112119;padding:32px 40px;">
          <p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5ee89a;font-family:'Courier New',monospace;">Longevity &amp; Biohacking Society</p>
          <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.08em;">LABS</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#138a48;font-family:'Courier New',monospace;">Welcome, Explorer</p>
          <h1 style="margin:0 0 20px;font-size:28px;font-weight:700;color:#1a1a1a;line-height:1.2;">You're in, ${name}.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#3d4d43;line-height:1.72;">Your LABS Explorer membership is active. You now have access to public content, the monthly LABS Report newsletter, and free virtual events.</p>
          <p style="margin:0 0 28px;font-size:15px;color:#3d4d43;line-height:1.72;">We launch fully in summer 2026. As a founding Explorer member, you'll be among the first to know when PRO membership opens — with priority access to the cheat sheet library, Circle community, and annual conference.</p>
          <table cellpadding="0" cellspacing="0"><tr><td>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/members" style="display:inline-block;background:#138a48;color:#ffffff;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px;text-decoration:none;">Go to your dashboard</a>
          </td></tr></table>
          <hr style="margin:32px 0;border:none;border-top:1px solid #e0e6e2;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b7f73;"><strong style="color:#1a1a1a;">What you have access to now:</strong></p>
          <ul style="margin:8px 0 0;padding-left:20px;color:#6b7f73;font-size:13px;line-height:1.8;">
            <li>Public LABS blog and articles</li>
            <li>Cheat sheet previews (first 3 of 20)</li>
            <li>Monthly LABS Report newsletter</li>
            <li>Free public virtual events</li>
          </ul>
          <hr style="margin:32px 0;border:none;border-top:1px solid #e0e6e2;">
          <p style="margin:0;font-size:12px;color:#94a89e;line-height:1.7;">Nothing in this email constitutes medical advice. LABS resources are for informational purposes only. Consult a qualified healthcare provider before making changes to your health regimen.</p>
        </td></tr>
        <tr><td style="background:#f3f7f4;border-top:1px solid #e0e6e2;padding:20px 40px;">
          <p style="margin:0;font-size:11px;color:#94a89e;font-family:'Courier New',monospace;letter-spacing:0.06em;">© 2026 LABS — Longevity and Biohacking Society · Powered by Enterprise Technology Association · <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#138a48;">longevityandbiohacking.org</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
})

export const adminNewMemberEmail = (name: string, email: string, tier: string) => ({
  subject: `New LABS ${tier} signup: ${name}`,
  html: `
<html><body style="font-family:monospace;background:#112119;color:#e0e6e2;padding:32px;">
  <p style="color:#5ee89a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">LABS Admin Alert</p>
  <h2 style="color:#ffffff;margin:8px 0 24px;">New ${tier} Signup</h2>
  <table style="border-collapse:collapse;width:100%;max-width:480px;">
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;width:100px;">Name</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#ffffff;font-size:14px;">${name}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Email</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#5ee89a;font-size:14px;">${email}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Tier</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#ffffff;font-size:14px;">${tier}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Time</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">${new Date().toISOString()}</td></tr>
  </table>
  <p style="margin-top:24px;"><a href="https://supabase.com" style="color:#5ee89a;font-size:12px;">View in Supabase →</a></p>
</body></html>`,
})

export const applicationReceivedEmail = (name: string, tier: string) => ({
  subject: `LABS ${tier} application received`,
  html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;padding:40px 20px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1.5px solid #e0e6e2;border-radius:12px;overflow:hidden;max-width:100%;">
        <tr><td style="background:#112119;padding:32px 40px;">
          <p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5ee89a;font-family:'Courier New',monospace;">Longevity &amp; Biohacking Society</p>
          <p style="margin:8px 0 0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.08em;">LABS</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#138a48;font-family:'Courier New',monospace;">Application Received</p>
          <h1 style="margin:0 0 20px;font-size:28px;font-weight:700;color:#1a1a1a;line-height:1.2;">We received your ${tier} application, ${name}.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#3d4d43;line-height:1.72;">Thank you for your interest in LABS ${tier} membership. We review all applications and will be in touch at this email address.</p>
          <p style="margin:0 0 28px;font-size:15px;color:#3d4d43;line-height:1.72;">In the meantime, you're welcome to join as a free Explorer member — you'll get access to public content, the LABS Report newsletter, and free events while we're in our founding period.</p>
          <table cellpadding="0" cellspacing="0"><tr><td>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/membership" style="display:inline-block;background:#138a48;color:#ffffff;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px;text-decoration:none;">Join as Explorer (free)</a>
          </td></tr></table>
          <hr style="margin:32px 0;border:none;border-top:1px solid #e0e6e2;">
          <p style="margin:0;font-size:12px;color:#94a89e;line-height:1.7;">Questions? Reply to this email or reach us at <a href="mailto:hello@longevityandbiohacking.org" style="color:#138a48;">hello@longevityandbiohacking.org</a></p>
        </td></tr>
        <tr><td style="background:#f3f7f4;border-top:1px solid #e0e6e2;padding:20px 40px;">
          <p style="margin:0;font-size:11px;color:#94a89e;font-family:'Courier New',monospace;letter-spacing:0.06em;">© 2026 LABS — Longevity and Biohacking Society · Powered by Enterprise Technology Association</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
})

export const adminNewApplicationEmail = (name: string, email: string, tier: string, why: string) => ({
  subject: `New LABS ${tier} application: ${name}`,
  html: `
<html><body style="font-family:monospace;background:#112119;color:#e0e6e2;padding:32px;">
  <p style="color:#92520a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">LABS Admin — New Application</p>
  <h2 style="color:#ffffff;margin:8px 0 24px;">${tier} Application</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px;">
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;width:100px;">Name</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#ffffff;font-size:14px;">${name}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Email</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#5ee89a;font-size:14px;">${email}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Tier</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#fde8c0;font-size:14px;">${tier}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;vertical-align:top;">Why LABS</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#e0e6e2;font-size:13px;line-height:1.6;">${why}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Time</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">${new Date().toISOString()}</td></tr>
  </table>
</body></html>`,
})

export const contactNotificationEmail = (name: string, email: string, subject: string, message: string) => ({
  subject: `LABS contact: ${subject}`,
  html: `
<html><body style="font-family:monospace;background:#112119;color:#e0e6e2;padding:32px;">
  <p style="color:#5ee89a;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;">LABS Admin — Contact Form</p>
  <h2 style="color:#ffffff;margin:8px 0 24px;">New Message</h2>
  <table style="border-collapse:collapse;width:100%;max-width:520px;">
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;width:100px;">From</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#ffffff;font-size:14px;">${name}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Email</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#5ee89a;font-size:14px;"><a href="mailto:${email}" style="color:#5ee89a;">${email}</a></td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;">Subject</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#ffffff;font-size:14px;">${subject}</td></tr>
    <tr><td style="padding:10px 16px;border:1px solid #2a3d32;color:#94a89e;font-size:12px;vertical-align:top;">Message</td><td style="padding:10px 16px;border:1px solid #2a3d32;color:#e0e6e2;font-size:13px;line-height:1.6;">${message}</td></tr>
  </table>
  <p style="margin-top:16px;font-size:12px;color:#6b7f73;">Reply directly to ${email}</p>
</body></html>`,
})
