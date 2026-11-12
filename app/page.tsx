import { AccessLine } from "@/components/access-line";
import { Logo } from "@/components/brand/logo";
import { Acessibilidade } from "@/components/sections/acessibilidade/acessibilidade";
import { ComoFunciona } from "@/components/sections/como-funciona/como-funciona";
import { Hero } from "@/components/sections/hero/hero";
import { Problema } from "@/components/sections/problema/problema";
import { SectionShell } from "@/components/sections/section-shell";

/**
 * Página única do VIAS.
 * 02 Hero (Etapa 3.1), 03 O problema (Etapa 4), 04 Como funciona (Etapa 5) e
 * 05 Acessibilidade (Etapa 6): definitivos.
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

        {/* 06 · Inteligência — atravessa camadas empilhadas */}
        <SectionShell id="tecnologia" heading="Conectar dados é o que transforma localização em acesso." stage="Etapa 7">
          <AccessLine
            width={1200}
            height={260}
            track
            segments={[{ d: "M30 220 C 200 220, 260 180, 400 170 S 620 120, 760 110 S 980 60, 1170 40" }]}
            nodes={[
              { x: 30, y: 220, kind: "origin" },
              { x: 400, y: 170, kind: "junction" },
              { x: 760, y: 110, kind: "junction" },
              { x: 1170, y: 40, kind: "access" },
            ]}
          />
        </SectionShell>

        {/* 07 · Gestores — a linha vira rede (fundo escuro) */}
        <SectionShell id="gestores" heading="O mapa também mostra onde chegar é mais difícil." stage="Etapa 8">
          <AccessLine
            width={1200}
            height={240}
            tone="dark"
            track
            segments={[
              { d: "M30 200 C 240 200, 320 120, 520 120", from: 0, to: 0.4 },
              { d: "M520 120 C 700 120, 760 40, 960 40 L 1170 40", from: 0.4, to: 1 },
              { d: "M520 120 C 700 120, 780 200, 980 200 L 1170 200", from: 0.4, to: 1 },
            ]}
            nodes={[
              { x: 30, y: 200, kind: "origin" },
              { x: 520, y: 120, kind: "junction" },
              { x: 1170, y: 40, kind: "access" },
              { x: 1170, y: 200, kind: "access" },
            ]}
          />
        </SectionShell>

        {/* 08 · Confiança — linhas finas de anotação, uma a uma */}
        <SectionShell id="confianca" heading="Cada informação precisa mostrar o que sabe — e o que não sabe." stage="Etapa 9">
          <AccessLine
            width={1200}
            height={180}
            strokeWidth={1.25}
            segments={[
              { d: "M60 40 L 360 40 L 420 90", from: 0, to: 0.33 },
              { d: "M60 90 L 520 90", from: 0.33, to: 0.66 },
              { d: "M60 140 L 360 140 L 420 90", from: 0.66, to: 1 },
            ]}
            nodes={[
              { x: 60, y: 40, kind: "junction", size: 18 },
              { x: 60, y: 90, kind: "junction", size: 18 },
              { x: 60, y: 140, kind: "junction", size: 18 },
            ]}
          />
        </SectionShell>

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
