import nodemailer from "nodemailer";

export function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  let secure =
    String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  if (port === 465 && !secure) secure = true; // Implicit TLS for port 465
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP configuration missing (host/user/pass)");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function verifySmtp() {
  const transporter = getTransport();
  return transporter.verify();
}

export async function sendMail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  const fromName = process.env.SMTP_FROM_NAME || "Mailer";
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER!;
  const replyTo = process.env.REPLY_TO || fromEmail;
  const transporter = getTransport();
  await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
    text,
    replyTo,
    envelope: {
      from: fromEmail,
      to: to,
    },
  });
}
