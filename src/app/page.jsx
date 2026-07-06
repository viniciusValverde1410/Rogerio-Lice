"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import Carousel from "@/components/Carousel/Carousel";
import WeddingInfo from "@/components/WeddingInfo/WeddingInfo";
import GiftList from "@/components/GiftList/GiftList";
import styles from "./page.module.css";

export default function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      <section id="inicio" className={`${styles.section} ${styles.reveal}`} data-reveal>
        <Hero />
      </section>

      <section id="galeria" className={`${styles.section} ${styles.reveal}`} data-reveal>
        <Carousel />
      </section>

      <section id="evento" className={`${styles.section} ${styles.reveal}`} data-reveal>
        <WeddingInfo />
      </section>

      <section id="presentes" className={`${styles.section} ${styles.reveal}`} data-reveal>
        <GiftList />
      </section>

      <div className={styles.backToTopSection}>
        <button
          type="button"
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao inicio"
        >
          Voltar ao Início
        </button>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerTitle}>Aurelice Centanin Valverde & Rogério Marques Valverde</p>
          <p className={styles.footerBadge}>25 Anos - Bodas de Prata</p>

          <div className={styles.footerMeta}>
            <p className={styles.footerCopy}>Copyright © 2026. Todos os direitos reservados.</p>
            <p className={styles.footerCredit}>
              Desenvolvido por <a href="https://www.valverde-dev.com.br/" target="_blank" rel="noreferrer">Vinícius Valverde</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}