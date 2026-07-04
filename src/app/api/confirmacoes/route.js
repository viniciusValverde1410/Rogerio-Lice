import { NextResponse } from "next/server";
import { getAll, add, remove, storageInfo } from "@/lib/storage";

export async function GET() {
  try {
    const items = getAll();
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, cpf, dataHora } = body;

    if (!nome || !cpf || !dataHora) {
      return NextResponse.json({ error: "Campos inválidos" }, { status: 400 });
    }

    try {
      add({ nome, cpf, dataHora });
      const info = storageInfo();
      return NextResponse.json(
        { nome, cpf, dataHora, storage: info },
        { status: 201 },
      );
    } catch (e) {
      if (e && e.code === "EXISTS") {
        return NextResponse.json(
          { error: "CPF já confirmado" },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: "CPF já confirmado" }, { status: 409 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { cpf } = body;
    if (!cpf) {
      return NextResponse.json({ error: "CPF obrigatorio" }, { status: 400 });
    }

    const ok = remove(cpf);
    if (ok) return NextResponse.json({ success: true });
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
