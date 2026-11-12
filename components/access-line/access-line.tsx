"use client";

import { useId, useRef, type CSSProperties, type RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { duration as durations, ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { AccessNodeGlyph, type AccessNodeKind, type AccessTone } from "./access-node";

/* -------------------------------------------------------------------------- */
/* Tipos                                                                      */
/* -------------------------------------------------------------------------- */

export type SegmentVariant = "solid" | "dashed" | "dotted" | "fragmented";

export type AccessSegment = {
  /** Path SVG nas coordenadas do viewBox */
  d: string;
  variant?: SegmentVariant;
  /** Trecho do progresso total (0..1) em que este segmento se desenha */
  from?: number;
  to?: number;
  /** Classes de cor do traço deste segmento (ex.: "stroke-ref-rota-cinza") */
  className?: string;
  /** Cor CSS da linha; se omitida: verde-rota no claro, lima no escuro */
  color?: string;
};

export type AccessLineNode = {
  x: number;
  y: number;
  kind: AccessNodeKind;
  /**
   * Progresso (0..1) em que o nó acende. Se omitido, é calculado
   * pelo ponto mais próximo do nó sobre os segmentos.
   */
  at?: number;
  size?: number;
};

type Mode =
  /** Desenho ligado ao scroll (ida e volta) */
  | { type: "scrub"; trigger?: RefObject<Element | null>; start?: string; end?: string; smooth?: number }
  /** Desenha uma vez ao entrar na viewport */
  | { type: "enter"; trigger?: RefObject<Element | null>; start?: string; duration?: number; delay?: number }
  /** Progresso controlado pelo componente pai (ex.: timeline de uma seção sticky) */
  | { type: "manual"; progress: number };

export type AccessLineProps = {
  /** Largura e altura do viewBox */
  width: number;
  height: number;
  segments: AccessSegment[];
  nodes?: AccessLineNode[];
  mode?: Mode;
  tone?: AccessTone;
  /** Trilho fino sob a linha, mostrando o caminho ainda não percorrido */
  track?: boolean;
  /** Ponto lima na ponta do desenho */
  head?: boolean;
  /** Espessura da linha em px de tela */
  strokeWidth?: number;
  /** Classes de cor do traço (substitui verde-rota / lima do tom) */
  lineClassName?: string;
  /**
   * Halo luminoso sob o traço (rotas "acesas" sobre fotografia).
   * `className` define a cor (ex.: "stroke-lima").
   */
  glow?: { className: string; width?: number; blur?: number; opacity?: number };
  /**
   * `false` (padrão): mantém a proporção do viewBox.
   * `true`: estica para preencher o contêiner (linhas e nós continuam nítidos).
   */
  stretch?: boolean;
  className?: string;
  style?: CSSProperties;
};

/* -------------------------------------------------------------------------- */
/* Constantes                                                                 */
/* -------------------------------------------------------------------------- */

const DASH: Record<SegmentVariant, string | undefined> = {
  solid: undefined,
  dashed: "7 7",
  dotted: "0.1 7",
  fragmented: "56 18 22 26 34 40",
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* -------------------------------------------------------------------------- */
/* Componente                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Linha de Acesso — elemento proprietário da marca.
 *
 * Linhas em SVG com `vector-effect: non-scaling-stroke` (espessura constante)
 * e nós em HTML posicionados em %, para que fiquem sempre redondos e no mesmo
 * tamanho, independentemente da escala do SVG.
 *
 * O desenho é feito por máscara (`pathLength=1` + dashoffset), o que funciona
 * para qualquer variante (contínua, tracejada, pontilhada, fragmentada).
 *
 * Sem JS ou com prefers-reduced-motion, renderiza o estado final completo.
 */
export function AccessLine({
  width,
  height,
  segments,
  nodes = [],
  mode = { type: "scrub" },
  tone = "light",
  track = false,
  head = false,
  strokeWidth = 2,
  lineClassName,
  glow,
  stretch = false,
  className,
  style,
}: AccessLineProps) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const lineClass = lineClassName ?? (tone === "dark" ? "stroke-lima" : "stroke-rota");
  const glowId = `alg-${uid}`;
  const trackClass = tone === "dark" ? "stroke-papel/16" : "stroke-linha";

  const segs = segments.map((s, i) => ({
    ...s,
    variant: s.variant ?? "solid",
    from: s.from ?? 0,
    to: s.to ?? 1,
    maskId: `al-${uid}-${i}`,
  }));

  const manualProgress = mode.type === "manual" ? mode.progress : undefined;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const masks = segs.map((s) => root.querySelector<SVGPathElement>(`[data-mask="${s.maskId}"]`)!);
      const visible = segs.map((_, i) => root.querySelector<SVGPathElement>(`[data-seg="${i}"]`)!);
      const nodeEls = Array.from(root.querySelectorAll<SVGSVGElement>("[data-node] [data-access-node]"));
      const headEl = root.querySelector<HTMLElement>("[data-head]");
      const lengths = visible.map((p) => p.getTotalLength());

      // Progresso em que cada nó acende
      const nodeAt = nodes.map((n) => n.at ?? nearestProgress(n, visible, lengths, segs));

      const apply = (p: number) => {
        let headSeg = -1;
        segs.forEach((s, i) => {
          const local = clamp01((p - s.from) / Math.max(1e-6, s.to - s.from));
          masks[i].style.strokeDashoffset = String(1 - local);
          if (local > 0) headSeg = i;
        });
        nodeEls.forEach((el, i) => {
          el.dataset.active = p >= nodeAt[i] - 0.001 ? "true" : "false";
        });
        if (headEl) {
          if (headSeg < 0 || p <= 0) {
            headEl.style.opacity = "0";
          } else {
            const s = segs[headSeg];
            const local = clamp01((p - s.from) / Math.max(1e-6, s.to - s.from));
            const pt = visible[headSeg].getPointAtLength(local * lengths[headSeg]);
            headEl.style.opacity = p >= 1 ? "0" : "1";
            headEl.style.left = `${(pt.x / width) * 100}%`;
            headEl.style.top = `${(pt.y / height) * 100}%`;
          }
        }
      };

      if (reduced) {
        apply(1);
        return;
      }

      if (mode.type === "manual") {
        apply(clamp01(mode.progress));
        return;
      }

      const trigger = mode.trigger?.current ?? root;
      apply(0);

      if (mode.type === "scrub") {
        ScrollTrigger.create({
          trigger,
          start: mode.start ?? "top 85%",
          end: mode.end ?? "bottom 35%",
          scrub: mode.smooth ?? 0.6,
          onUpdate: (self) => apply(self.progress),
        });
        return;
      }

      // enter
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        duration: mode.duration ?? durations.slow * 2,
        delay: mode.delay ?? 0,
        ease: ease.inOut,
        onUpdate: () => apply(proxy.p),
        scrollTrigger: { trigger, start: mode.start ?? "top 75%", once: true },
      });
    },
    {
      scope: rootRef,
      dependencies: [reduced, mode.type, manualProgress, width, height],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none relative ${className ?? ""}`}
      style={{ aspectRatio: stretch ? undefined : `${width} / ${height}`, ...style }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        focusable="false"
      >
        <defs>
          {glow && (
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={glow.blur ?? 3} />
            </filter>
          )}
          {segs.map((s) => (
            <mask key={s.maskId} id={s.maskId} maskUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
              <path
                data-mask={s.maskId}
                d={s.d}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth={Math.max(width, height) * 0.03}
                strokeLinecap="butt"
                strokeLinejoin="round"
                strokeDasharray="1 2"
                strokeDashoffset={0}
              />
            </mask>
          ))}
        </defs>

        {track &&
          segs.map((s, i) => (
            <path
              key={`t${i}`}
              d={s.d}
              fill="none"
              className={trackClass}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              strokeDasharray={s.variant === "solid" ? undefined : DASH[s.variant]}
            />
          ))}

        {glow &&
          segs.map((s, i) => (
            <g key={`g${i}`} mask={`url(#${s.maskId})`}>
              <path
                d={s.d}
                fill="none"
                filter={`url(#${glowId})`}
                strokeWidth={glow.width ?? strokeWidth * 4}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={glow.opacity ?? 0.6}
                className={glow.className}
              />
            </g>
          ))}

        {segs.map((s, i) => (
          <path
            key={`s${i}`}
            data-seg={i}
            d={s.d}
            mask={`url(#${s.maskId})`}
            fill="none"
            stroke={s.color}
            className={s.className ?? (s.color ? undefined : lineClass)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={DASH[s.variant]}
          />
        ))}
      </svg>

      {nodes.map((n, i) => (
        <span
          key={i}
          data-node
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(n.x / width) * 100}%`, top: `${(n.y / height) * 100}%` }}
        >
          <AccessNodeGlyph kind={n.kind} tone={tone} size={n.size ?? 24} active />
        </span>
      ))}

      {head && (
        <span
          data-head
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-pinho bg-lima opacity-0"
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Utilitários                                                                */
/* -------------------------------------------------------------------------- */

/** Progresso global (0..1) do ponto do caminho mais próximo do nó. */
function nearestProgress(
  node: { x: number; y: number },
  paths: SVGPathElement[],
  lengths: number[],
  segs: { from: number; to: number }[],
) {
  let best = { dist: Infinity, at: 1 };
  paths.forEach((path, i) => {
    const L = lengths[i];
    const steps = Math.max(40, Math.round(L / 6));
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const pt = path.getPointAtLength(t * L);
      const dist = (pt.x - node.x) ** 2 + (pt.y - node.y) ** 2;
      if (dist < best.dist) best = { dist, at: segs[i].from + t * (segs[i].to - segs[i].from) };
    }
  });
  return best.at;
}
