import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure Node.js runtime (Nodemailer is not compatible with Edge runtime)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      company?: string;
      email?: string;
      phone?: string;
      interest?: string;
      standard?: string;
      message?: string;
      consent?: boolean;
      website?: string; // honeypot
    };

    // Honeypot: silently succeed to avoid tipping off bots
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const errors: string[] = [];
    if (!body.name || body.name.trim() === "") errors.push("Missing name");
    if (!body.email || body.email.trim() === "") errors.push("Missing email");
    if (!body.message || body.message.trim() === "") errors.push("Missing message");
    if (!body.consent) errors.push("Consent is required");
    if (errors.length) {
      return NextResponse.json({ ok: false, error: errors.join("; ") }, { status: 400 });
    }

    const env = process.env;
    const required = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "CONTACT_RECEIVER",
    ] as const;
    const missing = required.filter((k) => !env[k] || String(env[k]).trim() === "");
    if (missing.length) {
      const msg = process.env.NODE_ENV === "production"
        ? "Email service not configured"
        : `Email service not configured. Missing: ${missing.join(", ")}`;
      return NextResponse.json({ ok: false, error: msg }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465, // 465 = SMTPS; 587 uses STARTTLS
      auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
    });

    const subject = "Jauns pieprasījums no ISOLogic mājaslapas";

    // Helpers: sanitize and escape for safe HTML
    const s = (v?: string) => (typeof v === "string" ? v.trim() : "");
    const escapeHtml = (input: string) =>
      input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    const nl2br = (input: string) => escapeHtml(input).replace(/\n/g, "<br/>");

    const name = s(body.name);
    const company = s(body.company);
    const email = s(body.email);
    const phone = s(body.phone);
    const interest = s(body.interest);
    const standard = s(body.standard);
    const message = s(body.message);

    const lines = [
      `Name: ${name}`,
      `Company: ${company || "-"}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || "-"}`,
      `Interest: ${interest || "-"}`,
      `Standard(s): ${standard || "-"}`,
      "",
      "Message:",
      message || "",
    ];

    const row = (label: string, value?: string) => {
      const val = value && value.trim() !== "" ? escapeHtml(value) : "-";
      // clickable for email/phone handled separately
      return `
        <tr>
          <td style="padding:8px 0;color:#666;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 0;color:#111;font-size:14px;">${val}</td>
        </tr>`;
    };

    const emailLink = email
      ? `<a href="mailto:${escapeHtml(email)}" style="color:#006DB6;text-decoration:none;">${escapeHtml(
          email
        )}</a>`
      : "-";
    const phoneLink = phone
      ? `<a href="tel:${escapeHtml(phone)}" style="color:#006DB6;text-decoration:none;">${escapeHtml(
          phone
        )}</a>`
      : "-";

    const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f5f7;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f5f7;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,0.06);">
            <tr>
              <td style="padding:20px 24px;border-bottom:1px solid #e5e7eb;">
                <h1 style="margin:0;font-size:18px;line-height:1.4;color:#111;font-family:Arial, Helvetica, sans-serif;">Jauns pieprasījums no ISOLogic mājaslapas</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:Arial, Helvetica, sans-serif;">
                  ${row("Name", name)}
                  ${row("Company", company)}
                  <tr>
                    <td style="padding:8px 0;color:#666;font-size:13px;width:160px;vertical-align:top;">Email</td>
                    <td style="padding:8px 0;color:#111;font-size:14px;">${emailLink}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666;font-size:13px;width:160px;vertical-align:top;">Phone / WhatsApp</td>
                    <td style="padding:8px 0;color:#111;font-size:14px;">${phoneLink}</td>
                  </tr>
                  ${row("Interest", interest)}
                  ${row("Standard(s)", standard)}
                </table>

                <div style="margin-top:16px;border:1px solid #e5e7eb;border-radius:8px;background:#fafafa;padding:12px;">
                  <div style="font-family:Arial, Helvetica, sans-serif;color:#666;font-size:12px;margin-bottom:6px;">Message</div>
                  <div style="font-family:Arial, Helvetica, sans-serif;color:#111;font-size:14px;line-height:1.5;">${
                    message ? nl2br(message) : "-"
                  }</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 24px;border-top:1px solid #e5e7eb;">
                <div style="font-family:Arial, Helvetica, sans-serif;color:#6b7280;font-size:12px;text-align:center;">ISOLogic website contact form</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    await transporter.sendMail({
      from: `ISOLogic Website <${env.SMTP_USER}>`,
      to: env.CONTACT_RECEIVER,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
