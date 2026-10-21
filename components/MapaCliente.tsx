"use client";

import dynamic from "next/dynamic";
import Estado from "@/components/Estado";

const MapaRotas = dynamic(() => import("@/components/MapaRotas"), {
  ssr: false,
  loading: () => <Estado tipo="carregando" mensagem="Carregando o mapa de rotas…" />,
});

export default function MapaCliente() {
  return <MapaRotas />;
}