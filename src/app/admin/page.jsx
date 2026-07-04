"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const PASSWORD = "2312"; // Senha de acesso para o painel do casal
const SESSION_KEY = "adminAutenticado";

function formatCpf(cpf) {
  const digits = cpf.replace(/\D/g, "");

  if (digits.length !== 11) {
    return cpf;
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [confirmacoes, setConfirmacoes] = useState([]);

  useEffect(() => {
    const flag = sessionStorage.getItem(SESSION_KEY);
    if (flag === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const data = JSON.parse(localStorage.getItem("confirmacoes") || "[]");
    setConfirmacoes(data);
  }, [isAuthenticated]);

  const total = useMemo(() => confirmacoes.length, [confirmacoes]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (password === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setError("");
      return;
    }

    setError("Senha incorreta. Tente novamente.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  const exportCsv = () => {
    const header = "Nome,CPF,Data e Hora";
    const rows = confirmacoes.map((item) => `${item.nome},${item.cpf},${formatDate(item.dataHora)}`);
    const csvContent = [header, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "confirmacoes-bodas-de-prata.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <main className={styles.authPage}>
        <section className={styles.authCard}>
          <p className={styles.smallTitle}>Aurelice & Rogerio</p>
          <h1>Painel do Casal</h1>

          <form onSubmit={handleLogin} className={styles.authForm}>
            <div className={styles.inputWrap}>
              <input
                id="senha"
                type="password"
                placeholder=" "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label htmlFor="senha">Senha de acesso</label>
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}

            <button type="submit">Entrar</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.panelPage}>
      <section className={styles.panelCard}>
        <div className={styles.headerArea}>
          <div>
            <h1>Painel de Confirmações</h1>
            <p>Total de confirmações: {total}</p>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={exportCsv} disabled={!total}>
              Exportar CSV
            </button>
            <button type="button" className={styles.logout} onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>

        {total === 0 ? (
          <p className={styles.empty}>Nenhuma presença confirmada ainda.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Data e Hora</th>
                </tr>
              </thead>
              <tbody>
                {confirmacoes.map((item) => (
                  <tr key={`${item.nome}-${item.cpf}-${item.dataHora}`}>
                    <td>{item.nome}</td>
                    <td>{formatCpf(item.cpf)}</td>
                    <td>{formatDate(item.dataHora)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}