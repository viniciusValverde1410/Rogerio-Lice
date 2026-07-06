"use client";

import { useState } from "react";
import styles from "./GiftList.module.css";

const GIFT_LIST_URL =
  "https://www.querodecasamento.com.br/lista-de-casamento/valverde-rogerio-lice";
const PIX_KEY = "sentalinvalverde@gmail.com";

export default function GiftList() {
  const [isPixOpen, setIsPixOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopyFeedback("Chave copiada.");
      window.setTimeout(() => setCopyFeedback(""), 1800);
    } catch {
      setCopyFeedback("Nao foi possivel copiar.");
      window.setTimeout(() => setCopyFeedback(""), 1800);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleArea}>
        <span />
        <h2>Lista de Presentes</h2>
        <span />
      </div>

      <p className={styles.description}>
        Para acessar a lista oficial de presentes, utilize o botão abaixo.
      </p>

      <div className={styles.actionArea}>
        <a
          href={GIFT_LIST_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.ctaButton}
        >
          Abrir Lista 
        </a>
      </div>

      <div className={styles.pixArea}>
        <button type="button" className={styles.pixButton} onClick={() => setIsPixOpen(true)}>
          Pix
        </button>
      </div>

      {isPixOpen ? (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Pix">
          <div className={styles.modalBox}>
            <h3>Pagamento via Pix</h3>
            <p className={styles.pixLabel}>Chave Pix</p>
            <div className={styles.pixKeyRow}>
              <div className={styles.pixKey}>{PIX_KEY}</div>
              <button
                type="button"
                className={styles.copyButton}
                onClick={copyPixKey}
                aria-label="Copiar chave Pix"
              >
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                  <path d="M9 9V5.5A1.5 1.5 0 0 1 10.5 4h8A1.5 1.5 0 0 1 20 5.5v8A1.5 1.5 0 0 1 18.5 15H15" />
                  <rect x="4" y="8" width="10" height="10" rx="1.5" ry="1.5" />
                </svg>
              </button>
            </div>
            {copyFeedback ? <p className={styles.copyFeedback}>{copyFeedback}</p> : null}
            <img
              className={styles.qrImage}
              src="/images/qrcodePix.jpg"
              alt="QR Code para pagamento via Pix"
            />
            <button type="button" className={styles.closeButton} onClick={() => setIsPixOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}