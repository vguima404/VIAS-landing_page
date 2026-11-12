/**
 * DADOS ILUSTRATIVOS — NÃO SÃO DADOS REAIS.
 *
 * Mini mapa do cartão "Regiões com maior dificuldade de acesso" (seção 07):
 * hexágonos dentro do contorno do território do mapa principal. A
 * "dificuldade" de cada hexágono imita uma leitura de isócronas: cresce com a
 * distância (em perspectiva) até três polos de serviço fictícios, com uma
 * barreira e ruído suave sorteados por um PRNG de semente fixa. Assim a mesma
 * distribuição aparece em todo carregamento. Não representa nenhuma região,
 * medição ou indicador verdadeiro; o cartão mostra o selo "Demonstração —
 * dados ilustrativos" e nenhum número.
 */

export type Band = "baixa" | "média" | "alta";

export type Hex = {
  id: number;
  /** Centro no sistema do SVG do mini mapa (u do cartão) */
  x: number;
  y: number;
  /** 0–1: posição na escala de cor */
  value: number;
  band: Band;
  /** 0–1: distância ao centro do mapa (ordem das ondas de entrada) */
  wave: number;
};

/**
 * Contorno do território, extraído do fundo da seção (px da imagem
 * 1672×941). Também recorta os efeitos sobre o mapa principal.
 */
export const TERRITORY_PX: [number, number][] = [
  [1629, 397], [1622, 382], [1600, 371], [1552, 364], [1546, 333], [1517, 320], [1488, 320], [1473, 291],
  [1444, 285], [1423, 264], [1372, 252], [1318, 253], [1273, 209], [1226, 212], [1195, 236], [1120, 245],
  [1045, 305], [984, 300], [931, 322], [925, 344], [945, 371], [939, 386], [871, 406], [773, 456],
  [721, 461], [693, 496], [633, 508], [617, 522], [586, 524], [559, 559], [582, 569], [622, 563],
  [640, 571], [667, 568], [680, 588], [760, 565], [780, 579], [778, 594], [761, 610], [765, 621],
  [827, 645], [863, 626], [904, 638], [939, 637], [961, 668], [1003, 679], [1011, 702], [1027, 710],
  [1064, 693], [1092, 694], [1105, 706], [1116, 740], [1161, 771], [1237, 729], [1239, 701], [1222, 697],
  [1209, 674], [1219, 651], [1238, 648], [1263, 669], [1266, 685], [1281, 687], [1392, 638], [1395, 591],
  [1405, 577], [1500, 543], [1528, 524], [1521, 498], [1502, 487], [1502, 473], [1541, 459], [1581, 423],
  [1609, 421],
];

/** Área do mini mapa no cartão (u) */
export const MAP_W = 214;
export const MAP_H = 113;
/** Raio do hexágono (pontas para cima) */
export const HEX_R = 4.15;

const xs = TERRITORY_PX.map((p) => p[0]);
const ys = TERRITORY_PX.map((p) => p[1]);
const minX = Math.min(...xs);
const minY = Math.min(...ys);
const k = Math.min(MAP_W / (Math.max(...xs) - minX), MAP_H / (Math.max(...ys) - minY));
const toMap = ([x, y]: [number, number]): [number, number] => [(x - minX) * k, (y - minY) * k];

export const OUTLINE = TERRITORY_PX.map(toMap);
export const OUTLINE_PATH = `M${OUTLINE.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`;

/** PRNG mulberry32: determinístico para uma semente fixa */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 1e4) / 1e4;

function inside([x, y]: [number, number], poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Polos de serviço fictícios (px do fundo), perto de pins do mapa principal */
const HUBS_PX: [number, number, number][] = [
  [1314, 452, 1], // destino em destaque no mapa
  [1078, 357, 0.85],
  [930, 560, 0.9],
];

function buildHexes(): Hex[] {
  const rand = mulberry32(20261112);
  const w = Math.sqrt(3) * HEX_R;
  const h = 1.5 * HEX_R;
  const hubs = HUBS_PX.map(([x, y, s]) => [...toMap([x, y]), s] as const);
  // Perspectiva do mapa: distâncias verticais valem mais (isócronas achatadas)
  const dist = (x: number, y: number, hx: number, hy: number) => Math.hypot(x - hx, (y - hy) * 1.9);
  // Ruído suave: alguns focos sorteados (relevo, falta de linhas, barreiras)
  const foci = Array.from({ length: 6 }, () => ({ x: MAP_W * rand(), y: MAP_H * rand(), s: 10 + rand() * 18, a: (rand() - 0.35) * 0.5 }));

  const hexes: Hex[] = [];
  let id = 0;
  for (let row = 0; row * h <= MAP_H + h; row++) {
    for (let col = -1; col * w <= MAP_W + w; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0);
      const y = row * h;
      if (!inside([x, y], OUTLINE)) continue;
      // Tempo de acesso ≈ distância ao polo mais próximo (ponderada pelo porte)
      let v = Math.min(...hubs.map(([hx, hy, s]) => dist(x, y, hx, hy) / s));
      for (const f of foci) v += f.a * MAP_W * 0.12 * Math.exp(-((x - f.x) ** 2 + (y - f.y) ** 2) / (2 * f.s ** 2));
      v += (rand() - 0.5) * 9;
      hexes.push({ id: id++, x, y, value: v, band: "baixa", wave: Math.hypot(x - MAP_W / 2, (y - MAP_H / 2) * 1.9) });
    }
  }

  // Normaliza (percentis, para a escala usar toda a faixa) e define as faixas
  const sorted = hexes.map((hx) => hx.value).sort((a, b) => a - b);
  const lo = sorted[Math.floor(sorted.length * 0.03)];
  const hi = sorted[Math.floor(sorted.length * 0.97)];
  const maxWave = Math.max(...hexes.map((hx) => hx.wave));
  for (const hx of hexes) {
    // Arredonda: servidor (Node) e navegador podem diferir na última casa
    // decimal das funções matemáticas, o que quebraria a hidratação
    hx.value = round(Math.min(1, Math.max(0, (hx.value - lo) / (hi - lo))));
    hx.band = hx.value < 0.38 ? "baixa" : hx.value < 0.7 ? "média" : "alta";
    hx.wave = round(hx.wave / maxWave);
    hx.x = round(hx.x);
    hx.y = round(hx.y);
  }
  return hexes;
}

export const HEXES = buildHexes();

/** Vértices de um hexágono de pontas para cima (raio r) */
export function hexPoints(x: number, y: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

/** Escala sequencial de uma cor: Névoa #E9EFE7 → Verde-rota #2D7C60 → Lima #D7F36A */
const STOPS: [number, [number, number, number]][] = [
  [0, [0xe9, 0xef, 0xe7]],
  [0.5, [0x2d, 0x7c, 0x60]],
  [1, [0xd7, 0xf3, 0x6a]],
];

export function scaleColor(t: number) {
  const v = Math.min(1, Math.max(0, t));
  const i = v <= STOPS[1][0] ? 0 : 1;
  const [a, ca] = STOPS[i];
  const [b, cb] = STOPS[i + 1];
  const f = (v - a) / (b - a);
  const c = ca.map((x, j) => Math.round(x + (cb[j] - x) * f));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

/**
 * Opacidade de destaque: a faixa baixa fica mais discreta sobre o vidro
 * escuro e a alta, plena — a ênfase acompanha a escala (mais difícil = mais
 * visível), sem trocar de cor.
 */
export const scaleOpacity = (t: number) => round(0.5 + 0.5 * Math.min(1, Math.max(0, t)));
