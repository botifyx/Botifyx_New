import { db } from '@/lib/db';
import { CONTACT } from '@/lib/site';

export interface ProjectEnquiryData {
  name: string;
  company?: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  source?: string;
  page?: string;
}

export interface MailerResult {
  success: boolean;
  message?: string;
  error?: string;
  fallbackMailto?: string;
}

const DESTINATION_EMAIL = CONTACT.email || 'info@botifyx.in';

/**
 * Generates a prefilled mailto URL as a reliable emergency fallback.
 */
export function generateMailtoFallback(data: ProjectEnquiryData): string {
  const subject = `[Project Enquiry] ${data.name.trim()}${data.company ? ` (${data.company.trim()})` : ''} - ${data.projectType}`;
  const body = [
    `Name: ${data.name.trim()}`,
    `Company: ${data.company?.trim() || 'Not specified'}`,
    `Work Email: ${data.email.trim()}`,
    `Project Type: ${data.projectType}`,
    `Budget Range: ${data.budget}`,
    `Date: ${new Date().toISOString()}`,
    `Source: ${data.page || '/contact'}`,
    '',
    '--- Project Objective / Requirements ---',
    data.message.trim(),
  ].join('\n');

  return `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends a project enquiry submission to info@botifyx.in using transactional form mailing services,
 * with non-blocking CRM/DB logging and graceful fallback support.
 */
export async function sendProjectEnquiry(data: ProjectEnquiryData): Promise<MailerResult> {
  const cleanName = data.name.trim();
  const cleanEmail = data.email.trim();
  const cleanCompany = data.company?.trim() || 'Not specified';
  const cleanMessage = data.message.trim();
  const projectType = data.projectType;
  const budget = data.budget;
  const page = data.page || '/contact';
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const subject = `[Project Enquiry] ${cleanName} (${cleanCompany}) — ${projectType}`;
  const mailtoFallback = generateMailtoFallback(data);

  // 1. Check for custom Web3Forms access key or mailer endpoint if provided in env
  const web3FormsKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY;
  const customEndpoint = (import.meta as any).env?.VITE_MAILER_ENDPOINT;

  let emailSent = false;
  let errorDetail = '';

  try {
    if (customEndpoint) {
      // Custom backend endpoint if configured
      const res = await fetch(customEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          to: DESTINATION_EMAIL,
          subject,
          replyTo: cleanEmail,
          ...data,
          timestamp,
        }),
      });
      if (res.ok) emailSent = true;
    } else if (web3FormsKey) {
      // Web3Forms delivery
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          to: DESTINATION_EMAIL,
          from_name: `${cleanName} (BotifyX Lead)`,
          subject,
          replyto: cleanEmail,
          name: cleanName,
          company: cleanCompany,
          email: cleanEmail,
          project_type: projectType,
          budget_range: budget,
          message: cleanMessage,
          submitted_at: timestamp,
          page_source: page,
        }),
      });
      const json = await res.json();
      if (json.success) emailSent = true;
      else errorDetail = json.message || 'Web3Forms submission failed';
    }

    // Default: FormSubmit.co transactional mailer to info@botifyx.in
    if (!emailSent) {
      const res = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _replyto: cleanEmail,
          _template: 'table',
          _captcha: 'false',
          'Client Name': cleanName,
          'Company': cleanCompany,
          'Work Email': cleanEmail,
          'Project Type': projectType,
          'Budget Range': budget,
          'Project Objective & Details': cleanMessage,
          'Submitted At (IST)': timestamp,
          'Page Origin': page,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success === 'true' || json.success === true || res.status === 200) {
          emailSent = true;
        }
      } else {
        errorDetail = `Mailer response status ${res.status}`;
      }
    }
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : 'Network error during email dispatch';
  }

  // 2. Best-effort background CRM database logging (non-blocking)
  try {
    void db.rpc('crm_submit_contact', {
      p_email: cleanEmail,
      p_name: cleanName,
      p_phone: null,
      p_sms_opt_in: false,
      p_source: data.source || 'contact-page',
      p_metadata: {
        company: cleanCompany,
        project_type: projectType,
        budget_range: budget,
        message: cleanMessage,
        page,
        timestamp,
      },
    }).catch(() => undefined);

    void db.functions
      .invoke('enquiry-notify', {
        body: {
          ...data,
          enquiryId: `${cleanEmail}-${projectType}`,
          page,
          timestamp,
        },
      })
      .catch(() => undefined);
  } catch {
    // Non-blocking database logging
  }

  if (emailSent) {
    return {
      success: true,
      message: `Enquiry successfully dispatched to ${DESTINATION_EMAIL}.`,
      fallbackMailto: mailtoFallback,
    };
  }

  // If email API failed, return failure with mailtoFallback
  return {
    success: false,
    error: errorDetail || 'Unable to connect to the mailer service.',
    fallbackMailto: mailtoFallback,
  };
}

export interface NewsletterSubscriptionData {
  email: string;
  source?: string;
  page?: string;
}

/**
 * Sends a newsletter / Engineering Digest subscription notification to info@botifyx.in
 * with non-blocking CRM/DB logging.
 */
export async function sendNewsletterSubscription(data: NewsletterSubscriptionData): Promise<MailerResult> {
  const cleanEmail = data.email.trim();
  const page = data.page || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const subject = `[Engineering Digest] New Subscription — ${cleanEmail}`;
  const web3FormsKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY;
  const customEndpoint = (import.meta as any).env?.VITE_MAILER_ENDPOINT;

  let emailSent = false;
  let errorDetail = '';

  try {
    if (customEndpoint) {
      const res = await fetch(customEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          to: DESTINATION_EMAIL,
          subject,
          replyTo: cleanEmail,
          type: 'engineering-digest-subscription',
          email: cleanEmail,
          timestamp,
          page,
        }),
      });
      if (res.ok) emailSent = true;
    } else if (web3FormsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3FormsKey,
          to: DESTINATION_EMAIL,
          from_name: `BotifyX Engineering Digest (${cleanEmail})`,
          subject,
          replyto: cleanEmail,
          subscription: 'Engineering Digest — monthly, technical',
          subscriber_email: cleanEmail,
          submitted_at: timestamp,
          page_source: page,
        }),
      });
      const json = await res.json();
      if (json.success) emailSent = true;
      else errorDetail = json.message || 'Web3Forms submission failed';
    }

    // Default: FormSubmit.co transactional mailer to info@botifyx.in
    if (!emailSent) {
      const res = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          _replyto: cleanEmail,
          _template: 'table',
          _captcha: 'false',
          'Subscription Form': 'Engineering Digest — monthly, technical',
          'Subscriber Email': cleanEmail,
          'Submitted At (IST)': timestamp,
          'Page Origin': page,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success === 'true' || json.success === true || res.status === 200) {
          emailSent = true;
        }
      } else {
        errorDetail = `Mailer response status ${res.status}`;
      }
    }
  } catch (err) {
    errorDetail = err instanceof Error ? err.message : 'Network error during subscription dispatch';
  }

  // Best-effort background CRM database logging (non-blocking)
  try {
    void db.rpc('crm_submit_contact', {
      p_email: cleanEmail,
      p_name: null,
      p_phone: null,
      p_sms_opt_in: false,
      p_source: data.source || 'footer-newsletter',
      p_metadata: {
        subscription: 'Engineering Digest',
        page,
        timestamp,
      },
    }).catch(() => undefined);
  } catch {
    // Non-blocking database logging
  }

  if (emailSent) {
    return {
      success: true,
      message: 'You are on the list. Expect signal, not noise.',
    };
  }

  return {
    success: false,
    error: errorDetail || 'Subscription failed. Please try again.',
  };
}
