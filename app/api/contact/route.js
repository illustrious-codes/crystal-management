import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const subject = (body.subject || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO_EMAIL,
    SMTP_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "Contact form is missing SMTP configuration. Check .env.local."
    );
    return NextResponse.json(
      {
        error: "The contact form isn't configured yet. Please try again later.",
      },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT) || 587;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Crystal Management Website" <${SMTP_FROM || SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Website enquiry] ${
        subject || `From ${firstName} ${lastName}`
      }`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Subject: ${subject || "N/A"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(
        lastName
      )}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "N/A")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
