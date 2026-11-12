import { TERRITORY_PX } from "./regions-data";

/**
 * Efeitos de luz sobre o território do fundo (seção 07, desktop), no sistema
 * de px da referência (viewBox 1672×941). Animados por GestoresMotion:
 *
 * - isócronas: anéis achatados (perspectiva do mapa) partindo do destino em
 *   destaque, recortados pelo contorno do território;
 * - pulso de rota: um traço de luz percorre a rota acesa até o destino e as
 *   linhas lima do canto inferior esquerdo;
 * - unidades: os pins de saúde do mapa acendem com um anel.
 *
 * Coordenadas traçadas sobre o fundo fornecido (rota e pins detectados na
 * imagem). Sem JS / movimento reduzido: nada aparece (opacidade 0).
 */

/** Destino em destaque no mapa (centro do alvo sob o pin) */
export const DEST = { x: 1314, y: 455 };

const TERRITORY_PATH = `M${TERRITORY_PX.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;

/** Rota acesa no mapa, da entrada sul até o destino */
const ROUTE = "M1013 596 L1021 570 C1040 566 1080 568 1093 562 C1105 548 1125 530 1150 524 C1162 518 1170 496 1181 477 C1188 465 1205 460 1221 450 C1232 444 1245 444 1253 454 C1275 454 1300 454 1317 457";
/** Linha lima do canto inferior esquerdo (passa pelos dois nós) */
const ROUTE_SW = "M-10 792 C100 757 200 741 288 757 C380 772 470 790 547 805 C640 822 720 850 840 945";

/** Pins de unidades de saúde no fundo (px) */
export const PINS: [number, number][] = [
  [1263, 289], [1147, 325], [1319, 329], [1078, 357], [1269, 375], [1046, 394], [1069, 404], [951, 415],
  [1425, 434], [821, 472], [1029, 470], [875, 511], [1204, 544], [931, 563], [1155, 616], [1462, 392], [1238, 258],
];

export function MapFx() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1672 941" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block">
      <defs>
        <clipPath id="ges-territory">
          <path d={TERRITORY_PATH} />
        </clipPath>
        <filter id="ges-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="ges-halo">
          <stop offset="0" stopColor="var(--color-lima-escala)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--color-lima-escala)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Isócronas a partir do destino */}
      <g clipPath="url(#ges-territory)">
        <ellipse data-ges="halo" cx={DEST.x} cy={DEST.y} rx={150} ry={80} fill="url(#ges-halo)" opacity={0} />
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} data-ges="iso" cx={DEST.x} cy={DEST.y} rx={0} ry={0} fill="none" strokeWidth={2} className="stroke-lima-escala" opacity={0} />
        ))}
      </g>

      {/* Pulsos de luz nas rotas */}
      <path data-ges="comet" d={ROUTE} pathLength={1} strokeDasharray="0.14 1" strokeDashoffset={1.14} fill="none" strokeWidth={4.5} strokeLinecap="round" className="stroke-lima-escala" filter="url(#ges-glow)" opacity={0} />
      <path data-ges="comet" d={ROUTE_SW} pathLength={1} strokeDasharray="0.08 1" strokeDashoffset={1.08} fill="none" strokeWidth={4} strokeLinecap="round" className="stroke-lima-escala" filter="url(#ges-glow)" opacity={0} />

      {/* Unidades de saúde acendendo */}
      {PINS.map(([x, y]) => (
        <circle key={`${x}-${y}`} data-ges="pin-pulse" cx={x} cy={y} r={14} fill="none" strokeWidth={2} className="stroke-lima-escala" opacity={0} />
      ))}
    </svg>
  );
}
