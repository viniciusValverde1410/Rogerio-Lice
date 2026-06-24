"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <span className={styles.decorativeLine} />
        <h1>Imagem Principal</h1>
        <p>Área reservada para sua foto oficial da celebração.</p>
        <span className={styles.decorativeLine} />
      </div>
    </section>
  );
}
