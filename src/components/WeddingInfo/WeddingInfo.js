"use client";

import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import styles from "./WeddingInfo.module.css";

const eventInfo = [
  { label: "Data", value: "[INSERIR DATA]" },
  { label: "Horario", value: "[INSERIR HORARIO]" },
  { label: "Local", value: "[INSERIR LOCAL/ENDERECO]" }
];

export default function WeddingInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSuccess = () => {
    setFeedback("Presença confirmada! Até lá.");

    setTimeout(() => {
      setFeedback("");
    }, 2200);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleArea}>
        <span />
        <h2>Dados da Celebração</h2>
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
