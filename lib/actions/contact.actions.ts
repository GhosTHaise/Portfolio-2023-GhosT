"use server";

import { client } from "@/client";

const DEFAULT_CONTACT_EMAIL = "ghostrex2@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormData = { name: string; email: string; message: string };
export type ContactResult =
  | { success: true }
  | { success: false; error: string };

function normalizeContact(data: ContactFormData): ContactFormData | null {
  if (!data || typeof data !== "object") return null;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (name.length < 1 || name.length > 100 || email.length > 254 ||
      !EMAIL_PATTERN.test(email) || message.length < 1 || message.length > 5000) {
    return null;
  }
  return { name, email, message };
}

async function sendContactEmail(contact: ContactFormData) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) throw new Error("Brevo is not configured");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "Portfolio contact form",
        email: senderEmail,
      },
      to: [{ email: process.env.CONTACT_RECEIVER_EMAIL || DEFAULT_CONTACT_EMAIL }],
      replyTo: { name: contact.name, email: contact.email },
      subject: `Portfolio contact from ${contact.name}`,
      textContent: [
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        "",
        contact.message,
      ].join("\n"),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Brevo request failed with status ${response.status} ${await response.text()}`);
  }
}

export async function submitContact(input: ContactFormData): Promise<ContactResult> {
  const contact = normalizeContact(input);
  if (!contact) return { success: false, error: "Please check the form fields." };
  try {
    await client.create({ _type: "contact", ...contact });
    await sendContactEmail(contact);
    return { success: true };
  } catch (error) {
    console.error("Contact submission failed", error);
    return { success: false, error: "Something went wrong sending your message. Please try again." };
  }
}
