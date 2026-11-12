/**
 * Destinos de links externos e de CTAs.
 * Um só lugar para trocar quando as páginas/URLs definitivas existirem.
 */
export const site = {
  /**
   * "Explorar demonstração →" (navbar, Hero, CTA final).
   * PROVISÓRIO (decisão D1 pendente): leva à seção Como funciona
   * até existir a URL da demonstração.
   */
  demoHref: "#como-funciona",
  /** "Conhecer o painel para gestores →" (CTA final): seção Para gestores */
  gestoresHref: "#gestores",
  /** "Privacidade" (footer): seção 08, Confiança e privacidade */
  privacyHref: "#confianca",
  /**
   * "Contato" (footer).
   * PROVISÓRIO (destino pendente): volta ao CTA final até existir uma página
   * ou endereço de contato.
   */
  contactHref: "#comece",
} as const;
