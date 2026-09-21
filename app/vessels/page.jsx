"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Add/remove/reorder images by editing this list — each entry is a path
// under public/images/vessels/.
const IMAGES = [
  "vv1.jpg",
  "vv2.jpg",
  "vv3.jpg",
  "vv3.png",
  "vv4.jpg",
  "vv5.jpg",
  "vv6.jpg",
  "vv7.jpg",
  "vv8.jpg",
  "vv9.png",
  "vv10.jpg",
  "vv11.jpg",
  "vv12.jpg",
  "vv13.jpg",
  "vv14.jpg",
  "vv15.jpg",
  "vv16.jpg",
  "vv17.jpg",
  "vv18.jpg",
  "vv19.jpg",
  "vv20.jpg",
  "vv21.jpg",
  "vv22.jpg",
  "vv23.jpg",
].map((file, i) => ({
  src: `/images/vessels/${file}`,
  alt: `Vessel photo ${i + 1}`,
}));

const AUTOPLAY_MS = 3000;

export default function VesselsPage() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + IMAGES.length) % IMAGES.length);
  }, []);

  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);
  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  // Autoplay, restarts whenever the active slide changes (including manual nav)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % IMAGES.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [active]);

  return (
    <main className={styles.gallery} aria-roledescription="carousel">
      {IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`${styles.slide} ${
            index === active ? styles.slideActive : ""
          }`}
          aria-hidden={index !== active}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={styles.slideImage}
          />
        </div>
      ))}

      <button
        type="button"
        className={`${styles.navButton} ${styles.navPrev}`}
        onClick={goPrev}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M15 5 L8 12 L15 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.navNext}`}
        onClick={goNext}
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M9 5 L16 12 L9 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.counter}>
        {active + 1} / {IMAGES.length}
      </div>
    </main>
  );
}
