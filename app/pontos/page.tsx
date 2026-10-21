"use client";

import { useMemo, useState } from "react";
import Estado from "@/components/Estado";
import { pontosColeta } from "@/data/mock";
import { campo } from "@/lib/estilos";

export default function PontosPage() {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("Todos");
  const tipos = ["Todos", ...Array.from(new Set(pontosColeta.map((ponto) => ponto.tipo)))];
  const filtrados = useMemo(() => pontosColeta.filter((ponto) =>
    (tipo === "Todos" || ponto.tipo === tipo) && `${ponto.nome} ${ponto.endereco}`.toLocaleLowerCase("pt-BR").includes(busca.toLocaleLowerCase("pt-BR"))), [busca, tipo]);

  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold text-brand-petroleo">Pontos de coleta</h1><p className="mt-2 text-slate-600">Encontre locais para descartar diferentes tipos de resíduos.</p></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="busca-ponto" className="mb-1.5 block text-sm font-semibold">Buscar por nome ou endereço</label><input id="busca-ponto" className={campo} value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Ex.: Centro" /></div><div><label htmlFor="tipo-ponto" className="mb-1.5 block text-sm font-semibold">Tipo de ponto</label><select id="tipo-ponto" className={campo} value={tipo} onChange={(event) => setTipo(event.target.value)}>{tipos.map((opcao) => <option key={opcao}>{opcao}</option>)}</select></div></div>
    {filtrados.length === 0 ? <Estado tipo="vazio" mensagem="Nenhum ponto de coleta corresponde à busca." /> : <ul className="grid gap-4 md:grid-cols-2">{filtrados.map((ponto) => <li key={ponto.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-brand-green">{ponto.tipo}</span><h2 className="mt-3 text-lg font-bold text-brand-petroleo">{ponto.nome}</h2><p className="mt-2 text-sm text-slate-600">{ponto.endereco}</p><p className="mt-3 text-sm"><strong>Funcionamento:</strong> {ponto.funcionamento}</p></li>)}</ul>}
  </div>;
}