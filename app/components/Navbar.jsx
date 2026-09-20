"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Vessels", href: "/vessels" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close the mobile menu whenever the viewport is resized back to desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Give the bar a subtle elevated state once the page has scrolled.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/crystal-icon.png"
            alt="Crystal Management S.A."
            width={44}
            height={44}
            className={styles.logoMark}
            priority
          />
          <span className={styles.brandName}>
            Crystal Management <span className={styles.brandSuffix}>S.A.</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`${styles.menuToggle} ${
            isOpen ? styles.menuToggleOpen : ""
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile"
      >
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
