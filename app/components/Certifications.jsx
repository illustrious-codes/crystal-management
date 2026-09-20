import Image from "next/image";
import styles from "./Certifications.module.css";

const CERTIFICATIONS = [
  {
    src: "/images/cert-hsa-member.png",
    alt: "Hellenic Shipbrokers Association member badge",
    width: 138,
    height: 150,
    caption: "Hellenic Shipbrokers Association",
    note: "Certified by Hellenic Shipbrokers",
  },
  {
    src: "/images/cert-bureau-veritas-iso9001.png",
    alt: "Bureau Veritas ISO 9001 certification",
    width: 300,
    height: 150,
    caption: "ISO 9001 Certification",
    note: "Certified by Bureau Veritas",
  },
];

export default function Certifications() {
  return (
    <section className={styles.certifications}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Certifications</h1>
          <p className={styles.intro}>
            Our membership and certifications reflect the standards we hold
            ourselves to.
          </p>
        </div>

        <div className={styles.grid}>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.caption} className={styles.card}>
              <div className={styles.logoWrap}>
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={cert.width}
                  height={cert.height}
                  className={styles.logo}
                />
              </div>
              <p className={styles.caption}>{cert.caption}</p>
              <p className={styles.note}>{cert.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
