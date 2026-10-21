"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  ["Início", "/"], ["Mapa de rotas", "/mapa"], ["Pontos de coleta", "/pontos"],
  ["Horários", "/horarios"], ["Pesquisar endereço", "/pesquisar"], ["Notificações", "/notificacoes"],
  ["Orientações de descarte", "/orientacoes"], ["Reclamações", "/reclamacoes"], ["Histórico", "/historico"],
];

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return <header className="relative z-20 border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <Link href="/" aria-label="Rota Limpa — início" onClick={() => setMenuAberto(false)} className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"><Logo className="h-11 w-auto" /></Link>
      <button type="button" className="rounded-lg p-2 text-brand-petroleo hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:hidden" aria-label={menuAberto ? "Fechar menu" : "Abrir menu"} aria-expanded={menuAberto} aria-controls="menu-principal" onClick={() => setMenuAberto((aberto) => !aberto)}>
        {menuAberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="menu-principal" aria-label="Navegação principal" className={`${menuAberto ? "flex" : "hidden"} absolute left-0 right-0 top-full max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-lg lg:static lg:flex lg:max-h-none lg:flex-row lg:flex-wrap lg:justify-end lg:overflow-visible lg:border-0 lg:p-0 lg:shadow-none`}>
        {links.map(([label, href]) => {
          const ativo = pathname === href;
          return <Link key={href} href={href} aria-current={ativo ? "page" : undefined} onClick={() => setMenuAberto(false)} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${ativo ? "bg-brand-petroleo text-white" : "text-brand-texto hover:bg-slate-100 hover:text-brand-petroleo"}`}>{label}</Link>;
        })}
      </nav>
    </div>
  </header>;
}