export type PontoRota = [number, number];

export type Rota = {
  id: string;
  nome: string;
  dia: string;
  cor: string;
  cepPrefixos: string[];
  horario: string;
  residuos: string[];
  pontos: PontoRota[];
};

export const rotas: Rota[] = [
  {
    id: "zona-norte",
    nome: "Zona Norte",
    dia: "segunda-feira",
    cor: "#0F3D4A",
    cepPrefixos: ["01", "02"],
    horario: "07:00",
    residuos: ["Orgânicos", "Papel e papelão", "Plástico", "Vidro", "Metal"],
    pontos: [[-23.535, -46.625], [-23.542, -46.637], [-23.55, -46.63], [-23.558, -46.62]],
  },
  {
    id: "centro",
    nome: "Centro",
    dia: "quarta-feira",
    cor: "#4E9D47",
    cepPrefixos: ["03", "04", "05"],
    horario: "06:30",
    residuos: ["Orgânicos", "Papel e papelão", "Plástico", "Vidro", "Metal", "Óleo de cozinha"],
    pontos: [[-23.545, -46.65], [-23.55, -46.64], [-23.555, -46.63], [-23.56, -46.62]],
  },
  {
    id: "zona-sul",
    nome: "Zona Sul",
    dia: "sexta-feira",
    cor: "#7AB958",
    cepPrefixos: ["06", "07", "08", "09", "99"],
    horario: "08:00",
    residuos: ["Orgânicos", "Papel e papelão", "Plástico", "Eletrônicos", "Pilhas e baterias"],
    pontos: [[-23.56, -46.645], [-23.567, -46.636], [-23.575, -46.628], [-23.582, -46.62]],
  },
];

export const pontosColeta = [
  { id: "ponto-1", nome: "Ponto Verde Central", tipo: "Recicláveis", endereco: "Praça da República, 120 — Centro", funcionamento: "Segunda a sábado, das 8h às 18h" },
  { id: "ponto-2", nome: "Ecoponto Vila Nova", tipo: "Volumosos", endereco: "Rua das Palmeiras, 540 — Zona Norte", funcionamento: "Segunda a sábado, das 8h às 17h" },
  { id: "ponto-3", nome: "Ponto de Eletrônicos Sul", tipo: "Eletrônicos", endereco: "Avenida do Parque, 85 — Zona Sul", funcionamento: "Terça a domingo, das 9h às 16h" },
];

export const horarios = [
  { regiao: "Zona Norte", dia: "Segunda-feira", previsto: "07:00", status: "no horário" as const },
  { regiao: "Centro", dia: "Quarta-feira", previsto: "06:30", status: "atrasado" as const },
  { regiao: "Zona Sul", dia: "Sexta-feira", previsto: "08:00", status: "concluído" as const },
];

export const notificacoes = [
  { id: "aviso-1", tipo: "Rota", texto: "A coleta da Zona Norte está prevista para segunda-feira às 07:00.", data: "Hoje, 06:30", lida: false },
  { id: "aviso-2", tipo: "Ponto de coleta", texto: "O Ponto Verde Central funciona até as 18h neste sábado.", data: "Ontem, 14:15", lida: false },
  { id: "aviso-3", tipo: "Orientação", texto: "Lembre-se de higienizar e separar as embalagens recicláveis.", data: "18/10/2026", lida: true },
];

export const residuos = [
  { id: "organico", nome: "Orgânico", comoDescartar: "Acondicione restos de alimentos em recipiente fechado. Sempre que possível, encaminhe resíduos orgânicos para compostagem." },
  { id: "papel", nome: "Papel e papelão", comoDescartar: "Mantenha secos, desmonte as caixas e coloque em uma embalagem limpa para a coleta seletiva." },
  { id: "plastico", nome: "Plástico", comoDescartar: "Esvazie as embalagens, retire o excesso de resíduos e, se possível, compacte antes de separar." },
  { id: "vidro", nome: "Vidro", comoDescartar: "Embale peças quebradas com segurança e identifique o conteúdo. Garrafas e potes devem estar vazios." },
  { id: "metal", nome: "Metal", comoDescartar: "Esvazie latas e embalagens metálicas e encaminhe-as limpas para a coleta seletiva." },
  { id: "eletronico", nome: "Eletrônico", comoDescartar: "Leve aparelhos e acessórios sem uso a um ponto de recebimento de resíduos eletrônicos." },
  { id: "pilhas", nome: "Pilhas e baterias", comoDescartar: "Guarde em recipiente seco e leve a coletores específicos. Não descarte no lixo comum." },
  { id: "oleo", nome: "Óleo de cozinha", comoDescartar: "Após esfriar, armazene em garrafa bem fechada e leve a um ponto de coleta apropriado." },
];

export const historico = [
  { data: "20/10/2026", horario: "07:18", rota: "Zona Norte", residuo: "Recicláveis", status: "Coletado" },
  { data: "16/10/2026", horario: "08:12", rota: "Zona Sul", residuo: "Orgânicos", status: "Coletado" },
  { data: "14/10/2026", horario: "06:42", rota: "Centro", residuo: "Recicláveis", status: "Coletado" },
  { data: "12/10/2026", horario: "07:05", rota: "Zona Norte", residuo: "Orgânicos", status: "Coletado" },
  { data: "09/10/2026", horario: "08:24", rota: "Zona Sul", residuo: "Recicláveis", status: "Coletado" },
];