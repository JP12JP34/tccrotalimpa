import type { Metadata } from "next";
import MapaCliente from "@/components/MapaCliente";

export const metadata: Metadata = { title: "Mapa de rotas" };

export default function MapaPage() {
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold text-brand-petroleo">Mapa de rotas</h1><p className="mt-2 text-slate-600">Acompanhe a posição dos caminhões em tempo quase real.</p></div><MapaCliente /></div>;
}