"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import styles from "./WeddingInfo.module.css";

const eventInfo = [
  { label: "Data", value: "28/08/2026" },
  { label: "Horário", value: "19:30" },
  { label: "Local", value: "LIMIT`S BUFFET Valinhos" },
  { label: "Traje", value: "Traje fino" }
];

const eventDateTime = new Date("2026-08-28T19:30:00");
const mapUrl = "https://www.google.com/maps/search/?api=1&query=Rua%20Domingos%20Perseguetti%20n2360%20Parque%20Florence";

function getCountdown() {
  const now = new Date();
  const diff = eventDateTime.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function WeddingInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copyFeedback, setCopyFeedback] = useState("");

  useEffect(() => {
    setCountdown(getCountdown());

    const interval = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const handleSuccess = () => {
    setFeedback("Presença confirmada! Até lá.");

    setTimeout(() => {
      setFeedback("");
    }, 2200);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("Rua Domingos Perseguetti n2360, Parque Florence");
      setCopyFeedback("Endereço copiado.");
      window.setTimeout(() => setCopyFeedback(""), 1800);
    } catch {
      setCopyFeedback("Não foi possível copiar.");
      window.setTimeout(() => setCopyFeedback(""), 1800);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleArea}>
        <span />
        <h2>Informações da Celebração</h2>
        <span />
      </div>

      <div className={styles.infoGrid}>
        {eventInfo.map((item, index) => (
          <article key={item.label} className={styles.infoItem}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.value}>{item.value}</p>
            {index < eventInfo.length - 1 ? <div className={styles.separator} /> : null}
          </article>
        ))}
      </div>

      <div className={styles.extraGrid}>
        <article className={styles.extraCard}>
          <p className={styles.label}>Contagem Regressiva</p>
          <div className={styles.countdownGrid}>
            <div>
              <strong>{countdown.days}</strong>
              <span>Dias</span>
            </div>
            <div>
              <strong>{String(countdown.hours).padStart(2, "0")}</strong>
              <span>Horas</span>
            </div>
            <div>
              <strong>{String(countdown.minutes).padStart(2, "0")}</strong>
              <span>Min</span>
            </div>
            <div>
              <strong>{String(countdown.seconds).padStart(2, "0")}</strong>
              <span>Seg</span>
            </div>
          </div>
        </article>

        <article className={styles.extraCard}>
          <p className={styles.label}>Localização</p>
          <div className={styles.mapActions}>
            <a href={mapUrl} target="_blank" rel="noreferrer" className={styles.mapLink}>
              <svg viewBox="0 0 24 24" aria-hidden="true" role="img" className={styles.mapIcon}>
                <path d="M12 2C8.14 2 5 5.14 5 9c0 4.75 7 13 7 13s7-8.25 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              Abrir no Google Maps
            </a>

            <button type="button" className={styles.copyAddressButton} onClick={copyAddress}>
              Copiar endereço
            </button>
          </div>
          {copyFeedback ? <p className={styles.copyFeedback}>{copyFeedback}</p> : null}
          <p className={styles.mapAddress}>Rua Domingos Perseguetti n2360, Parque Florence</p>
        </article>
      </div>

      <div className={styles.confirmArea}>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Confirmar Presença
        </button>
        {feedback ? <p>{feedback}</p> : null}
      </div>

      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} />
    </section>
  );
}