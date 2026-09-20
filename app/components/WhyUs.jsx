import Image from "next/image";
import styles from "./WhyUs.module.css";

const POINTS = [
  {
    icon: "compass",
    text: "Almost a century of combined experience in the shipping industry, from Owners' and Brokers' perspective, allowing us to provide high-end solutions with flexibility.",
  },
  {
    icon: "shield",
    text: "Crystal clear professional, reliable and prudent services, maintaining the highest standards and ethics in all our endeavors.",
  },
  {
    icon: "team",
    text: "A highly experienced, motivated and goal-oriented team.",
  },
];

function Icon({ name }) {
  switch (name) {
    case "compass":
      return (
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5 12.8 13.6a1 1 0 0 1-.5.5L8.2 15.8a.4.4 0 0 1-.5-.5l1.7-4.1a1 1 0 0 1 .5-.5l4.1-1.7a.4.4 0 0 1 .5.5Z" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path d="M12 3.5 19 6.5v5.2c0 4.4-3 7.9-7 8.8-4-0.9-7-4.4-7-8.8V6.5Z" />
          <path d="M9 12.2l2 2 4-4.4" />
        </svg>
      );
    case "team":
      return (
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <circle cx="8.5" cy="8" r="2.6" />
          <circle cx="16" cy="9" r="2.1" />
          <path d="M3.8 18.5c0-2.8 2.1-4.6 4.7-4.6s4.7 1.8 4.7 4.6" />
          <path d="M13.6 14.5c2 .1 3.7 1.6 3.7 3.8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Approach() {
  return (
    <section className={styles.approach}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/tanker-bahia-damas.jpg"
            alt="Crystal Management chartered tanker Bahia Damas at berth"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.heading}>
            Built on experience, held to a standard
          </h2>

          <ul className={styles.pointList}>
            {POINTS.map((point) => (
              <li key={point.icon} className={styles.point}>
                <span className={styles.iconWrap}>
                  <Icon name={point.icon} />
                </span>
                <p className={styles.pointText}>{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
