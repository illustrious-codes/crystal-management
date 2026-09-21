import Image from "next/image";
import styles from "./page.module.css";

const INTRO_PARAGRAPHS = [
  "Crystal Management S.A. is a privately held ship broking company active in every aspect of the shipping market including spot and period Tanker Chartering, Ship Sale and Purchase, Demolition market, and Ship Management.",
  "The company was established in January 2015 led by Thanos Theocharis, a well-known and reputable highly specialized shipping professional, who has maintained close relationships with the major oil companies, traders and shipowners, and is always striving to develop new alliances, emphasizing on the modern time seaborne trade activities and focusing on period term markets/transportation of Crude Oil and petroleum products, covering a vast array of sizes and specializing in WAFRICA / AG / EAST /UKG or MED-WAFR.",
  "Having served for more than twenty-five years on Owners\u2019 in-house brokerage side but also on the competitive one, Thanos Theocharis brings with him a vast commercial experience in the international tanker markets, a valuable heritage.",
  "We commit ourselves to providing crystal clear professional, reliable and prudent services, while maintaining the highest standards and ethics in all our endeavors.",
];

const TEAM = [
  {
    name: "Thanos Theocharis",
    title: "Managing Director / Head of Chartering",
    bio: "Graduated from the Greek Merchant Marine School of Hydra till the end as usual. He is also a graduate of the London Institute of Commerce (modules: Marketing theory, Shipping Law, Financial Management Accounting, Marine Insurance and Shipping Management Accounting), during which he established direct contact with many major oil companies and traders. Apart from his vast commercial experience, Thanos holds a substantial knowledge of insurance, claims and P&I matters.",
  },
  {
    name: "Faye Theocharis",
    title: "Tanker Operator",
    bio: "She leads the daily post fixtures operations of the ship, ensuring that fixtures are monitored and concluded according to charter party clauses and shipping terms/practices. She is currently completing her Bachelor degree in Plymouth University London.",
  },
  {
    name: "Vassilis Konsolakis",
    title: "Tanker Broker",
    bio: "Shipping and negotiations with relevant studies on each field, an MBA holder bringing with him a good knowledge of economics and working experience. He has gained a very comprehensive knowledge in commercial shipping, chartering and sale & purchase of ships.",
  },
  {
    name: "Rosaline Abolagba",
    title: "Commercial Ship Agency Operations \u2014 West Africa, Nigeria",
    bio: "Acting as a local representative, she provides local knowledge and ensures that principals\u2019 requirements are performed with utmost efficiency.",
  },
  {
    name: "Antonia Giannisi",
    title: "Accounting Manager",
    bio: null,
  },
  {
    name: "Katherine Theocharis",
    title: "Assistant Accountant",
    bio: null,
  },
  {
    name: "Nafsika Katoudis",
    title: "Administration",
    bio: null,
  },
];

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* <p className={styles.eyebrow}>Crystal Management S.A.</p> */}
          <h1 className={styles.heading}>About Us</h1>
        </div>
      </section>

      {/* Banner image */}
      <div className={styles.container}>
        <div className={styles.banner}>
          <Image
            src="/images/about/aboutmanage2.jpg"
            alt="Two tankers moored side by side at sea, viewed from above"
            fill
            sizes="(max-width: 1200px) 100vw, 1160px"
            className={styles.bannerImage}
            priority
          />
        </div>
      </div>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyText}>
            {INTRO_PARAGRAPHS.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Second image */}
      <div className={styles.container}>
        <div className={styles.bannerSecondary}>
          <Image
            src="/images/about/aboutmanage.jpg"
            alt="Bow of the tanker African Gem at anchor"
            fill
            sizes="(max-width: 1200px) 100vw, 1160px"
            className={styles.bannerImage}
          />
        </div>
      </div>

      {/* Team */}
      <section className={styles.team}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Our people</p>
          <h2 className={styles.teamHeading}>Meet the Team</h2>

          <ul className={styles.teamGrid}>
            {TEAM.map(({ name, title, bio }) => (
              <li key={name} className={styles.card}>
                <div className={styles.avatar} aria-hidden="true">
                  {initials(name)}
                </div>
                <p className={styles.name}>{name}</p>
                <p className={styles.title}>{title}</p>
                {bio && <p className={styles.bio}>{bio}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
