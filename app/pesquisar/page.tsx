"use client";

import { useState, type FormEvent } from "react";
import Estado from "@/components/Estado";
import { rotas, type Rota } from "@/data/mock";
import { useToast } from "@/components/ToastProvider";
import { campo, botaoPrimario } from "@/lib/estilos";
import { mascaraCep } from "@/lib/mascaras";

type Resultado = { tipo: "inicial" } | { tipo: "carregando" } | { tipo: "erro" } | { tipo: "vazio" } | { tipo: "rota"; rota: Rota };

export default function PesquisarPage() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erroFormulario, setErroFormulario] = useState("");
  const [resultado, setResultado] = useState<Resultado>({ tipo: "inicial" });
  const { toast } = useToast();

  async function consultar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      setErroFormulario("Informe um CEP válido no formato 00000-000.");
      return;
    }
    if (endereco.trim().length < 5) {
      setErroFormulario("Informe um endereço com pelo menos 5 caracteres.");
      return;
    }
    setErroFormulario("");
    setResultado({ tipo: "carregando" });
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    const prefixo = cep.slice(0, 2);
    if (prefixo === "99") {
      setResultado({ tipo: "erro" });
      return;
    }
    const rota = rotas.find((item) => item.cepPrefixos.includes(prefixo));
    if (rota) {
      setResultado({ tipo: "rota", rota });
      toast(`Endereço localizado na rota ${rota.nome}.`);
    } else {
      setResultado({ tipo: "vazio" });
    }
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Pesquisar endereço</h1><p className="mt-2 text-slate-600">Consulte a rota de coleta que atende sua região.</p></div>
    <form onSubmit={consultar} className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
      <div><label htmlFor="cep" className="mb-1.5 block text-sm font-semibold">CEP</label><input id="cep" inputMode="numeric" autoComplete="postal-code" className={campo} value={cep} onChange={(event) => setCep(mascaraCep(event.target.value))} placeholder="00000-000" aria-describedby={erroFormulario ? "erro-pesquisa" : undefined} /></div>
      <div><label htmlFor="endereco" className="mb-1.5 block text-sm font-semibold">Endereço</label><input id="endereco" autoComplete="street-address" className={campo} value={endereco} onChange={(event) => setEndereco(event.target.value)} placeholder="Rua, avenida e número" /></div>
      {erroFormulario && <p id="erro-pesquisa" role="alert" className="text-sm text-red-700 sm:col-span-2">{erroFormulario}</p>}
      <div className="sm:col-span-2"><button className={botaoPrimario} type="submit">Consultar rota</button></div>
    </form>
    <section aria-live="polite" aria-atomic="true" className="min-h-10">
      {resultado.tipo === "carregando" && <Estado tipo="carregando" mensagem="Consultando a cobertura do endereço…" />}
      {resultado.tipo === "erro" && <Estado tipo="erro" mensagem="Não foi possível consultar este CEP no momento. Confira os dados e tente novamente." />}
      {resultado.tipo === "vazio" && <Estado tipo="vazio" mensagem="Não encontramos uma rota para esse CEP." />}
      {resultado.tipo === "rota" && <article className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm"><span className="text-sm font-semibold text-brand-green">Rota disponível</span><h2 className="mt-2 text-2xl font-bold text-brand-petroleo">{resultado.rota.nome}</h2><dl className="mt-4 grid gap-3 sm:grid-cols-2"><div><dt className="text-sm text-slate-500">Dia da coleta</dt><dd className="font-semibold capitalize">{resultado.rota.dia}</dd></div><div><dt className="text-sm text-slate-500">Horário previsto</dt><dd className="font-semibold">{resultado.rota.horario}</dd></div><div className="sm:col-span-2"><dt className="text-sm text-slate-500">Resíduos atendidos</dt><dd className="mt-1">{resultado.rota.residuos.join(", ")}</dd></div></dl></article>}
    </section>
  </div>;
}