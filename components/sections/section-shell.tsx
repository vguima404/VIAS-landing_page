import type { ReactNode } from "react";

import { sectionById, type SectionId } from "@/lib/sections";

/**
 * Estrutura provisória de seção (Etapa 1).
 * Cada seção real substitui o seu shell na etapa correspondente,
 * mantendo o mesmo id, tema e hierarquia de títulos.
 */
export function SectionShell({
  id,
  heading,
  headingLevel = 2,
  stage,
  children,
}: {
  id: SectionId;
  heading: string;
  headingLevel?: 1 | 2;
  /** Etapa em que a seção será construída */
  stage: string;
  children?: ReactNode;
}) {
  const section = sectionById(id);
  const dark = section.theme === "dark";
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section
      id={id}
      data-theme={section.theme}
      aria-labelledby={`${id}-titulo`}
      className={`relative flex min-h-svh items-center py-(--spacing-section) focus:outline-none ${
        dark ? "bg-pinho text-papel [--focus-ring:var(--color-lima)]" : "bg-papel text-grafite"
      }`}
    >
      <div className="container-site grid gap-12">
        <div className="grid max-w-3xl gap-5">
          <p className={`label-mono ${dark ? "text-lima" : "text-rota"}`}>
            {section.number} · {section.label}
          </p>
          <Heading
            id={`${id}-titulo`}
            className={`font-display font-bold text-balance ${headingLevel === 1 ? "text-display" : "text-h2"} ${
              dark ? "text-papel" : "text-pinho"
            }`}
          >
            {heading}
          </Heading>
          <p className={`text-lead text-pretty ${dark ? "text-papel-suave" : "text-salvia"}`}>
            Estrutura provisória. Seção construída na {stage}.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
