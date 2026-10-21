type EstadoProps = { tipo: "carregando" | "vazio" | "erro"; mensagem: string };

export default function Estado({ tipo, mensagem }: EstadoProps) {
  if (tipo === "carregando") {
    return <div role="status" className="flex items-center gap-3 rounded-xl bg-white p-5 text-brand-texto shadow-sm"><span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />{mensagem}</div>;
  }
  if (tipo === "erro") {
    return <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">{mensagem}</div>;
  }
  return <div role="status" className="rounded-xl bg-white p-5 text-brand-texto shadow-sm">{mensagem}</div>;
}