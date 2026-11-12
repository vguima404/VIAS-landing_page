"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { HEX_R, HEXES, MAP_H, MAP_W, OUTLINE_PATH, hexPoints, scaleColor, scaleOpacity, type Band, type Hex } from "./regions-data";

/**
 * Cartão "Regiões com maior dificuldade de acesso" (seção 07), em SVG.
 *
 * - Mapa de calor em hexágonos dentro do contorno real do território do mapa
 *   principal; dados ILUSTRATIVOS e determinísticos (regions-data.ts), no
 *   formato de isócronas em torno de polos de serviço.
 * - Escala sequencial de uma cor (Névoa → Verde-rota → Lima), sem cores de
 *   semáforo; a faixa "alta" ganha contorno lima (não depende só da cor) e a
 *   ênfase cresce com a dificuldade.
 * - Legenda em barra contínua "Menor dificuldade" → "Maior dificuldade", com
 *   marcador da região em foco, e selo "Demonstração — dados ilustrativos".
 * - Entrada: os hexágonos acendem em ondas a partir do centro, com anéis de
 *   isócrona; depois, um anel discreto volta a percorrer o mapa de tempos em
 *   tempos enquanto ele está na tela. Movimento reduzido: estático e aceso.
 * - Hover/foco: tooltip sem números e destaque da faixa (as demais esmaecem).
 *   Teclado: Tab entra no mapa; setas percorrem; Esc fecha o tooltip.
 *
 * Medidas em u do cartão: 310 × 252u (a referência tinha 310 × 182u; o cartão
 * cresceu para caber o mapa maior, a legenda contínua e o selo).
 */

/** Posição do mini mapa no cartão (u) */
const MAP_X = 48;
const MAP_Y = 64;
const RING = { rx: MAP_W * 0.62, ry: MAP_W * 0.33 };

const start = HEXES.reduce((best, h) => (h.wave < best.wave ? h : best), HEXES[0]);

