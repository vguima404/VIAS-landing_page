"use client";

import { useEffect, useRef, useState } from "react";

import { AccessNodeGlyph, type AccessTone } from "@/components/access-line";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { sections } from "@/lib/sections";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Linha de progresso da página (borda inferior da navbar, spec §6).
 *
 * - Trilho de 1 px em toda a largura.
 * - Trecho percorrido (2 px) cresce de 0 a 100% conforme o scroll: só `scale`.
 * - Ponto lima na ponta: só `translate`.
 * - Um nó por seção, na posição em que o scroll chega a ela; acende ao passar.
 *   Os nós são links para as seções, com rótulo em tooltip.
 * - No fim, um portal que se completa com o ponto lima.
 *
 * O progresso é aplicado direto no DOM (sem re-render a cada frame).
 */
export function ProgressLine({ tone }: { tone: AccessTone }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [stops, setStops] = useState<number[] | null>(null);
  /** Reaplica o progresso atual (ex.: depois que os nós são renderizados) */
  const reapplyRef = useRef<() => void>(() => {});

  useGSAP(
    () => {
      const rail = railRef.current;
      if (!rail) return;
      const fill = rail.querySelector<HTMLElement>("[data-fill]")!;
      const head = rail.querySelector<HTMLElement>("[data-head]")!;
      const header = rail.closest("header");

      let fractions: number[] = [];
      let width = rail.clientWidth;
      /** Tolerância de 4 px de scroll, para o nó acender ao pousar na âncora */
      let tolerance = 0;

      const measure = () => {
        const max = ScrollTrigger.maxScroll(window);
        tolerance = max > 0 ? 4 / max : 0;
        const navH = header?.offsetHeight ?? 0;
        width = rail.clientWidth;
        fractions = sections.map((s, i) => {
          const el = document.getElementById(s.id);
          if (i === 0 || !el || max <= 0) return i === 0 ? 0 : i / sections.length;
          return clamp01((el.getBoundingClientRect().top + window.scrollY - navH) / max);
        });
        setStops(fractions);
      };

      const apply = (p: number) => {
        fill.style.scale = `${p} 1`;
        head.style.translate = `${p * width}px 0`;
        head.style.opacity = p > 0.002 && p < 0.995 ? "1" : "0";
        rail.querySelectorAll<HTMLElement>("[data-stop]").forEach((el) => {
          const f = fractions[Number(el.dataset.stop)] ?? 1;
          el.querySelector<SVGElement>("[data-access-node]")!.dataset.active = p >= f - tolerance ? "true" : "false";
        });
        rail.querySelector<SVGElement>("[data-portal] [data-access-node]")!.dataset.active =
          p >= 0.995 ? "true" : "false";
      };

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => {
          measure();
          apply(self.progress);
        },
      });

      reapplyRef.current = () => apply(st.progress);
      measure();
      apply(st.progress);
    },
    { scope: railRef },
  );

  // Os nós só existem depois da primeira medição: acende os que já foram percorridos
  useEffect(() => {
    if (stops) reapplyRef.current();
  }, [stops]);

  const dark = tone === "dark";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0">
      {/* Trilho: 1 px em toda a largura */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 -top-px h-px transition-colors duration-500 ${dark ? "bg-papel/20" : "bg-linha"}`}
      />

      {/* Percurso: dentro do contêiner, para os nós das pontas não serem cortados */}
      <div className="container-site">
        <div ref={railRef} className="relative h-0">
          <div
            data-fill
            aria-hidden="true"
            className={`absolute top-[-0.5px] left-0 h-0.5 w-full origin-left -translate-y-1/2 scale-x-0 rounded-full transition-colors duration-500 ${
              dark ? "bg-lima" : "bg-rota"
            }`}
          />

          <nav aria-label="Seções da página">
            <ol>
              {stops &&
                sections.map((s, i) => {
                  const f = stops[i];
                  const align = f < 0.08 ? "left-0" : f > 0.92 ? "right-0" : "left-1/2 -translate-x-1/2";
                  return (
                    <li
                      key={s.id}
                      data-stop={i}
                      className="absolute top-0"
                      style={{ left: `${f * 100}%` }}
                    >
                      <a
                        href={`#${s.id}`}
                        aria-label={`Ir para: ${s.label}`}
                        className="group/node pointer-events-auto absolute grid size-7 -translate-1/2 place-items-center rounded-full"
                      >
                        <AccessNodeGlyph
                          kind={i === 0 ? "origin" : "junction"}
                          tone={tone}
                          className="size-3.5 transition-[scale] duration-300 ease-out-expo group-hover/node:scale-125 lg:size-4"
                        />
                        <span
                          aria-hidden="true"
                          className={`label-mono pointer-events-none absolute top-full mt-1.5 rounded-pill px-2.5 py-1 text-[0.625rem] whitespace-nowrap opacity-0 shadow-card transition-[opacity,translate] duration-300 ease-out-expo translate-y-1 group-hover/node:translate-y-0 group-hover/node:opacity-100 group-focus-visible/node:translate-y-0 group-focus-visible/node:opacity-100 ${align} ${
                            dark ? "bg-lima text-pinho" : "bg-pinho text-papel"
                          }`}
                        >
                          {s.number} · {s.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ol>
          </nav>

          {/* Portal de chegada: a jornada terminou */}
          <span data-portal aria-hidden="true" className="absolute top-0 left-full -translate-1/2">
            <AccessNodeGlyph kind="access" tone={tone} className="size-4.5 lg:size-5" />
          </span>

          {/* Ponta do percurso: ponto lima com borda verde-pinho */}
          <span
            data-head
            aria-hidden="true"
            className="absolute top-[-0.5px] left-0 opacity-0 transition-opacity duration-300"
          >
            <span className="absolute size-2.5 -translate-1/2 rounded-full border-[1.5px] border-pinho bg-lima" />
          </span>
        </div>
      </div>
    </div>
  );
}
