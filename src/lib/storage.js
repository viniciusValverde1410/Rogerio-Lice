import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "confirmacoes.json");

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function readJson() {
  try {
    ensureDir();
    const txt = fs.readFileSync(JSON_FILE, "utf8");
    return JSON.parse(txt || "[]");
  } catch (e) {
    return [];
  }
}

function writeJson(items) {
  ensureDir();
  fs.writeFileSync(JSON_FILE, JSON.stringify(items, null, 2));
}

// Try to use SQLite (better-sqlite3) if available
let usingSqlite = false;
let sqliteImpl = null;
try {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const Database = require("better-sqlite3");
  const DB_FILE = path.join(DATA_DIR, "confirmacoes.db");
  ensureDir();
  const db = new Database(DB_FILE);
  db.pragma("journal_mode = WAL");
  db.exec(
    `CREATE TABLE IF NOT EXISTS confirmacoes (cpf TEXT PRIMARY KEY, nome TEXT NOT NULL, dataHora TEXT NOT NULL);`,
  );

  sqliteImpl = {
    getAll: () =>
      db
        .prepare(
          "SELECT nome, cpf, dataHora FROM confirmacoes ORDER BY dataHora DESC",
        )
        .all(),
    add: ({ nome, cpf, dataHora }) =>
      db
        .prepare(
          "INSERT INTO confirmacoes (cpf, nome, dataHora) VALUES (?, ?, ?)",
        )
        .run(cpf, nome, dataHora),
    delete: (cpf) =>
      db.prepare("DELETE FROM confirmacoes WHERE cpf = ?").run(cpf).changes > 0,
  };
  usingSqlite = true;
} catch (e) {
  // better-sqlite3 not available — fall back to JSON
  usingSqlite = false;
}

export function getAll() {
  if (usingSqlite && sqliteImpl) return sqliteImpl.getAll();
  return readJson();
}

export function add(item) {
  if (usingSqlite && sqliteImpl) return sqliteImpl.add(item);
  const items = readJson();
  const exists = items.some((i) => i.cpf === item.cpf);
  if (exists) {
    const err = new Error("exists");
    err.code = "EXISTS";
    throw err;
  }
  items.push(item);
  writeJson(items);
  return item;
}

export function remove(cpf) {
  if (usingSqlite && sqliteImpl) return sqliteImpl.delete(cpf);
  const items = readJson();
  const filtered = items.filter((i) => i.cpf !== cpf);
  const changed = filtered.length !== items.length;
  if (changed) writeJson(filtered);
  return changed;
}

export function storageInfo() {
  return { usingSqlite };
}
