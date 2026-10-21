"use client";

import { useMemo, useState } from "react";
import Estado from "@/components/Estado";
import { historico } from "@/data/mock";
import { campo } from "@/lib/estilos";

const porPagina = 3;

export default function HistoricoPage() {
  const [regiao, setRegiao] = useState("Todas");
  const [pagina, setPagina] = useState(1);
  const regioes = ["Todas", ...Array.from(new Set(historico.map((registro) => registro.rota)))];
  const filtrados = useMemo(() => historico.filter((registro) => regiao === "Todas" || registro.rota === regiao), [regiao]);
  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const registrosPagina = filtrados.slice((pagina - 1) * porPagina, pagina * porPagina);

  function alterarRegiao(valor: string) {
    setRegiao(valor);
    setPagina(1);
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Histórico de coleta</h1><p className="mt-2 text-slate-600">Consulte os registros recentes por região.</p></div>
    <div className="max-w-sm"><label htmlFor="regiao-historico" className="mb-1.5 block text-sm font-semibold">Região</label><select id="regiao-historico" className={campo} value={regiao} onChange={(event) => alterarRegiao(event.target.value)}>{regioes.map((opcao) => <option key={opcao}>{opcao}</option>)}</select></div>
    {filtrados.length === 0 ? <Estado tipo="vazio" mensagem="Não há registros para esta região." /> : <><div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[650px] text-left"><caption className="sr-only">Registros recentes de coleta</caption><thead className="bg-slate-50 text-sm text-brand-petroleo"><tr>{["Data", "Horário", "Rota", "Resíduo", "Status"].map((titulo) => <th key={titulo} scope="col" className="px-4 py-4">{titulo}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{registrosPagina.map((registro, indice) => <tr key={`${registro.data}-${indice}`}><td className="px-4 py-4">{registro.data}</td><td className="px-4 py-4">{registro.horario}</td><td className="px-4 py-4">{registro.rota}</td><td className="px-4 py-4">{registro.residuo}</td><td className="px-4 py-4"><span className="rounded-full bg-lime-100 px-3 py-1 text-sm font-medium text-lime-900">{registro.status}</span></td></tr>)}</tbody></table></div>
      <nav aria-label="Paginação do histórico" className="flex flex-wrap items-center justify-between gap-3"><button type="button" onClick={() => setPagina((atual) => Math.max(1, atual - 1))} disabled={pagina <= 1} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-brand-petroleo hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:cursor-not-allowed disabled:opacity-50">Anterior</button><p aria-live="polite" className="text-sm text-slate-600">Página {pagina} de {totalPaginas}</p><button type="button" onClick={() => setPagina((atual) => Math.min(totalPaginas, atual + 1))} disabled={pagina >= totalPaginas} className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-brand-petroleo hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:cursor-not-allowed disabled:opacity-50">Próxima</button></nav>
    </>}
  </div>;
}