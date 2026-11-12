/**
 * Nós da Linha de Acesso (spec §4):
 * - origin   · origem: anel aberto com ponto central
 * - junction · conexão: junções e mudanças de direção
 * - access   · acesso: portal com pequena abertura e ponto lima
 *
 * Cada glifo tem um estado ocioso e um ativo sobrepostos. O SVG é um `group`
 * com `data-active`; a troca usa só opacity/scale (variantes group-data-*).
 */

export type AccessNodeKind = "origin" | "junction" | "access";
export type AccessTone = "light" | "dark";

/** Classes de cor por tom (fill/stroke do Tailwind) */
const tones = {
  light: {
    idleStroke: "stroke-linha",
    idleFill: "fill-linha",
    base: "fill-papel",
    activeStroke: "stroke-rota",
    activeFill: "fill-rota",
    ring: "stroke-papel",
  },
  dark: {
    idleStroke: "stroke-papel/32",
    idleFill: "fill-papel/32",
    base: "fill-pinho",
    activeStroke: "stroke-lima",
    activeFill: "fill-lima",
    ring: "stroke-pinho",
  },
} as const;

/** Camada ociosa: some quando o nó acende */
const IDLE = "transition-opacity duration-500 ease-out-power3 group-data-[active=true]:opacity-0 motion-reduce:duration-200";

/** Camada ativa: surge com leve crescimento a partir do centro */
const ACTIVE = [
  "origin-center transform-fill opacity-0 scale-60",
  "transition-[opacity,scale] duration-600 ease-out-expo",
  "group-data-[active=true]:opacity-100 group-data-[active=true]:scale-100",
  "motion-reduce:scale-100 motion-reduce:transition-opacity motion-reduce:duration-200",
].join(" ");

/** Pulso único ao acender o portal (não fica em loop) */
const PULSE =
  "origin-center transform-fill opacity-0 group-data-[active=true]:animate-node-pulse motion-reduce:group-data-[active=true]:animate-none";

/** Arco do portal: anel r=8 com abertura no quadrante superior direito. */
const PORTAL_ARC = "M19.25 8.62 A8 8 0 1 1 15.38 4.75";

export function AccessNodeGlyph({
  kind,
  tone = "light",
  size = 24,
  active,
  className,
}: {
  kind: AccessNodeKind;
  tone?: AccessTone;
  size?: number;
  /** Estado inicial (SSR). Depois o atributo é controlado pela AccessLine. */
  active?: boolean;
  className?: string;
}) {
  const c = tones[tone];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`group overflow-visible ${className ?? ""}`}
      data-access-node
      data-active={active ? "true" : "false"}
      aria-hidden="true"
      focusable="false"
    >
      {kind === "origin" && (
        <>
          <g className={IDLE}>
            <circle cx="12" cy="12" r="7" strokeWidth="2" className={`${c.base} ${c.idleStroke}`} />
            <circle cx="12" cy="12" r="2.5" className={c.idleFill} />
          </g>
          <g className={ACTIVE}>
            <circle cx="12" cy="12" r="7" strokeWidth="2.25" className={`${c.base} ${c.activeStroke}`} />
            <circle cx="12" cy="12" r="3" className={c.activeFill} />
          </g>
        </>
      )}

      {kind === "junction" && (
        <>
          <circle cx="12" cy="12" r="4.5" strokeWidth="2" className={`${IDLE} ${c.base} ${c.idleStroke}`} />
          <circle cx="12" cy="12" r="5" strokeWidth="2" className={`${ACTIVE} ${c.activeFill} ${c.ring}`} />
        </>
      )}

      {kind === "access" && (
        <>
          <circle cx="12" cy="12" r="8" strokeWidth="2" className={`${PULSE} fill-none stroke-lima`} />
          <g className={IDLE}>
            <circle cx="12" cy="12" r="8" className={c.base} />
            <path d={PORTAL_ARC} strokeWidth="2" strokeLinecap="round" className={`fill-none ${c.idleStroke}`} />
            <circle cx="12" cy="12" r="2" className={c.idleFill} />
          </g>
          <g className={ACTIVE}>
            <circle cx="12" cy="12" r="8" className={c.base} />
            <path d={PORTAL_ARC} strokeWidth="2.25" strokeLinecap="round" className={`fill-none ${c.activeStroke}`} />
            <circle cx="12" cy="12" r="3.75" strokeWidth="1.5" className="fill-lima stroke-pinho" />
          </g>
        </>
      )}
    </svg>
  );
}
