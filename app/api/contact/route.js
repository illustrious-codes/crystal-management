import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strips newlines so user input can't be used to inject extra mail headers.
function sanitizeHeaderValue(str = "") {
  return str.replace(/[\r\n]+/g, " ").trim();
}

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

  const firstName = sanitizeHeaderValue(body.firstName || "");
  const lastName = sanitizeHeaderValue(body.lastName || "");
  const phone = sanitizeHeaderValue(body.phone || "");
  const email = sanitizeHeaderValue(body.email || "");
  const message = (body.message || "").trim();

  if (!firstName || !lastName || !phone || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587/25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName} (Website)" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(
        lastName
      )}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong sending your message. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
