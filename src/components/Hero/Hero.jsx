"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <span className={styles.decorativeLine} />
        <h1 className={styles.title}>Aurelice &amp; Rogério</h1>
        <p className={styles.subtitle}>comemorando 25 anos juntos!</p>
        <span className={styles.decorativeLine} />
      </div>
    </section>
  );
}