/**
 * Mapa das seções da página: fonte única para âncoras, navbar,
 * nós da linha de progresso e tema (claro/escuro) de cada trecho.
 */

export type SectionTheme = "light" | "dark";

export type SectionInfo = {
  /** id do elemento <section> (âncora) */
  id: string;
  /** Número da seção nas referências */
  number: string;
  /** Rótulo curto: tooltip dos nós da linha de progresso */
  label: string;
  /** Rótulo na navbar (só para as seções que aparecem lá) */
  navLabel?: string;
  theme: SectionTheme;
};

export const sections = [
  { id: "inicio", number: "02", label: "Início", theme: "light" },
  { id: "problema", number: "03", label: "O problema", theme: "light" },
  {
    id: "como-funciona",
    number: "04",
    label: "Como funciona",
    navLabel: "Como funciona",
    theme: "light",
  },
  {
    id: "acessibilidade",
    number: "05",
    label: "Acessibilidade",
    navLabel: "Acessibilidade",
    theme: "light",
  },
  {
    id: "tecnologia",
    number: "06",
    label: "Inteligência e integração",
    navLabel: "Tecnologia",
    theme: "light",
  },
  {
    id: "gestores",
    number: "07",
    label: "Para gestores",
    navLabel: "Para gestores",
    theme: "dark",
  },
  { id: "confianca", number: "08", label: "Confiança e privacidade", theme: "light" },
  { id: "comece", number: "09", label: "Comece agora", theme: "light" },
] as const satisfies readonly SectionInfo[];

export type SectionId = (typeof sections)[number]["id"];

export const navSections = sections.filter(
  (s): s is Extract<(typeof sections)[number], { navLabel: string }> => "navLabel" in s,
);

export const sectionById = (id: SectionId) => sections.find((s) => s.id === id)!;
