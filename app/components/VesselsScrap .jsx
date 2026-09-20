import Image from "next/image";
import styles from "./VesselsScrap.module.css";

const PHOTOS = [
  {
    src: "/images/scrap-vessel-1.jpg",
    alt: "Chartered tanker beached at a scrapyard for demolition, West Africa",
  },
  {
    src: "/images/scrap-vessel-2.jpg",
    alt: "Close-up of the tanker's hull at the demolition yard, West Africa",
  },
];

export default function VesselsScrap() {
  return (
    <section className={styles.vesselsScrap}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Vessels Sold as Scrap</h1>
        </div>

        <div className={styles.gallery}>
          {PHOTOS.map((photo) => (
            <div key={photo.src} className={styles.photoWrap}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className={styles.photo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
