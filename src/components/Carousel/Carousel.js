"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

const slides = [
  {
    src: "https://placehold.co/900x550/1B2A4A/FFFFFF?text=Foto+do+Casal+01",
    alt: "Momento especial do casal",
    caption: "Memorias construidas com elegancia e afeto.",
  },
  {
    src: "https://placehold.co/900x550/4A7FB5/FFFFFF?text=Foto+do+Casal+02",
    alt: "Retrato romantico do casal",
    caption: "Uma historia de parceria celebrada em cada detalhe.",
  },
  {
    src: "https://placehold.co/900x550/1B2A4A/FFFFFF?text=Foto+do+Casal+03",
    alt: "Registro da celebração",
    caption: "A beleza de vinte e cinco anos compartilhados.",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.headerArea}>
        <span />
        <h2>Galeria do Casal</h2>
        <span />
      </div>

      <div className={styles.carouselWrapper}>
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <figure
              key={slide.src}
              className={`${styles.slide} ${isActive ? styles.active : ""}`}
              aria-hidden={!isActive}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
              <figcaption>{slide.caption}</figcaption>
            </figure>
          );
        })}

        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={previousSlide}
          aria-label="Foto anterior"
        >
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path d="M14.8 5.6L8.4 12l6.4 6.4" />
          </svg>
        </button>

        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
          aria-label="Proxima foto"
        >
          <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path d="M9.2 5.6L15.6 12l-6.4 6.4" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para foto ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
