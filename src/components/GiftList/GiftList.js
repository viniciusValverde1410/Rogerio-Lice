"use client";

import { useEffect, useState } from "react";
import styles from "./GiftList.module.css";

const GIFT_COUNTS_KEY = "giftCounts";
const SELECTED_BY_DEVICE_KEY = "giftSelectedByDevice";
const PIX_KEY = "pix-bodas-prata-001@exemplo.com";
const WHATSAPP_NUMBER = "5519992092158";
const WHATSAPP_MESSAGE = "Oi tudo bem? Eu vim pelo site e tal";

const gifts = [
  { id: "panelas", nome: "Jogo de Panelas Premium", valor: "R$ 1.250,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Panelas" },
  { id: "jantar", nome: "Aparelho de Jantar Completo", valor: "R$ 950,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Jantar" },
  { id: "adega", nome: "Adega Climatizada", valor: "R$ 1.890,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Adega" },
  { id: "cama", nome: "Jogo de Cama Egipcio", valor: "R$ 680,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Cama" },
  { id: "cristais", nome: "Conjunto de Cristais", valor: "R$ 790,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Cristais" },
  { id: "viagem", nome: "Cota Viagem Especial", valor: "R$ 500,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Viagem" },
  { id: "cafeteira", nome: "Cafeteira Gourmet", valor: "R$ 720,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Cafeteira" },
  { id: "toalhas", nome: "Jogo de Toalhas Bordadas", valor: "R$ 320,00", imagem: "https://placehold.co/300x200/1B2A4A/FFFFFF?text=Toalhas" }
];

export default function GiftList() {
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [giftCounts, setGiftCounts] = useState({});
  const [feedback, setFeedback] = useState("");
  const [confirmGift, setConfirmGift] = useState(null);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(SELECTED_BY_DEVICE_KEY) || "[]");
    const savedCounts = JSON.parse(localStorage.getItem(GIFT_COUNTS_KEY) || "{}");

    setSelectedGifts(saved);
    setGiftCounts(savedCounts);
  }, []);

  useEffect(() => {
    if (confirmGift || isPixModalOpen) {
      document.body.style.overflow = "visible";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [confirmGift, isPixModalOpen]);

  const handleGift = (gift) => {
    if (selectedGifts.includes(gift.id)) {
      return;
    }

    setConfirmGift(gift);
  };

  const closeConfirmModal = () => {
    setConfirmGift(null);
  };

  const confirmGiftSelection = () => {
    if (!confirmGift) {
      return;
    }

    const updated = [...selectedGifts, confirmGift.id];
    const updatedCounts = {
      ...giftCounts,
      [confirmGift.id]: (giftCounts[confirmGift.id] || 0) + 1
    };

    setSelectedGifts(updated);
    setGiftCounts(updatedCounts);

    localStorage.setItem(SELECTED_BY_DEVICE_KEY, JSON.stringify(updated));
    localStorage.setItem(GIFT_COUNTS_KEY, JSON.stringify(updatedCounts));

    setFeedback(`Confirmacao registrada para: ${confirmGift.nome}.`);
    setTimeout(() => setFeedback(""), 2800);

    setConfirmGift(null);
  };

  const openPixModal = () => {
    setIsPixModalOpen(true);
  };

  const closePixModal = () => {
    setIsPixModalOpen(false);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleArea}>
        <span />
        <h2>Lista de Presentes</h2>
        <span />
      </div>

      {feedback ? <p className={styles.feedback}>{feedback}</p> : null}

      <div className={styles.grid}>
        {gifts.map((gift) => (
          <article key={gift.id} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={gift.imagem} alt={gift.nome} />
            </div>
            <div className={styles.cardContent}>
              <h3>{gift.nome}</h3>
              <p>{gift.valor}</p>
              <span className={styles.counter}>
                {(giftCounts[gift.id] || 0) === 1
                  ? "1 pessoa esta dando este presente"
                  : `${giftCounts[gift.id] || 0} pessoas estao dando este presente`}
              </span>
              <button
                type="button"
                onClick={() => handleGift(gift)}
                disabled={selectedGifts.includes(gift.id)}
                className={selectedGifts.includes(gift.id) ? styles.disabled : ""}
              >
                {selectedGifts.includes(gift.id) ? "Confirmado" : "Presentear"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.supportArea}>
        <button type="button" className={styles.pixButton} onClick={openPixModal}>
          <svg viewBox="0 0 24 24" aria-hidden="true" role="img">
            <path d="M8.4 4.8L12 1.2l3.6 3.6-3.6 3.6-3.6-3.6zm7.2 7.2L19.2 8.4 22.8 12l-3.6 3.6-3.6-3.6zM1.2 12l3.6-3.6L8.4 12l-3.6 3.6L1.2 12zm7.2 7.2L12 15.6l3.6 3.6-3.6 3.6-3.6-3.6z" />
          </svg>
          Contribuir via Pix
        </button>
      </div>

      {confirmGift ? (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Confirmacao de presente">
          <div className={styles.modalBox}>
            <h3>Confirmar Presente</h3>
            <p>Deseja confirmar sua contribuicao para {confirmGift.nome}?</p>
            <div className={styles.modalActions}>
              <button type="button" onClick={confirmGiftSelection} className={styles.primaryAction}>
                Confirmar
              </button>
              <button type="button" onClick={closeConfirmModal} className={styles.secondaryAction}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isPixModalOpen ? (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Modal Pix">
          <div className={styles.modalBox}>
            <h3>Pagamento via Pix</h3>
            <p className={styles.pixLabel}>Chave Pix</p>
            <div className={styles.pixKey}>{PIX_KEY}</div>
            <div className={styles.qrPlaceholder}>Espaco reservado para QR Code</div>
            <div className={styles.modalActions}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noreferrer"
                className={styles.primaryAction}
              >
                Contato WhatsApp
              </a>
              <button type="button" onClick={closePixModal} className={styles.secondaryAction}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
