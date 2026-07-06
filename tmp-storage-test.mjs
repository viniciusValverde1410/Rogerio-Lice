import { add, getAll, remove } from "./src/lib/storage.js";

const cpf = "123.456.789-01";
const payload = { nome: "Teste", cpf, dataHora: new Date().toISOString() };

console.log("before", getAll());
try {
  console.log("add", add(payload));
  console.log("after-add", getAll());
  console.log("remove", remove(cpf));
  console.log("after-remove", getAll());
} catch (error) {
  console.error("error", error?.code, error?.message);
  process.exit(1);
}
