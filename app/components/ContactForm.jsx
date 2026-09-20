"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  subject: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className={styles.successPanel} role="status">
        <h2 className={styles.successHeading}>Message sent</h2>
        <p className={styles.successText}>
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="subject" className={styles.label}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      {status === "error" ? (
        <p className={styles.errorText} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
