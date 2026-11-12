/**
 * Tokens de design do VIAS para uso em JavaScript (GSAP, canvas, shaders).
 * Fonte de verdade das cores em CSS: app/globals.css (@theme).
 * Mantenha os dois arquivos sincronizados.
 */

export const colors = {
  pinho: "#123B35",
  rota: "#2D7C60",
  lima: "#D7F36A",
  papel: "#F6F7F1",
  nevoa: "#E9EFE7",
  branco: "#FFFFFF",
  grafite: "#1A2925",
  salvia: "#5B6D66",
  linha: "#D5DED7",
  ardosia: "#486F83",
  informado: "#2F6B4F",
  parcial: "#A45D24",
  naoInformado: "#5B6D66",
} as const;

export type ColorToken = keyof typeof colors;

/** Easings GSAP. Entradas entre 300 e 900 ms (spec §5). */
export const ease = {
  /** Entrada padrão de blocos e cartões */
  out: "power3.out",
  /** Revelações de título e máscaras: arranque rápido, pouso longo */
  expo: "expo.out",
  /** Movimentos de ida e volta (troca de tela, crossfades) */
  inOut: "power2.inOut",
  /** Animações ligadas ao scroll (scrub): linear para seguir o dedo */
  scrub: "none",
} as const;

/** Durações em segundos */
export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Atraso entre itens de uma sequência (palavras, linhas, cartões) */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Suavidade do Lenis (quanto maior, mais rápido segue o input) */
export const smoothScroll = {
  lerp: 0.1,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
} as const;
