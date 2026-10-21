import type { Metadata } from "next";
import { horarios } from "@/data/mock";

export const metadata: Metadata = { title: "Horários" };

const coresStatus = {
  "no horário": "bg-lime-100 text-lime-900",
  atrasado: "bg-amber-100 text-amber-900",
  concluído: "bg-slate-100 text-slate-700",
};

export default function HorariosPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Horários de coleta</h1><p className="mt-2 text-slate-600">Confira a previsão atual por região.</p></div>
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[600px] text-left"><caption className="sr-only">Horários previstos de coleta por região</caption><thead className="bg-slate-50 text-sm text-brand-petroleo"><tr><th scope="col" className="px-5 py-4">Região</th><th scope="col" className="px-5 py-4">Dia</th><th scope="col" className="px-5 py-4">Previsto</th><th scope="col" className="px-5 py-4">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{horarios.map((horario) => <tr key={horario.regiao}><td className="px-5 py-4 font-semibold">{horario.regiao}</td><td className="px-5 py-4">{horario.dia}</td><td className="px-5 py-4">{horario.previsto}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${coresStatus[horario.status]}`}>{horario.status}</span></td></tr>)}</tbody></table></div>
  </div>;
}