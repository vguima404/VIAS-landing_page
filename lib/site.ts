/**
 * Destinos de links externos e de CTAs.
 * Um só lugar para trocar quando as páginas/URLs definitivas existirem.
 */
export const site = {
  /**
   * "Explorar demonstração →" (navbar, menu mobile, Hero e CTA final):
   * a demonstração publicada.
   */
  demoHref: "https://vias-jet.vercel.app",
  /** "Conheça o VIAS" (Hero, botão de play): o vídeo pitch no YouTube */
  pitchHref: "https://youtu.be/YSqMlLNoc98",
  /** "Conhecer o painel para gestores →" (CTA final): o Painel do gestor */
  gestoresHref: "/painel",
  /** "Privacidade" (footer): seção 08, Confiança e privacidade */
  privacyHref: "#confianca",
  /**
   * "Contato" (footer).
   * PROVISÓRIO (destino pendente): volta ao CTA final até existir uma página
   * ou endereço de contato.
   */
  contactHref: "#comece",
} as const;
