import { ClockIcon } from "@/components/ui/icons";

/**
 * Painéis de vidro escuro da seção 07 (referência 07), medidas em u do
 * painel. Ilustrações da interface para gestores: sem números.
 */

const glass =
  "rounded-[calc(var(--u)*16)] border border-white/20 bg-ref-painel-07/70 text-white shadow-[0_calc(var(--u)*20)_calc(var(--u)*40)_calc(var(--u)*-18)_rgb(0_0_0/0.6)] backdrop-blur-md";

/** Faixas da barra de cobertura (larguras medidas na referência, u) */
const segments = [
  { w: 63, c: "bg-ref-alta-07" },
  { w: 65, c: "bg-ref-media-07" },
  { w: 65, c: "bg-[#86bc7d]" },
  { w: 34, c: "bg-ref-baixa-07" },
  { w: 33, c: "bg-[#9fb59f]" },
];

const legend = [
  { label: "Alta", dot: "bg-[#38a360]", x: "u-left-25.5", tx: "u-left-47" },
  { label: "Média", dot: "bg-[#b3d471]", x: "u-left-95.5", tx: "u-left-115" },
  { label: "Baixa", dot: "bg-[#b6dda7]", x: "u-left-179.5", tx: "u-left-198" },
];

/** "Cobertura de Saúde": 310 × 138u */
export function CoverageCard({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Painel de cobertura de saúde por região, com faixas alta, média e baixa (ilustração)" className={`relative u-h-138 u-w-310 ${glass} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 35 29" className="absolute u-top-24 u-left-27 u-h-29 u-w-35 fill-white">
        <rect x="0" y="15" width="5.5" height="14" rx="1" />
        <rect x="9.5" y="7" width="5.5" height="22" rx="1" />
        <rect x="19" y="0" width="5.5" height="29" rx="1" />
        <rect x="28.5" y="10" width="5.5" height="19" rx="1" />
      </svg>
      <p className="absolute u-top-24 u-left-82 font-sans u-text-17 u-leading-24 tracking-[-0.01em]">Cobertura de Saúde</p>
      <div className="absolute u-top-65 u-left-25 flex u-h-17 u-w-260 overflow-hidden rounded-full bg-white/10">
        {segments.map((s, i) => (
          <span key={i} data-ges="seg" className={`block h-full ${s.c}`} style={{ width: `calc(var(--u) * ${s.w})` }} />
        ))}
      </div>
      {legend.map((l) => (
        <span key={l.label} data-ges="legend-item">
          <span className={`absolute u-top-101.5 u-size-13 rounded-full ${l.dot} ${l.x}`} />
          <span className={`absolute u-top-98 font-sans u-text-15 u-leading-20 text-white/90 ${l.tx}`}>{l.label}</span>
        </span>
      ))}
    </div>
  );
}

/** "Tempo médio de deslocamento": 226 × 130u, com linha de tendência sem eixos nem números */
export function TravelTimeCard({ className = "" }: { className?: string }) {
  // Pontos em u do painel (referência: x 1407, y 181)
  const pts: [number, number][] = [
    [25, 109],
    [75, 86],
    [125, 82],
    [147, 99],
    [197, 71],
  ];
  const d = "M25 109 C40 104 58 86 75 86 C92 86 98 96 108 92 C116 89 118 82 125 82 C134 82 138 99 147 99 C160 99 170 74 182 72 C188 71 192 72 197 71";
  return (
    <div role="img" aria-label="Painel de tempo médio de deslocamento, com uma linha de tendência (ilustração, sem valores)" className={`relative u-h-130 u-w-226 ${glass} ${className}`}>
      <ClockIcon aria-hidden="true" className="absolute u-top-18 u-left-23 u-size-38 text-white" strokeWidth={1.6} />
      <p className="absolute u-top-18 u-left-76 font-sans u-text-14.5 u-leading-18 tracking-[-0.01em] text-white/95">
        Tempo médio
        <br /> de deslocamento
      </p>
      <svg aria-hidden="true" viewBox="0 0 226 130" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="ges-spark-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-ref-lima-07)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-ref-lima-07)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle data-ges="spark-ping" cx={197} cy={71} r={3.6} fill="none" strokeWidth={1.4} className="stroke-ref-lima-07" opacity={0} />
        <path data-ges="spark-fill" d={`${d} L197 118 L25 118 Z`} fill="url(#ges-spark-fill)" />
        <path data-ges="spark" d={d} pathLength={1} strokeDasharray="1 1" fill="none" strokeWidth="1.8" strokeLinecap="round" className="stroke-ref-lima-07" />
        {pts.map(([x, y], i) => (
          <circle key={i} data-ges="spark-dot" cx={x} cy={y} r={i === pts.length - 1 ? 3.6 : 2.1} className={i === pts.length - 1 ? "fill-white stroke-ref-lima-07" : "fill-ref-lima-07"} strokeWidth={1.4} />
        ))}
      </svg>
    </div>
  );
}
