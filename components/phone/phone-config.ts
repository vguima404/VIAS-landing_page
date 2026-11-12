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
    poster: "/posters/phone-ui-01.png",
    alt: "iPhone com o app VIAS na etapa 1 de 3, Necessidade: busca por Mamografia, atendimento pelo SUS e o botão Buscar unidades.",
  },
  "ui-02": {
    texture: "/screens/ui-02.webp",
    poster: "/posters/phone-ui-02.png",
    alt: "iPhone com o app VIAS na etapa 2 de 3, Unidade: Unidade demonstrativa com mamógrafo cadastrado, fonte CNES. Demonstração, dados ilustrativos.",
  },
  "ui-03": {
    texture: "/screens/ui-03.webp",
    poster: "/posters/phone-ui-03.png",
    alt: "iPhone com o app VIAS na etapa 3 de 3, Percurso: 28 minutos de ônibus mais caminhada até a Unidade demonstrativa. Demonstração, dados ilustrativos.",
  },
  "ui-04": {
    texture: "/screens/ui-04.webp",
    poster: "/posters/phone-ui-04.png",
    alt: "iPhone com o app VIAS mostrando a acessibilidade no percurso: trechos não informados, parcial e informado. Demonstração, dados ilustrativos.",
  },
} as const;

export type ScreenId = keyof typeof screens;
export const screenIds = Object.keys(screens) as ScreenId[];

/** Proporção do palco (largura / altura). Poster e View usam a mesma. */
export const STAGE_ASPECT = 3 / 5;

/** Câmera: quase frontal, levemente acima para a sombra de contato aparecer */
export const CAMERA = {
  fov: 20,
  position: [0, 0.42, 7.4] as [number, number, number],
  target: [0, -0.04, 0] as [number, number, number],
};

/** Altura do aparelho em unidades de cena */
export const PHONE_HEIGHT = 2.1;

/** Pose de repouso: poucos graus de rotação lateral (radianos) */
export const BASE_POSE = { rx: 0.035, ry: -0.2, rz: 0 };

/** Amplitude da influência do mouse (radianos) */
export const POINTER_TILT = { rx: 0.05, ry: 0.09 };

/** Duração da troca de tela (s) */
export const SCREEN_TRANSITION = 0.85;