export function RegionsCard({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const clipId = useId();
  const reduced = useReducedMotion();
  const [tip, setTip] = useState<Hex | null>(null);
  const [active, setActive] = useState(start.id);
  const band: Band | null = tip?.band ?? null;

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      const rings = q('[data-reg="ring"]');

      // Anel discreto de tempos em tempos, depois da entrada e só com o cartão na tela
      const idle = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 2.6 })
        .fromTo(rings[0], { attr: { rx: 2, ry: 1 }, opacity: 0.55 }, { attr: RING, opacity: 0, duration: 2.4, ease: "power1.out" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
          onLeave: () => idle.pause(),
          onEnterBack: () => tl.progress() === 1 && idle.play(),
        },
        onComplete: () => idle.restart(true),
        onReverseComplete: () => idle.pause(0),
      });

      tl.fromTo(q('[data-reg="legend"]'), { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut" }, 0);
      // Ondas: cada hexágono acende pela sua distância ao centro
      q("[data-hex]").forEach((el) => {
        const h = HEXES[Number(el.getAttribute("data-hex"))];
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.8)", transformOrigin: "50% 50%" },
          0.15 + h.wave * 1.25,
        );
      });
      // Anéis de isócrona acompanhando as ondas
      rings.forEach((r, i) =>
        tl.fromTo(r, { attr: { rx: 2, ry: 1 }, opacity: 0.9 }, { attr: RING, opacity: 0, duration: 1.6, ease: "power1.out" }, 0.1 + i * 0.35),
      );

      return () => idle.kill();
    },
    { scope: ref, dependencies: [reduced] },
  );

  // Setas: vai para o hexágono mais próximo naquela direção
  const onKey = useCallback(
    (e: KeyboardEvent<SVGPolygonElement>) => {
      if (e.key === "Escape") return setTip(null);
      const dirs: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] };
      const d = dirs[e.key];
      if (!d) return;
      e.preventDefault();
      const cur = HEXES[active];
      let best: Hex | null = null;
      let bestScore = Infinity;
      for (const h of HEXES) {
        const dx = h.x - cur.x;
        const dy = h.y - cur.y;
        const along = dx * d[0] + dy * d[1];
        if (along <= 0.5) continue;
        const score = along + Math.abs(dx * d[1] - dy * d[0]) * 2.5;
        if (score < bestScore) {
          bestScore = score;
          best = h;
        }
      }
      if (best) {
        setActive(best.id);
        setTip(best);
        ref.current?.querySelector<SVGPolygonElement>(`[data-hex="${best.id}"]`)?.focus();
      }
    },
    [active],
  );

  // A faixa alta é desenhada por cima (contorno lima inteiro)
  const ordered = [...HEXES].sort((a, b) => Number(a.band === "alta") - Number(b.band === "alta"));

  return (
    <div
      ref={ref}
      className={[
        "relative u-h-252 u-w-310 rounded-[calc(var(--u)*16)] border border-white/20 bg-ref-painel-07/75 text-white shadow-[0_calc(var(--u)*20)_calc(var(--u)*40)_calc(var(--u)*-18)_rgb(0_0_0/0.6)] backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {/* Cabeçalho */}
      <svg aria-hidden="true" viewBox="0 0 40 36" className="absolute u-top-20 u-left-24 u-h-36 u-w-40">
        <path d="M17.4 3.5a3 3 0 0 1 5.2 0l16 27.5a3 3 0 0 1-2.6 4.5H4a3 3 0 0 1-2.6-4.5Z" className="fill-ref-lima-07" />
        <path d="M20 12v11" className="stroke-ref-fundo-07" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="20" cy="28.6" r="2.1" className="fill-ref-fundo-07" />
      </svg>
      <h3 className="absolute u-top-20 u-left-79 font-sans u-text-15.5 u-leading-21 font-normal tracking-[-0.01em]">
        Regiões com maior
        <br /> dificuldade de acesso
      </h3>

      {/* Mapa de calor */}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className="absolute overflow-visible"
        style={{ left: `calc(var(--u) * ${MAP_X})`, top: `calc(var(--u) * ${MAP_Y})`, width: `calc(var(--u) * ${MAP_W})`, height: `calc(var(--u) * ${MAP_H})` }}
        role="group"
        aria-label="Mapa demonstrativo das regiões por faixa de dificuldade de acesso. Use as setas para percorrer."
      >
        <defs>
          <clipPath id={clipId}>
            <path d={OUTLINE_PATH} />
          </clipPath>
        </defs>
        {/* Contorno do território (base) */}
        <path d={OUTLINE_PATH} className="fill-white/[0.04] stroke-white/25" strokeWidth={0.6} strokeLinejoin="round" />

        {ordered.map((h) => {
          const dim = band !== null && h.band !== band;
          const high = h.band === "alta";
          return (
            <polygon
              key={h.id}
              data-hex={h.id}
              points={hexPoints(h.x, h.y, HEX_R * 0.92)}
              fill={scaleColor(h.value)}
              fillOpacity={Number((scaleOpacity(h.value) * (dim ? 0.22 : 1)).toFixed(3))}
              stroke={high ? "var(--color-lima-escala)" : "transparent"}
              strokeOpacity={dim ? 0.25 : 1}
              strokeWidth={high ? 0.75 : 0}
              role="img"
              aria-label={`Região demonstrativa · faixa de dificuldade ${h.band}`}
              tabIndex={h.id === active ? 0 : -1}
              className="cursor-default outline-none transition-[fill-opacity,stroke-opacity] duration-200 focus-visible:[stroke:white] focus-visible:[stroke-width:1.4]"
              onPointerEnter={() => setTip(h)}
              onPointerLeave={() => setTip((t) => (t?.id === h.id ? null : t))}
              onFocus={() => {
                setActive(h.id);
                setTip(h);
              }}
              onBlur={() => setTip((t) => (t?.id === h.id ? null : t))}
              onKeyDown={onKey}
            />
          );
        })}

        {/* Anéis de isócrona (recortados pelo território) */}
        <g clipPath={`url(#${clipId})`} aria-hidden="true" className="pointer-events-none">
          {[0, 1, 2].map((i) => (
            <ellipse key={i} data-reg="ring" cx={MAP_W / 2} cy={MAP_H / 2} rx={0} ry={0} fill="none" strokeWidth={1.1} className="stroke-lima-escala" opacity={0} />
          ))}
        </g>
      </svg>

      {/* Legenda: barra contínua, com marcador da região em foco */}
      <div aria-hidden="true" className="absolute u-top-190 u-left-22 u-w-266">
        <div data-reg="legend" className="u-h-6 rounded-full bg-linear-to-r from-nevoa-escala via-rota-escala to-lima-escala" />
        <span
          className={`absolute -top-[calc(var(--u)*4)] block u-h-14 u-w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_0_calc(var(--u)*1.5)_rgb(6_44_35)] transition-[left,opacity] duration-200 ${
            tip ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: `${(tip?.value ?? 0) * 100}%` }}
        />
        <div className="u-mt-6 flex justify-between font-sans u-text-11 u-leading-14 text-white/80">
          <span>Menor dificuldade</span>
          <span>Maior dificuldade</span>
        </div>
      </div>

      {/* Tooltip (duas linhas, contido no cartão) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-[calc(var(--u)*8)] bg-white u-px-10 u-py-6 font-sans u-text-11.5 u-leading-14 whitespace-nowrap text-ref-fundo-07 shadow-lg transition-opacity duration-150 ${
          tip ? "opacity-100" : "opacity-0"
        }`}
        style={tip ? { left: `calc(var(--u) * ${Math.min(236, Math.max(74, MAP_X + tip.x))})`, top: `calc(var(--u) * ${MAP_Y + tip.y - HEX_R - 3})` } : undefined}
      >
        {tip && (
          <>
            Região demonstrativa ·
            <br /> faixa de dificuldade <strong className="font-semibold">{tip.band}</strong>
          </>
        )}
      </div>

      {/* Selo */}
      <p className="absolute u-top-222 u-left-22 rounded-full border border-lima-escala/35 u-px-10 u-py-3 font-mono u-text-10 u-leading-14 tracking-[0.04em] text-lima-escala/90 uppercase">
        Demonstração — dados ilustrativos
      </p>
    </div>
  );
}
