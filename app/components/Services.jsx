import Image from "next/image";
import styles from "./Services.module.css";

const SERVICES = [
  {
    icon: "/images/shipping-blue-logo.jpg",
    title: "Tanker Chartering",
    description:
      "We are always striving to develop new alliances which emphasize modern time tankers seaborne trade activities. Specializing in WAfrica & AG, active in spot and period tanker chartering.",
  },
  {
    icon: "/images/shipping-blue-logo2-100x100.jpg",
    title: "Ship Sale & Purchase / Demolition",
    description:
      "We thoroughly understand the inter-relationships between the markets for newbuildings, second-hand tonnage and demolition.",
    note: "Recent track record: a VLCC sold for scrap in West Africa, and a Panamax MR sold in India.",
  },
  {
    icon: "/images/shipping-blue-logo3--100x100.jpg",
    title: "Operations & Claims Handling",
    description:
      "Voyage implementation and in-depth monitoring of all day-to-day operational issues. Handling of any type of claims, including demurrage, deviation and cargo claims, on both the competitive and commercial management side.",
  },
];

export default function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Our Services</h1>
          <p className={styles.intro}>
            Crystal Management S.A. is active across every stage of the tanker
            lifecycle, from chartering through sale, demolition and day-to-day
            operations.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.title} className={styles.card}>
              <span className={styles.iconChip}>
                <Image
                  src={service.icon}
                  alt=""
                  width={44}
                  height={44}
                  className={styles.icon}
                />
              </span>

              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardText}>{service.description}</p>

              {service.note ? (
                <p className={styles.cardNote}>{service.note}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
