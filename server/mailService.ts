import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface ProjectEnquiryPayload {
  name: string;
  company?: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source?: string;
  page?: string;
  timestamp?: string;
}

export interface MailServiceConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

/**
 * Dynamically reloads .env.local and .env files to capture newly added credentials
 * without requiring server restarts.
 */
export function reloadEnvironment() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      try {
        const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const idx = trimmed.indexOf('=');
          if (idx > 0) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
            if (val) {
              process.env[key] = val;
            }
          }
        }
      } catch {
        // ignore read error
      }
    }
  }
}

export function getMailConfig(): MailServiceConfig {
  reloadEnvironment();

  const host = process.env.SPACEMAIL_HOST || process.env.SMTP_HOST || 'mail.spacemail.com';
  const port = Number(process.env.SPACEMAIL_PORT || process.env.SMTP_PORT || 465);
  const secure = (process.env.SPACEMAIL_SECURE || process.env.SMTP_SECURE || 'true') === 'true' || port === 465;
  const user = process.env.SPACEMAIL_USER || process.env.SMTP_USER || 'ramdineshboopalan@botifyx.in';
  const pass = process.env.SPACEMAIL_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '';
  const from = process.env.MAIL_FROM || `"BotifyX Enquiry" <${user}>`;
  const to = process.env.SMTP_TO || process.env.MAIL_TO || 'ramdineshboopalan@outlook.com';

  return { host, port, secure, user, pass, from, to };
}

/**
 * Generates an executive-grade HTML email for new project enquiries.
 */
