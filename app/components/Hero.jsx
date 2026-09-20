import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/tanker-bahia-damas.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <h1 className={styles.headline}>
          A trusted hand across the world&apos;s tanker markets
        </h1>

        <p className={styles.subhead}>
          Independent ship broking spanning tanker chartering, sale and
          purchase, demolition and management — led by more than twenty-five
          years of experience in crude oil and petroleum product trades across
          the WAfrica, AG, East, UKC and Med-WAfr routes.
        </p>

        <div className={styles.actions}>
          <Link href="/services" className={styles.primaryButton}>
            View our services
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Get in touch
          </Link>
        </div>

        <p className={styles.meta}>Est. 2015 · Piraeus, Greece</p>
      </div>
    </section>
  );
}
