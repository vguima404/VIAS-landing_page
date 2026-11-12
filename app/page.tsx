import { AccessLine } from "@/components/access-line";
import { Logo } from "@/components/brand/logo";
import { Acessibilidade } from "@/components/sections/acessibilidade/acessibilidade";
import { ComoFunciona } from "@/components/sections/como-funciona/como-funciona";
import { Confianca } from "@/components/sections/confianca/confianca";
import { Gestores } from "@/components/sections/gestores/gestores";
import { Hero } from "@/components/sections/hero/hero";
import { Inteligencia } from "@/components/sections/inteligencia/inteligencia";
import { Problema } from "@/components/sections/problema/problema";
import { SectionShell } from "@/components/sections/section-shell";

/**
 * Página única do VIAS.
 * 02 Hero (Etapa 3.1), 03 O problema (Etapa 4), 04 Como funciona (Etapa 5) e
 * 05 Acessibilidade (Etapa 6), 06 Inteligência (Etapa 7), 07 Gestores (Etapa 8)
 * e 08 Confiança (Etapa 9): definitivos.
 * Demais seções: estrutura provisória com a Linha de Acesso de cada ato (Etapa 1).
 */
export default function Home() {
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="focus:outline-none">
        <Hero />

        <Problema />

        <ComoFunciona />

        <Acessibilidade />

        <Inteligencia />

        <Gestores />

        <Confianca />

        {/* 09 · CTA — nasce de uma origem e se bifurca em dois caminhos */}
        <SectionShell id="comece" heading="Para quem precisa chegar. E para quem planeja o caminho." stage="Etapa 10">
          <AccessLine
            width={1200}
            height={200}
            mode={{ type: "enter", duration: 1.4 }}
            segments={[
              { d: "M600 30 C 520 30, 360 60, 300 170" },
              { d: "M600 30 C 680 30, 840 60, 900 170" },
            ]}
            nodes={[
              { x: 600, y: 30, kind: "origin" },
              { x: 300, y: 170, kind: "access" },
              { x: 900, y: 170, kind: "access" },
            ]}
          />
        </SectionShell>
      </main>

      <footer data-theme="dark" className="bg-pinho py-16 text-papel [--focus-ring:var(--color-lima)]">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <Logo className="h-7 w-auto text-papel" />
          <p className="label-mono text-papel-suave">Footer provisório · Etapa 10</p>
        </div>
      </footer>
    </>
  );
}