export function buildEnquiryHtmlEmail(data: ProjectEnquiryPayload, config: MailServiceConfig): string {
  const cleanName = escapeHtml(data.name || 'Anonymous');
  const cleanCompany = escapeHtml(data.company || 'Not specified');
  const cleanEmail = escapeHtml(data.email || '');
  const cleanProjectType = escapeHtml(data.projectType || 'Not specified');
  const cleanBudget = escapeHtml(data.budget || 'Not specified');
  const cleanMessage = escapeHtml(data.message || '').replace(/\n/g, '<br/>');
  const cleanSource = escapeHtml(data.page || data.source || '/contact');
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Enquiry</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b0f17;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0b0f17;
      padding: 32px 16px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #111827;
      border: 1px solid #1f293d;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .header {
      background: linear-gradient(135deg, #0d1f18 0%, #111827 100%);
      border-bottom: 1px solid #1f293d;
      padding: 28px 32px;
      text-align: left;
    }
    .brand {
      display: inline-block;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #00ff9d;
      margin-bottom: 8px;
    }
    .title {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }
    .content {
      padding: 32px;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(0, 255, 157, 0.12);
      border: 1px solid rgba(0, 255, 157, 0.3);
      color: #00ff9d;
      border-radius: 6px;
      font-size: 12px;
      font-family: monospace;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .grid {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      background: #0f172a;
      border-radius: 12px;
      border: 1px solid #1e293b;
      overflow: hidden;
    }
    .grid td {
      padding: 12px 16px;
      border-bottom: 1px solid #1e293b;
      font-size: 14px;
      vertical-align: top;
    }
    .grid tr:last-child td {
      border-bottom: none;
    }
    .grid-label {
      width: 35%;
      color: #94a3b8;
      font-family: monospace;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .grid-value {
      width: 65%;
      color: #f8fafc;
      font-weight: 500;
    }
    .message-card {
      background: #0a0f1d;
      border: 1px solid #1e293b;
      border-left: 4px solid #00ff9d;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .message-label {
      margin: 0 0 10px 0;
      font-size: 12px;
      font-family: monospace;
      color: #00ff9d;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .message-body {
      margin: 0;
      font-size: 14.5px;
      line-height: 1.6;
      color: #cbd5e1;
    }
    .button-wrap {
      text-align: center;
      margin: 28px 0 12px 0;
    }
    .reply-btn {
      display: inline-block;
      background: #00ff9d;
      color: #04140f !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 13px 28px;
      border-radius: 8px;
      letter-spacing: 0.02em;
    }
    .footer {
      border-top: 1px solid #1f293d;
      padding: 20px 32px;
      background-color: #0d121f;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="brand">BotifyX // Inbound Lead</span>
        <h1 class="title">New Project Enquiry</h1>
      </div>
      <div class="content">
        <span class="badge">A FEW DETAILS TO GET STARTED</span>

        <table class="grid">
          <tr>
            <td class="grid-label">Client Name</td>
            <td class="grid-value">${cleanName}</td>
          </tr>
          <tr>
            <td class="grid-label">Company</td>
            <td class="grid-value">${cleanCompany}</td>
          </tr>
          <tr>
            <td class="grid-label">Work Email</td>
            <td class="grid-value">
              <a href="mailto:${cleanEmail}" style="color:#38bdf8; text-decoration:none;">${cleanEmail}</a>
            </td>
          </tr>
          <tr>
            <td class="grid-label">Project Type</td>
            <td class="grid-value" style="color:#00ff9d;">${cleanProjectType}</td>
          </tr>
          <tr>
            <td class="grid-label">Budget Range</td>
            <td class="grid-value">${cleanBudget}</td>
          </tr>
          <tr>
            <td class="grid-label">Origin / Route</td>
            <td class="grid-value">${cleanSource}</td>
          </tr>
          <tr>
            <td class="grid-label">Submission Date</td>
            <td class="grid-value">${timestamp} (IST)</td>
          </tr>
        </table>

        <div class="message-card">
          <p class="message-label">// Project Objective & Requirements</p>
          <p class="message-body">${cleanMessage}</p>
        </div>

        <div class="button-wrap">
          <a href="mailto:${cleanEmail}?subject=${encodeURIComponent(`Re: BotifyX Project Enquiry — ${data.projectType}`)}" class="reply-btn">
            Reply Directly to ${cleanName} &rarr;
          </a>
        </div>
      </div>
      <div class="footer">
        Sent from <strong>${config.from}</strong> via SpaceMail SMTP to <strong>${config.to}</strong><br/>
        BotifyX High-Performance AI Platform &bull; ${new Date().getFullYear()}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates clean plain text fallback email.
 */
export function buildEnquiryTextEmail(data: ProjectEnquiryPayload, config: MailServiceConfig): string {
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
==================================================
BOTIFYX // NEW PROJECT ENQUIRY
==================================================

Client Name:    ${data.name}
Company:        ${data.company || 'Not specified'}
Work Email:     ${data.email}
Project Type:   ${data.projectType}
Budget Range:   ${data.budget}
Origin Page:    ${data.page || data.source || '/contact'}
Submitted At:   ${timestamp} (IST)

--------------------------------------------------
PROJECT OBJECTIVE / REQUIREMENTS:
--------------------------------------------------
${data.message}

==================================================
Delivered via SpaceMail (${config.host}:${config.port})
From: ${config.from}
To:   ${config.to}
Reply directly to ${data.email}
==================================================
  `.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Creates Nodemailer transporter configured for SpaceMail SMTP.
 */
export function createSpaceMailTransporter(config: MailServiceConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure, // true for port 465 SSL/TLS
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Sends structured project enquiry email via SpaceMail SMTP.
 */
export async function sendEnquiryEmail(data: ProjectEnquiryPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const config = getMailConfig();

  if (!config.pass || !config.pass.trim()) {
    return {
      success: false,
      error: 'SpaceMail SMTP password is missing. Please add your SpaceMail password to SPACEMAIL_PASSWORD in .env.local',
    };
  }

  const transporter = createSpaceMailTransporter(config);
  const subject = `[Project Enquiry] ${data.name.trim()}${data.company ? ` (${data.company.trim()})` : ''} — ${data.projectType}`;
  const html = buildEnquiryHtmlEmail(data, config);
  const text = buildEnquiryTextEmail(data, config);

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: `${data.name.trim()} <${data.email.trim()}>`,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error('[SpaceMail Mailer Error]', err);
    return {
      success: false,
      error: err?.message || 'SMTP delivery failed.',
    };
  }
}
