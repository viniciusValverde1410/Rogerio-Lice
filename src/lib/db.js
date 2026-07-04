import Database from "better-sqlite3";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "confirmacoes.db");

let db;

function init() {
  if (db) return db;

  // ensure directory exists
  try {
    const fs = require("fs");
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }

  db = new Database(DB_FILE);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS confirmacoes (
      cpf TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      dataHora TEXT NOT NULL
    );
  `);

  return db;
}

export function getAllConfirmacoes() {
  const d = init();
  const stmt = d.prepare(
    "SELECT nome, cpf, dataHora FROM confirmacoes ORDER BY dataHora DESC",
  );
  return stmt.all();
}

export function addConfirmacao({ nome, cpf, dataHora }) {
  const d = init();
  const stmt = d.prepare(
    "INSERT INTO confirmacoes (cpf, nome, dataHora) VALUES (?, ?, ?)",
  );
  return stmt.run(cpf, nome, dataHora);
}

export function deleteConfirmacao(cpf) {
  const d = init();
  const stmt = d.prepare("DELETE FROM confirmacoes WHERE cpf = ?");
  const info = stmt.run(cpf);
  return info.changes > 0;
}
