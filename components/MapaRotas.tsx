"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { rotas, type PontoRota } from "@/data/mock";

const iconeCaminhao = L.divIcon({
  className: "",
  html: '<span style="display:flex;width:34px;height:34px;align-items:center;justify-content:center;border:2px solid white;border-radius:9999px;background:#4E9D47;color:white;font-size:19px;box-shadow:0 2px 8px #0005" aria-label="Caminhão de coleta">🚚</span>',
  iconSize: [34, 34], iconAnchor: [17, 17],
});

function posicaoNaRota(pontos: PontoRota[], fase: number): PontoRota {
  const trechos = pontos.length - 1;
  const percurso = fase * trechos;
  const trecho = Math.min(Math.floor(percurso), trechos - 1);
  const fracao = percurso - trecho;
  const inicio = pontos[trecho];
  const fim = pontos[trecho + 1];
  return [inicio[0] + (fim[0] - inicio[0]) * fracao, inicio[1] + (fim[1] - inicio[1]) * fracao];
}

export default function MapaRotas() {
  const inicioSimulacao = useMemo(() => Date.now(), []);
  const [agora, setAgora] = useState(inicioSimulacao);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(inicioSimulacao);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const momento = Date.now();
      setAgora(momento);
      if (momento - ultimaAtualizacao >= 4000) setUltimaAtualizacao(momento);
    }, 250);
    return () => window.clearInterval(timer);
  }, [ultimaAtualizacao]);

  const centro: PontoRota = [-23.555, -46.635];
  return <div className="space-y-5">
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <MapContainer center={centro} zoom={13} scrollWheelZoom className="h-[420px] w-full sm:h-[520px]" aria-label="Mapa das rotas de coleta">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {rotas.map((rota, indice) => {
          const fase = ((agora - inicioSimulacao) / 12000 + indice / rotas.length) % 1;
          return <span key={rota.id}><Polyline positions={rota.pontos} pathOptions={{ color: rota.cor, weight: 5, opacity: 0.8 }} /><Marker position={posicaoNaRota(rota.pontos, fase)} icon={iconeCaminhao} /></span>;
        })}
      </MapContainer>
    </div>
    <p role="status" className="text-sm text-slate-600">Atualizado há {Math.max(0, Math.floor((agora - ultimaAtualizacao) / 1000))} s</p>
    <section aria-labelledby="legenda-titulo" className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 id="legenda-titulo" className="mb-4 text-lg font-bold text-brand-petroleo">Rotas em acompanhamento</h2>
      <ul className="grid gap-3 sm:grid-cols-3">{rotas.map((rota) => <li key={rota.id} className="flex items-center gap-3 text-sm"><span className="h-1 w-8 rounded" style={{ backgroundColor: rota.cor }} aria-hidden="true" /><span><strong>{rota.nome}</strong><span className="block text-slate-600">{rota.dia} às {rota.horario}</span></span></li>)}</ul>
    </section>
  </div>;
}