"use client";

import { useEffect, useState, type FormEvent } from "react";
import Estado from "@/components/Estado";
import { useToast } from "@/components/ToastProvider";
import { botaoPrimario, campo } from "@/lib/estilos";
import { mascaraTelefone } from "@/lib/mascaras";

type TipoEnvio = "reclamação" | "dúvida" | "sugestão";
type Envio = { id: string; nome: string; email: string; tipo: TipoEnvio; endereco: string; telefone: string; mensagem: string; data: string };
type Campos = Omit<Envio, "id" | "data">;
type CampoComErro = keyof Campos;
type Erros = Partial<Record<CampoComErro, string>>;
const armazenamento = "rota-limpa-reclamacoes";
const camposIniciais: Campos = { nome: "", email: "", tipo: "reclamação", endereco: "", telefone: "", mensagem: "" };

export default function ReclamacoesPage() {
  const [campos, setCampos] = useState<Campos>(camposIniciais);
  const [erros, setErros] = useState<Erros>({});
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(armazenamento);
      if (salvo) {
        const parseado: unknown = JSON.parse(salvo);
        if (Array.isArray(parseado)) setEnvios(parseado as Envio[]);
      }
    } catch {
      toast("Não foi possível carregar o histórico salvo.", "error");
    } finally {
      setCarregando(false);
    }
  }, [toast]);

  function validar(): Erros {
    const novosErros: Erros = {};
    if (campos.nome.trim().length < 3) novosErros.nome = "Informe um nome com pelo menos 3 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.trim())) novosErros.email = "Informe um e-mail válido.";
    if (campos.endereco.trim().length < 5) novosErros.endereco = "Informe um endereço com pelo menos 5 caracteres.";
    const digitosTelefone = campos.telefone.replace(/\D/g, "");
    if (digitosTelefone && digitosTelefone.length !== 10 && digitosTelefone.length !== 11) novosErros.telefone = "Informe o telefone completo com DDD.";
    if (campos.mensagem.trim().length < 10) novosErros.mensagem = "A mensagem deve ter pelo menos 10 caracteres.";
    return novosErros;
  }

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length) {
      toast("Revise os campos destacados antes de enviar.", "error");
      return;
    }
    try {
      const novoEnvio: Envio = { ...campos, id: `${Date.now()}`, data: new Date().toLocaleString("pt-BR") };
      const atualizados = [novoEnvio, ...envios];
      window.localStorage.setItem(armazenamento, JSON.stringify(atualizados));
      setEnvios(atualizados);
      setCampos(camposIniciais);
      setErros({});
      toast("Mensagem enviada com sucesso.");
    } catch {
      toast("Não foi possível salvar sua mensagem neste dispositivo.", "error");
    }
  }

  function atualizar<K extends CampoComErro>(chave: K, valor: Campos[K]) {
    setCampos((atuais) => ({ ...atuais, [chave]: valor }));
    setErros((atuais) => ({ ...atuais, [chave]: undefined }));
  }

  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Reclamações e sugestões</h1><p className="mt-2 text-slate-600">Envie uma mensagem sobre os serviços de coleta.</p></div>
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <form onSubmit={enviar} noValidate className="space-y-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div><label htmlFor="nome" className="mb-1.5 block text-sm font-semibold">Nome</label><input id="nome" autoComplete="name" className={campo} value={campos.nome} onChange={(event) => atualizar("nome", event.target.value)} />{erros.nome && <p role="alert" className="mt-1 text-sm text-red-700">{erros.nome}</p>}</div>
        <div><label htmlFor="email" className="mb-1.5 block text-sm font-semibold">E-mail</label><input id="email" type="email" autoComplete="email" className={campo} value={campos.email} onChange={(event) => atualizar("email", event.target.value)} />{erros.email && <p role="alert" className="mt-1 text-sm text-red-700">{erros.email}</p>}</div>
        <div><label htmlFor="tipo" className="mb-1.5 block text-sm font-semibold">Tipo de mensagem</label><select id="tipo" className={campo} value={campos.tipo} onChange={(event) => atualizar("tipo", event.target.value as TipoEnvio)}><option value="reclamação">Reclamação</option><option value="dúvida">Dúvida</option><option value="sugestão">Sugestão</option></select></div>
        <div><label htmlFor="endereco" className="mb-1.5 block text-sm font-semibold">Endereço</label><input id="endereco" autoComplete="street-address" className={campo} value={campos.endereco} onChange={(event) => atualizar("endereco", event.target.value)} />{erros.endereco && <p role="alert" className="mt-1 text-sm text-red-700">{erros.endereco}</p>}</div>
        <div><label htmlFor="telefone" className="mb-1.5 block text-sm font-semibold">Telefone <span className="font-normal text-slate-500">(opcional)</span></label><input id="telefone" type="tel" autoComplete="tel" className={campo} value={campos.telefone} onChange={(event) => atualizar("telefone", mascaraTelefone(event.target.value))} placeholder="(00) 00000-0000" />{erros.telefone && <p role="alert" className="mt-1 text-sm text-red-700">{erros.telefone}</p>}</div>
        <div><label htmlFor="mensagem" className="mb-1.5 block text-sm font-semibold">Mensagem</label><textarea id="mensagem" rows={5} maxLength={500} className={campo} value={campos.mensagem} onChange={(event) => atualizar("mensagem", event.target.value)} />{erros.mensagem && <p role="alert" className="mt-1 text-sm text-red-700">{erros.mensagem}</p>}<p className="mt-1 text-right text-xs text-slate-500">{campos.mensagem.length}/500 caracteres</p></div>
        <button type="submit" className={botaoPrimario}>Enviar mensagem</button>
      </form>
      <section aria-labelledby="historico-envios"><h2 id="historico-envios" className="mb-4 text-xl font-bold text-brand-petroleo">Mensagens neste dispositivo</h2>
        {carregando ? <Estado tipo="carregando" mensagem="Carregando mensagens salvas…" /> : envios.length === 0 ? <Estado tipo="vazio" mensagem="Nenhuma mensagem enviada até o momento." /> : <ul className="space-y-3">{envios.map((envio) => <li key={envio.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-2"><strong className="capitalize text-brand-petroleo">{envio.tipo}</strong><time className="text-xs text-slate-500">{envio.data}</time></div><p className="mt-2 text-sm text-slate-700">{envio.mensagem}</p><p className="mt-2 text-xs text-slate-500">{envio.nome} · {envio.endereco}</p></li>)}</ul>}
      </section>
    </div>
  </div>;
}