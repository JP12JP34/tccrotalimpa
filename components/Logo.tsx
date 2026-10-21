"use client";

import Image from "next/image";
import { useState } from "react";

type LogoProps = { className?: string };

export default function Logo({ className = "h-12 w-auto" }: LogoProps) {
  const [imagemIndisponivel, setImagemIndisponivel] = useState(false);
  if (imagemIndisponivel) {
    return <span className={`inline-flex items-center font-bold tracking-tight text-brand-petroleo ${className}`} aria-label="Rota Limpa"><span className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-xl text-white">↻</span>Rota Limpa</span>;
  }
  return <Image src="/logo-rota-limpa.png" alt="Rota Limpa" width={240} height={96} className={className} priority onError={() => setImagemIndisponivel(true)} />;
}