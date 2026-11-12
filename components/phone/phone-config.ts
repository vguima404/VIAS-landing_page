/**
 * Configuração do iPhone 3D (Etapa 3).
 * Modelo: "Iphone 14 Pro" por mister dude (Sketchfab), CC BY 4.0 — modificado.
 */

export const PHONE_MODEL_URL = "/models/vias-iphone.glb";

/** Nome do material da tela no .glb (primitiva separada, UV 0..1 no canal 0) */
export const SCREEN_MATERIAL = "VIAS_Display";
/** Material do corpo (vem com alphaMode BLEND do original; corrigido em runtime) */
export const BODY_MATERIAL = "iPhone_Corpo";

export const screens = {
  "ui-01": {
    texture: "/screens/ui-01.webp",
    alt: "iPhone com o app VIAS na etapa 1 de 3, Necessidade: busca por Mamografia, atendimento pelo SUS e o botão Buscar unidades.",
  },
  "ui-02": {
    texture: "/screens/ui-02.webp",
    alt: "iPhone com o app VIAS na etapa 2 de 3, Unidade: Unidade demonstrativa com mamógrafo cadastrado, fonte CNES. Demonstração, dados ilustrativos.",
  },
  "ui-03": {
    texture: "/screens/ui-03.webp",
    alt: "iPhone com o app VIAS na etapa 3 de 3, Percurso: 28 minutos de ônibus mais caminhada até a Unidade demonstrativa. Demonstração, dados ilustrativos.",
  },
  "ui-04": {
    texture: "/screens/ui-04.webp",
    alt: "iPhone com o app VIAS mostrando a acessibilidade no percurso: trechos não informados, parcial e informado. Demonstração, dados ilustrativos.",
  },
  /** Prévia do percurso (referência 04): mapa com a rota, o tempo e o meio de transporte */
  "ui-03-previa": {
    texture: "/screens/ui-03-previa.webp",
    alt: "iPhone com o app VIAS mostrando a prévia do percurso no mapa: 15 minutos via transporte público, 1,2 km.",
  },
} as const;

export type ScreenId = keyof typeof screens;
export const screenIds = Object.keys(screens) as ScreenId[];

/** Altura do aparelho em unidades de cena */
export const PHONE_HEIGHT = 2.1;

export type Vec3 = [number, number, number];
export type Pose = { rx: number; ry: number; rz: number };

export type StageConfig = {
  /** Classe de proporção do palco (largura / altura). Poster e View usam a mesma. */
  aspectClass: string;
  /** Câmera quase frontal, levemente acima para a sombra de contato aparecer */
  camera: { fov: number; position: Vec3; target: Vec3 };
  /** Pose de repouso (radianos) */
  pose: Pose;
  /** Prefixo dos posters deste palco em /public/posters */
  posterPrefix: string;
  /** Tamanho dos posters em px (mesma proporção do palco) */
  posterSize: [number, number];
  /**
   * Margem desenhada além do palco, por lado (fração da largura/altura).
   * Padrão: 15% em todos os lados. Zero onde o aparelho deve ser cortado
   * pela borda do palco (ex.: borda inferior da seção).
   */
  bleed?: Bleed;
};

export type Bleed = { top: number; right: number; bottom: number; left: number };
export const DEFAULT_BLEED: Bleed = { top: 0.15, right: 0.15, bottom: 0.15, left: 0.15 };

/**
 * Palcos do iPhone. Cada um reproduz o enquadramento de uma referência.
 * - default: genérico (3:5), poucos graus de rotação lateral
 * - hero:    referência 02 — aparelho grande, inclinado para trás e para a
 *            direita, mostrando a lateral direita (silhueta medida na imagem)
 */
export const stages = {
  default: {
    aspectClass: "aspect-[3/5]",
    camera: { fov: 20, position: [0, 0.42, 7.4], target: [0, -0.04, 0] },
    pose: { rx: 0.035, ry: -0.2, rz: 0 },
    posterPrefix: "phone",
    posterSize: [900, 1500],
  },
  hero: {
    aspectClass: "aspect-[620/810]",
    // Ajustado por medição contra a silhueta do aparelho na referência 02
    // (erro médio ≈ 9,5u nas bordas): câmera próxima e grande-angular para o
    // topo afunilar, inclinado para trás e para a direita
    camera: { fov: 62, position: [0, 0.2, 1.95], target: [0, -0.02, 0] },
    pose: { rx: -0.36, ry: -0.45, rz: 0.25 },
    posterPrefix: "phone-hero",
    posterSize: [930, 1215],
  },
  /**
   * como: referência 04 — aparelho grande, inclinado para trás e girado para a
   * direita, cortado pela borda inferior da seção. O palco é a área visível
   * (x 1100–1672, y 500–941 da referência); sem margem embaixo, para o
   * aparelho terminar exatamente na borda da seção.
   */
  como: {
    aspectClass: "aspect-[572/441]",
    // Ajustado por medição contra as bordas da tela do aparelho na
    // referência 04 (erro médio ≈ 10u) e contra o escorço do conteúdo da tela:
    // câmera abaixo do aparelho, que está inclinado para trás e girado para a direita
    camera: { fov: 27.53, position: [0, -1.232, 2.768], target: [0.027, -0.004, 0] },
    pose: { rx: -0.467, ry: -0.051, rz: 0.206 },
    posterPrefix: "phone-como",
    posterSize: [1144, 882],
    bleed: { top: 0.15, right: 0, bottom: 0, left: 0.15 },
  },
} satisfies Record<string, StageConfig>;

export type StageId = keyof typeof stages;

export const posterFor = (stage: StageId, screen: ScreenId) =>
  `/posters/${stages[stage].posterPrefix}-${screen}.png`;

/** Amplitude da influência do mouse (radianos) */
export const POINTER_TILT = { rx: 0.05, ry: 0.09 };

/** Duração da troca de tela (s) */
export const SCREEN_TRANSITION = 0.85;
