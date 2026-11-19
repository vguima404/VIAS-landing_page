/**
 * DADOS SIMULADOS do Painel do gestor (/painel).
 *
 * Nenhum número aqui vem de uma consulta real ao CNES: são valores de
 * demonstração, coerentes entre si (os totais fecham), usados para mostrar
 * como o painel funciona. A página avisa isso em destaque ("Dados simulados").
 * Os valores da Visão geral são os da imagem de referência.
 */

/** Total de unidades do recorte simulado */
export const TOTAL_UNIDADES = 1092;

export const visaoGeral = {
  unidades: TOTAL_UNIDADES,
  atendemSus: 658,
  naoAtendemSus: 434,
  semCoordenadas: 0,
  periodo: { inicio: "01/01/2024", fim: "31/12/2024" },
  consultadoEm: "19/11/2026 às 19:30",
  porTipo: [
    { tipo: "Centro de saúde / Unidade básica", curto: "UBS", valor: 548 },
    { tipo: "Policlínica", curto: "Policlínica", valor: 314 },
    { tipo: "Hospital geral", curto: "Hospital", valor: 165 },
    { tipo: "Pronto atendimento", curto: "Pronto atend.", valor: 65 },
  ],
} as const;

/** Ícones dos serviços (components/painel/servicos/servicos-icons.tsx) */
export type ServicoIcone =
  | "ecg"
  | "laboratorio"
  | "clinica"
  | "vacina"
  | "pediatria"
  | "ultrassom"
  | "dermatologia"
  | "mamografia"
  | "ressonancia";

/**
 * Serviços e bairros: quantas unidades oferecem cada serviço (valores da
 * referência 11, simulados). Cada unidade pode oferecer vários serviços.
 */
export const servicos: { nome: string; unidades: number; icone: ServicoIcone }[] = [
  { nome: "Eletrocardiograma (ECG)", unidades: 723, icone: "ecg" },
  { nome: "Exames de laboratório (coleta)", unidades: 622, icone: "laboratorio" },
  { nome: "Clínica médica", unidades: 598, icone: "clinica" },
  { nome: "Vacinação", unidades: 573, icone: "vacina" },
  { nome: "Pediatria", unidades: 390, icone: "pediatria" },
  { nome: "Ultrassonografia", unidades: 255, icone: "ultrassom" },
  { nome: "Dermatologia", unidades: 113, icone: "dermatologia" },
  { nome: "Mamografia", unidades: 79, icone: "mamografia" },
  { nome: "Ressonância magnética", unidades: 67, icone: "ressonancia" },
];

/** Bairros com mais unidades cadastradas (simulado, referência 11) */
export const bairros = [
  { nome: "Lapa", unidades: 40 },
  { nome: "Bela Vista", unidades: 38 },
  { nome: "Pinheiros", unidades: 36 },
  { nome: "Santana", unidades: 34 },
  { nome: "Mooca", unidades: 32 },
  { nome: "Vila Mariana", unidades: 31 },
  { nome: "Santo Amaro", unidades: 29 },
  { nome: "Tatuapé", unidades: 27 },
  { nome: "Itaquera", unidades: 25 },
  { nome: "Cerqueira César", unidades: 24 },
] as const;

/** Formata no padrão brasileiro (1.092) */
export const formatar = (n: number) => n.toLocaleString("pt-BR");

/** Porcentagem inteira (60%) */
export const pct = (parte: number, total: number) => Math.round((parte / total) * 100);
