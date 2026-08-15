import type { IncomingMessage, ServerResponse } from 'http';
import { sendEnquiryEmail, type ProjectEnquiryPayload } from '../server/mailService';

/**
 * Serverless / Express / Node request handler for /api/send-email
 */
export default async function handler(req: any, res: any) {
  // Enable CORS if requested
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed. Use POST.' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use raw
      }
    }

    const { name, email, message, projectType, budget, company, source, page } = (body || {}) as ProjectEnquiryPayload;

    if (!name || !email || !message) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, and message are mandatory.',
        })
      );
      return;
    }

    const result = await sendEnquiryEmail({
      name,
      email,
      message,
      projectType: projectType || 'Not specified',
      budget: budget || 'Needs scoping',
      company: company || 'Not specified',
      source: source || 'contact-page',
      page: page || '/contact',
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
      }),
    });

    if (result.success) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: true,
          message: 'Project enquiry email dispatched successfully via SpaceMail.',
          messageId: result.messageId,
        })
      );
    } else {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          success: false,
          error: result.error || 'Failed to dispatch email via SpaceMail.',
        })
      );
    }
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        error: err?.message || 'Internal server error while processing email dispatch.',
      })
    );
  }
}
