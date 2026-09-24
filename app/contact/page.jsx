"use client";

import { useState } from "react";
import styles from "./page.module.css";

const EMAILS = [
  "snp@crystalsa.com",
  "operation@crystalsa.com",
  "chartering@crystalsa.com",
  "info@crystalsa.com",
];

const CONTACTS = [
  {
    name: "Thanos Theocharis",
    phones: ["+30 694 948 4848", "+234 816 639 5593"],
  },
  { name: "Faye Theocharis", phones: ["+30 694 936 3636"] },
  { name: "Vasilis Konsolakis", phones: ["+30 694 956 5656"] },
];

const MAP_SRC =
  "https://www.google.com/maps?q=5+Etolikou+Street,+185+45+Piraeus,+Greece&output=embed";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload = Object.fromEntries(new FormData(event.target).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      setStatus("sent");
      event.target.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* <p className={styles.eyebrow}>Contact Us</p> */}
          <h1 className={styles.heading}>Send Us a Message</h1>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Company info */}
            <div className={styles.info}>
              <div className={styles.infoBlock}>
                <h2 className={styles.companyName}>Crystal Management S.A.</h2>
                <address className={styles.address}>
                  5 Etolikou Street – 1st Floor
                  <br />
                  185 45 – Piraeus,
                  <br />
                  Greece
                </address>
              </div>

              <dl className={styles.detailList}>
                <div className={styles.detailRow}>
                  <dt>Switchboard</dt>
                  <dd>
                    <a href="tel:+302104530130">+30 210 4530130</a>
                  </dd>
                </div>
                <div className={styles.detailRow}>
                  <dt>Fax</dt>
                  <dd>+30 210 4534821</dd>
                </div>
              </dl>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoLabel}>Email</h3>
                <ul className={styles.plainList}>
                  {EMAILS.map((email) => (
                    <li key={email}>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoLabel}>Contacts</h3>
                <ul className={styles.contactList}>
                  {CONTACTS.map((person) => (
                    <li key={person.name} className={styles.contactPerson}>
                      <span className={styles.contactName}>{person.name}</span>
                      <span className={styles.contactPhones}>
                        {person.phones.map((phone, i) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                          >
                            {i > 0 && " / "}
                            {phone}
                          </a>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" name="lastName" type="text" required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} required />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className={styles.formStatus} role="status">
                  Thanks, your message has been sent. We&rsquo;ll be in touch
                  shortly.
                </p>
              )}

              {status === "error" && (
                <p className={styles.formError} role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={styles.mapSection}>
        <iframe
          className={styles.map}
          src={MAP_SRC}
          title="Crystal Management S.A. location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
