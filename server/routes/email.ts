import type { RequestHandler } from "express";
import { sendMail } from "../utils/mailer";

export const sendTestEmail: RequestHandler = async (req, res) => {
  try {
    const {
      to,
      subject = "WMOHY Test",
      message = "Hello from WMOHY",
    } = req.body || {};
    if (!to) return res.status(400).json({ error: "Missing 'to'" });
    await sendMail({ to, subject, text: message, html: `<p>${message}</p>` });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Failed to send" });
  }
};
