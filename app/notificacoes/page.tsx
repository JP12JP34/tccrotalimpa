"use client";

import { useState } from "react";
import Estado from "@/components/Estado";
import { notificacoes as dadosNotificacoes } from "@/data/mock";

export default function NotificacoesPage() {
  const [somenteNaoLidas, setSomenteNaoLidas] = useState(false);
  const [lidas, setLidas] = useState<string[]>([]);
  const notificacoes = dadosNotificacoes.map((item) => ({ ...item, lida: item.lida || lidas.includes(item.id) })).filter((item) => !somenteNaoLidas || !item.lida);
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Notificações</h1><p className="mt-2 text-slate-600">Atualizações úteis sobre serviços e coleta.</p></div>
    <label className="inline-flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium shadow-sm"><input type="checkbox" className="h-4 w-4 accent-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" checked={somenteNaoLidas} onChange={(event) => setSomenteNaoLidas(event.target.checked)} />Mostrar somente não lidas</label>
    {notificacoes.length === 0 ? <Estado tipo="vazio" mensagem="Não há notificações para mostrar." /> : <ul className="space-y-3">{notificacoes.map((item) => <li key={item.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${item.lida ? "border-slate-200" : "border-l-4 border-l-brand-green border-y-slate-200 border-r-slate-200"}`}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-bold uppercase tracking-wide text-brand-green">{item.tipo}</span>{!item.lida && <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-brand-green">Não lida</span>}</div><p className="mt-2 font-medium text-brand-texto">{item.texto}</p><p className="mt-2 text-xs text-slate-500">{item.data}</p></div>{!item.lida && <button type="button" onClick={() => setLidas((atuais) => [...atuais, item.id])} className="self-start rounded-lg border border-brand-green px-3 py-2 text-sm font-semibold text-brand-green hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">Marcar como lida</button>}</div></li>)}</ul>}
  </div>;
}