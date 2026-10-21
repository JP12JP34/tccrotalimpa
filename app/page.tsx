import Link from "next/link";
import { Bell, Clock3, FileText, Map, MapPin, Recycle, Search, Trash2 } from "lucide-react";
import Logo from "@/components/Logo";
import { botaoPrimario } from "@/lib/estilos";

const atalhos = [
  { nome: "Mapa", descricao: "Veja as rotas e os caminhões.", href: "/mapa", Icone: Map },
  { nome: "Pontos", descricao: "Encontre pontos de coleta próximos.", href: "/pontos", Icone: MapPin },
  { nome: "Horários", descricao: "Consulte os horários por região.", href: "/horarios", Icone: Clock3 },
  { nome: "Pesquisar endereço", descricao: "Descubra qual rota atende seu CEP.", href: "/pesquisar", Icone: Search },
  { nome: "Notificações", descricao: "Acompanhe atualizações das rotas.", href: "/notificacoes", Icone: Bell },
  { nome: "Descarte correto", descricao: "Saiba como separar cada resíduo.", href: "/orientacoes", Icone: Recycle },
  { nome: "Reclamações e sugestões", descricao: "Envie uma mensagem para a equipe.", href: "/reclamacoes", Icone: FileText },
  { nome: "Histórico", descricao: "Consulte registros recentes de coleta.", href: "/historico", Icone: Trash2 },
];

export default function Home() {
  return <div className="space-y-12">
    <section className="flex flex-col items-center rounded-3xl bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14">
      <Logo className="h-24 w-auto sm:h-32" />
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">Consulte rotas, horários e pontos de coleta para organizar o descarte de resíduos no seu dia a dia.</p>
      <Link href="/mapa" className={`${botaoPrimario} mt-7`}>Acompanhar rotas <Map aria-hidden="true" size={19} /></Link>
    </section>
    <section aria-labelledby="atalhos-titulo">
      <h1 id="atalhos-titulo" className="mb-5 text-2xl font-bold text-brand-petroleo sm:text-3xl">Como podemos ajudar?</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {atalhos.map(({ nome, descricao, href, Icone }) => <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">
          <span className="mb-4 inline-flex rounded-xl bg-green-50 p-3 text-brand-green"><Icone aria-hidden="true" size={23} /></span>
          <h2 className="font-bold text-brand-petroleo group-hover:text-brand-green">{nome}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{descricao}</p>
        </Link>)}
      </div>
    </section>
  </div>;
}
