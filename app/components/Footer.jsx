import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const COMPANY_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Vessels", href: "/vessels" },
  { label: "Contact Us", href: "/contact" },
];

const EMAILS = [
  { label: "Info", address: "info@crystalsa.com" },
  { label: "Chartering", address: "chartering@crystalsa.com" },
  { label: "Operations", address: "operation@crystalsa.com" },
  { label: "S&P", address: "snp@crystalsa.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <span className={styles.logoChip}>
              <Image
                src="/images/crystal-icon.png"
                alt="Crystal Management S.A."
                width={26}
                height={37}
                className={styles.logoMark}
              />
            </span>
            <span className={styles.brandName}>Crystal Management S.A.</span>
          </div>

          <p className={styles.about}>
            A privately held ship broking house active across tanker chartering,
            sale and purchase, demolition and ship management. Founded in 2015
            by Thanos Theocharis, drawing on more than twenty-five years in the
            international tanker markets, with a focus on period term crude oil
            and petroleum product trades across the WAfrica, AG, East, UKC and
            Med-WAfr routes.
          </p>

          <p className={styles.tagline}>
            Crystal clear professional, reliable and prudent services.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.heading}>Company</h3>
          <ul className={styles.linkList}>
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h3 className={styles.heading}>Contact</h3>

          <address className={styles.address}>
            5 Etolikou Street – 1st Floor
            <br />
            185 45 – Piraeus, Greece
          </address>

          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactLabel}>Tel</span>
              <a href="tel:+302104530130" className={styles.link}>
                + (30) 210 4530130
              </a>
            </li>
            <li>
              <span className={styles.contactLabel}>Fax</span>
              <a href="tel:+302104534821" className={styles.link}>
                +30 210 4534821
              </a>
            </li>
          </ul>

          <ul className={styles.contactList}>
            {EMAILS.map((email) => (
              <li key={email.address}>
                <span className={styles.contactLabel}>{email.label}</span>
                <a href={`mailto:${email.address}`} className={styles.link}>
                  {email.address}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.hours}>
            <span className={styles.contactLabel}>Hours</span>
            Mon–Fri: 10:00 – 19:00
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {year} Crystal Management S.A. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
