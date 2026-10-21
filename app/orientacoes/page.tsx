import type { Metadata } from "next";
import { residuos } from "@/data/mock";

export const metadata: Metadata = { title: "Orientações de descarte" };

export default function OrientacoesPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Orientações de descarte</h1><p className="mt-2 text-slate-600">Confira como separar e encaminhar cada tipo de resíduo.</p></div><div className="space-y-3">{residuos.map((residuo) => <details key={residuo.id} className="group rounded-xl border border-slate-200 bg-white shadow-sm"><summary className="cursor-pointer list-none rounded-xl px-5 py-4 font-semibold text-brand-petroleo marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green group-open:border-b group-open:border-slate-100">{residuo.nome}<span aria-hidden="true" className="float-right text-brand-green">＋</span></summary><p className="px-5 py-4 leading-relaxed text-slate-600">{residuo.comoDescartar}</p></details>)}</div></div>;
}