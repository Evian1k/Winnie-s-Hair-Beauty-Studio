/**
 * Email service — uses Resend when RESEND_API_KEY is set,
 * otherwise logs to console (demo mode).
 *
 * In production, sign up at https://resend.com and add RESEND_API_KEY to .env
 */

import type { Booking } from "@/lib/salon-store";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "Winnie's Hair & Beauty Studio <noreply@winnieshairandbeauty.co.ke>";
const EMAIL_TO_SALON = process.env.EMAIL_TO_SALON || "hello@winnieshairandbeauty.co.ke";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://winnieshairandbeauty.co.ke";

export const emailEnabled = Boolean(RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<boolean> {
  if (!emailEnabled) {
    console.log(`[EMAIL — demo mode] To: ${to} | Subject: ${subject}\n${html}`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[Resend] Failed to send email:", errorText);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Resend] Network error:", err);
    return false;
  }
}

// ===== Templates =====

export async function sendBookingConfirmationEmail(booking: Booking): Promise<boolean> {
  const dateStr = new Date(booking.date).toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #FFF5F7;">
      <div style="background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 12px rgba(183, 110, 121, 0.08);">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #B76E79, #D4AF37); line-height: 56px; color: white; font-family: Georgia, serif; font-size: 24px; font-weight: bold;">W</div>
          <h1 style="font-family: Georgia, serif; color: #1A1A1A; margin: 16px 0 8px; font-size: 24px;">Booking Confirmed!</h1>
          <p style="color: #666; margin: 0;">We can't wait to see you, ${booking.customerName.split(" ")[0]}.</p>
        </div>

        <p style="color: #444; line-height: 1.6;">Thank you for booking with Winnie's Hair & Beauty Studio. Your appointment is confirmed. Here are the details:</p>

        <div style="background: #FFF5F7; border-radius: 16px; padding: 24px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px; color: #444;">
            <tr><td style="padding: 8px 0; color: #999;">Reference</td><td style="padding: 8px 0; font-weight: 600; color: #B76E79;">${booking.id.toUpperCase()}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Service</td><td style="padding: 8px 0; font-weight: 600;">${booking.serviceName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Date</td><td style="padding: 8px 0; font-weight: 600;">${dateStr}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Time</td><td style="padding: 8px 0; font-weight: 600;">${booking.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Stylist</td><td style="padding: 8px 0; font-weight: 600;">${booking.stylistName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Starting Price</td><td style="padding: 8px 0; font-weight: 600; color: #B76E79;">KSh ${booking.price.toLocaleString()}</td></tr>
          </table>
        </div>

        ${booking.notes ? `<p style="color: #444; line-height: 1.6;"><strong>Your notes:</strong> ${booking.notes}</p>` : ""}

        <div style="background: #FFF9E6; border-left: 3px solid #D4AF37; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0; color: #444; font-size: 13px; line-height: 1.5;">
            <strong>Cancellation policy:</strong> Free up to 24 hours before. 50% fee within 24 hours. Full fee for no-shows.
          </p>
        </div>

        <p style="color: #444; line-height: 1.6;">Need to reschedule? Call us on <a href="tel:+254790573509" style="color: #B76E79;">+254 790 573509</a> or reply to this email.</p>

        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px; margin: 0;">Winnie's Hair & Beauty Studio</p>
          <p style="color: #999; font-size: 12px; margin: 4px 0 0;">Katani Lounge Building, Syokimau–Katani Road, Katani, Kenya</p>
          <p style="color: #999; font-size: 12px; margin: 4px 0 0;"><a href="${SITE_URL}" style="color: #B76E79;">${SITE_URL}</a></p>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: booking.customerEmail,
    subject: `Booking Confirmed — ${booking.serviceName} on ${dateStr}`,
    html,
    replyTo: EMAIL_TO_SALON,
  });
}

export async function sendAdminBookingNotification(booking: Booking): Promise<boolean> {
  const dateStr = new Date(booking.date).toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #FFF5F7;">
      <div style="background: white; border-radius: 24px; padding: 40px;">
        <h1 style="font-family: Georgia, serif; color: #B76E79; margin: 0 0 16px;">New Booking Received</h1>
        <p style="color: #444;">A new appointment has been booked. Review and confirm it in your admin dashboard.</p>

        <div style="background: #FFF5F7; border-radius: 16px; padding: 24px; margin: 24px 0;">
          <table style="width: 100%; font-size: 14px; color: #444;">
            <tr><td style="padding: 8px 0; color: #999;">Reference</td><td style="padding: 8px 0; font-weight: 600;">${booking.id.toUpperCase()}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Customer</td><td style="padding: 8px 0; font-weight: 600;">${booking.customerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;">${booking.customerEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${booking.customerPhone}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Service</td><td style="padding: 8px 0; font-weight: 600;">${booking.serviceName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Date & Time</td><td style="padding: 8px 0; font-weight: 600;">${dateStr} at ${booking.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Stylist</td><td style="padding: 8px 0;">${booking.stylistName}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Price</td><td style="padding: 8px 0; font-weight: 600; color: #B76E79;">KSh ${booking.price.toLocaleString()}</td></tr>
          </table>
        </div>

        ${booking.notes ? `<p style="color: #444;"><strong>Customer notes:</strong> ${booking.notes}</p>` : ""}

        <a href="${SITE_URL}/#admin" style="display: inline-block; background: linear-gradient(135deg, #B76E79, #D4A574); color: white; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; margin-top: 16px;">Open Admin Dashboard</a>
      </div>
    </div>
  `;

  return sendEmail({
    to: EMAIL_TO_SALON,
    subject: `[New Booking] ${booking.customerName} — ${booking.serviceName} on ${dateStr}`,
    html,
    replyTo: booking.customerEmail,
  });
}

export async function sendContactNotification(message: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #FFF5F7;">
      <div style="background: white; border-radius: 24px; padding: 40px;">
        <h1 style="font-family: Georgia, serif; color: #B76E79; margin: 0 0 16px;">New Contact Message</h1>
        <table style="width: 100%; font-size: 14px; color: #444; margin-bottom: 24px;">
          <tr><td style="padding: 4px 0; color: #999; width: 80px;">Name</td><td style="padding: 4px 0; font-weight: 600;">${message.name}</td></tr>
          <tr><td style="padding: 4px 0; color: #999;">Email</td><td style="padding: 4px 0;"><a href="mailto:${message.email}" style="color: #B76E79;">${message.email}</a></td></tr>
          ${message.phone ? `<tr><td style="padding: 4px 0; color: #999;">Phone</td><td style="padding: 4px 0;">${message.phone}</td></tr>` : ""}
        </table>
        <div style="background: #FFF5F7; border-radius: 16px; padding: 20px; color: #444; line-height: 1.6;">
          ${message.message.replace(/\n/g, "<br>")}
        </div>
        <a href="mailto:${message.email}" style="display: inline-block; background: linear-gradient(135deg, #B76E79, #D4A574); color: white; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; margin-top: 24px;">Reply to ${message.name.split(" ")[0]}</a>
      </div>
    </div>
  `;

  return sendEmail({
    to: EMAIL_TO_SALON,
    subject: `[Contact] ${message.name} sent you a message`,
    html,
    replyTo: message.email,
  });
}

export async function sendContactAutoresponder(message: {
  name: string;
  email: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #FFF5F7;">
      <div style="background: white; border-radius: 24px; padding: 40px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #B76E79, #D4AF37); line-height: 56px; color: white; font-family: Georgia, serif; font-size: 24px; font-weight: bold;">W</div>
        </div>
        <h1 style="font-family: Georgia, serif; color: #1A1A1A; margin: 0 0 16px;">Thank you for reaching out, ${message.name.split(" ")[0]}!</h1>
        <p style="color: #444; line-height: 1.6;">We've received your message and our team will get back to you within 24 hours. For urgent matters, please call us on <a href="tel:+254790573509" style="color: #B76E79;">+254 790 573509</a>.</p>
        <p style="color: #444; line-height: 1.6;">In the meantime, feel free to browse our services or book an appointment online.</p>
        <a href="${SITE_URL}" style="display: inline-block; background: linear-gradient(135deg, #B76E79, #D4A574); color: white; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; margin-top: 16px;">Visit Our Website</a>
        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          <p style="margin: 0;">Winnie's Hair & Beauty Studio</p>
          <p style="margin: 4px 0 0;">Katani Lounge Building, Syokimau–Katani Road, Katani, Kenya</p>
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: message.email,
    subject: "We've received your message — Winnie's Hair & Beauty Studio",
    html,
    replyTo: EMAIL_TO_SALON,
  });
}
