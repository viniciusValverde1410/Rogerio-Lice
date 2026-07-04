"use client";

import { useEffect, useState } from "react";
import styles from "./ConfirmModal.module.css";

function formatCpf(value) {
  const onlyDigits = value.replace(/\D/g, "").slice(0, 11);

  return onlyDigits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function isValidCpfFormat(value) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
}

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xrewroqw";

export default function ConfirmModal({ isOpen, onClose, onSuccess }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setNome("");
    setCpf("");
    setErrors({});
    setSuccessMessage("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!nome.trim() || nome.trim().length < 3) {
      nextErrors.nome = "Informe um nome completo com pelo menos 3 caracteres.";
    }

    if (!cpf.trim()) {
      nextErrors.cpf = "CPF obrigatorio.";
    } else if (!isValidCpfFormat(cpf)) {
      nextErrors.cpf = "Informe o CPF no formato 000.000.000-00.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const payload = {
      nome: nome.trim(),
      cpf,
      dataHora: new Date().toISOString()
    };

    try {
      const [formspreeResponse] = await Promise.all([
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome: payload.nome,
            cpf: payload.cpf,
            dataHora: payload.dataHora,
            _subject: "Nova confirmação de presença"
          })
        }),
        fetch("/api/confirmacoes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
      ]);

      if (!formspreeResponse.ok) {
        setErrors({ cpf: "Não consegui enviar ao Formspree. Tente novamente." });
        return;
      }

      setSuccessMessage("Presença confirmada! Até lá.");
      onSuccess(payload);

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1200);
    } catch {
      setErrors({ cpf: "Erro de rede. Tente novamente." });
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Confirmar presença">
      <div className={styles.modal}>
        <h3>Confirmação de Presença</h3>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            name="nome"
            onChange={(event) => setNome(event.target.value)}
          />
          {errors.nome ? <p className={styles.error}>{errors.nome}</p> : null}

          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            name="cpf"
            onChange={(event) => setCpf(formatCpf(event.target.value))}
            maxLength={14}
          />
          {errors.cpf ? <p className={styles.error}>{errors.cpf}</p> : null}

          <div className={styles.actions}>
            <button type="submit" className={styles.confirmButton}>
              Confirmar
            </button>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
              Cancelar
            </button>
          </div>

          {successMessage ? <p className={styles.success}>{successMessage}</p> : null}
        </form>
      </div>
    </div>
  );
}