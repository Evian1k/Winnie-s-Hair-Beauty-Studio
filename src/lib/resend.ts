import { Resend } from "resend";

/**
 * Resend email client — returns null if RESEND_API_KEY is not set.
 */
let _client: Resend | null | undefined = undefined;

export function getResend(): Resend | null {
  if (_client !== undefined) return _client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    _client = null;
    return null;
  }
  try {
    _client = new Resend(apiKey);
    return _client;
  } catch (e) {
    console.error("[Resend] init failed:", e);
    _client = null;
    return null;
  }
}

export function isResendConfigured(): boolean {
  return getResend() !== null;
}

const DEFAULT_FROM =
  process.env.EMAIL_FROM ||
  "Lizaya Hair Studio <noreply@lizayahairstudio.co.ke>";

const SALON_INBOX =
  process.env.EMAIL_TO_SALON || "hello@lizayahairstudio.co.ke";

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  stylistName: string;
  price: number;
  notes?: string;
  reference: string;
}

/**
 * Send a booking confirmation email to the customer.
 * No-ops (with console log) if Resend is not configured.
 */
export async function sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.log(
      "[Email Mock] Booking confirmation would be sent to:",
      data.customerEmail,
      "— Reference:",
      data.reference
    );
    return false;
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FFF5F7;">
      <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(183, 110, 121, 0.08);">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #B76E79, #D4AF37); color: white; font-family: Georgia, serif; font-size: 28px; font-weight: bold; line-height: 56px; margin-bottom: 12px;">W</div>
          <h1 style="font-family: Georgia, serif; color: #1a1a1a; font-size: 24px; margin: 0;">Booking Confirmed</h1>
          <p style="color: #888; margin: 4px 0 0 0; font-size: 14px;">Lizaya Hair Studio</p>
        </div>
        <p style="color: #444; font-size: 16px; line-height: 1.6;">Hi ${data.customerName},</p>
        <p style="color: #444; font-size: 16px; line-height: 1.6;">Your appointment is confirmed! We can't wait to pamper you. Here are your details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
          <tr><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Reference</td><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; font-weight: 600; color: #B76E79; font-family: monospace;">${data.reference}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #EEE; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Service</td><td style="padding: 12px; border-bottom: 1px solid #EEE; font-weight: 600;">${data.serviceName}</td></tr>
          <tr><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Date</td><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; font-weight: 600;">${data.date}</td></tr>
          <tr><td style="padding: 12px; border-bottom: 1px solid #EEE; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Time</td><td style="padding: 12px; border-bottom: 1px solid #EEE; font-weight: 600;">${data.time}</td></tr>
          <tr><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Stylist</td><td style="padding: 12px; background: #FAFAFA; border-bottom: 1px solid #EEE; font-weight: 600;">${data.stylistName}</td></tr>
          <tr><td style="padding: 12px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Starting Price</td><td style="padding: 12px; font-weight: 600;">KSh ${data.price.toLocaleString()}</td></tr>
        </table>
        ${data.notes ? `<p style="color: #444; font-size: 14px; background: #FFF9E6; padding: 12px; border-radius: 8px;"><strong>Your notes:</strong> ${data.notes}</p>` : ""}
        <p style="color: #444; font-size: 16px; line-height: 1.6;">See you soon at Katani Lounge Building, Syokimau–Katani Road, Katani.</p>
        <p style="color: #888; font-size: 13px; margin-top: 24px; padding-top: 24px; border-top: 1px solid #EEE;">Need to reschedule? Call us at +254 790 573509. Cancellations within 24 hours incur a 50% fee.</p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: data.customerEmail,
      subject: `Booking Confirmed — ${data.serviceName} · ${data.date}`,
      html,
    });
    if (error) {
      console.error("[Resend] send failed:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[Resend] exception:", e);
    return false;
  }
}

/**
 * Notify the salon of a new booking.
 */
export async function notifySalonOfBooking(data: BookingEmailData): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.log(
      "[Email Mock] Salon would be notified of new booking:",
      data.reference,
      "from",
      data.customerEmail
    );
    return false;
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F5F5F5;">
      <div style="background: white; border-radius: 16px; padding: 32px;">
        <h1 style="font-family: Georgia, serif; color: #B76E79; margin: 0 0 16px 0;">New Booking Received</h1>
        <p style="color: #444; font-size: 16px;">A new appointment has been booked. Details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Reference</td><td style="padding: 8px; font-family: monospace; color: #B76E79;">${data.reference}</td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Customer</td><td style="padding: 8px;">${data.customerName}</td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Email</td><td style="padding: 8px;"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Phone</td><td style="padding: 8px;"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Service</td><td style="padding: 8px;">${data.serviceName}</td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Date</td><td style="padding: 8px;">${data.date} at ${data.time}</td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Stylist</td><td style="padding: 8px;">${data.stylistName}</td></tr>
          <tr><td style="padding: 8px; color: #888; font-size: 13px;">Price</td><td style="padding: 8px;">KSh ${data.price.toLocaleString()}</td></tr>
        </table>
        ${data.notes ? `<p style="color: #444; font-size: 14px; background: #FFF9E6; padding: 12px; border-radius: 8px;"><strong>Customer notes:</strong> ${data.notes}</p>` : ""}
        <p style="color: #888; font-size: 13px; margin-top: 24px;">Log in to the admin dashboard to confirm or manage this booking.</p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: SALON_INBOX,
      subject: `[New Booking] ${data.serviceName} — ${data.customerName} · ${data.date}`,
      html,
    });
    if (error) {
      console.error("[Resend] salon notify failed:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[Resend] exception:", e);
    return false;
  }
}

/**
 * Notify the salon of a new contact message.
 */
export async function notifySalonOfMessage(msg: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.log("[Email Mock] Salon would be notified of new message from:", msg.email);
    return false;
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F5F5F5;">
      <div style="background: white; border-radius: 16px; padding: 32px;">
        <h1 style="font-family: Georgia, serif; color: #B76E79; margin: 0 0 16px 0;">New Contact Message</h1>
        <p style="color: #444; font-size: 16px;"><strong>From:</strong> ${msg.name}</p>
        <p style="color: #444; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${msg.email}">${msg.email}</a></p>
        ${msg.phone ? `<p style="color: #444; font-size: 16px;"><strong>Phone:</strong> <a href="tel:${msg.phone}">${msg.phone}</a></p>` : ""}
        <div style="background: #FAFAFA; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <p style="color: #444; font-size: 15px; line-height: 1.6; margin: 0;">${msg.message}</p>
        </div>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: SALON_INBOX,
      subject: `[New Message] ${msg.name} — ${msg.email}`,
      html,
    });
    if (error) {
      console.error("[Resend] message notify failed:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[Resend] exception:", e);
    return false;
  }
}
