/**
 * Linha de Acesso da referência 04: entra pela esquerda, passa pelo nó da
 * etapa 01, sobe até o nó da 02, corre por baixo do cartão da unidade e
 * chega, já em lima, ao nó da 03, na borda do iPhone.
 *
 * Coordenadas em px da referência (viewBox 1672×941), traçadas na imagem.
 * O primeiro trecho começa fora do quadro (x < 0) para continuar até a borda
 * da tela quando ela é mais larga que 16:9.
 *
 * Cada trecho tem pathLength=1: a seção desenha a linha ajustando
 * stroke-dashoffset (data-como="line-a1" / "line-a2" / "line-b"). Sem JS,
 * fica completa.
 */

const LINE_A1 = "M-760 700 C-420 712 -110 760 0 806.5 C40 824 80 841 112 853";
const LINE_A2 = "M112 853 C160 872 205 893 245 892 C300 890 420 852 500 841.5 C540 835 566 820 587 803";
const LINE_B = "M587 803 C650 760 900 748 1000 712 C1060 690 1090 668 1124 667.5 C1160 667 1195 688 1222 706";

/** Nós: centro em px da referência */
export const NODES = [
  { x: 112, y: 853 },
  { x: 587, y: 803 },
  { x: 1222, y: 706 },
] as const;

export function ComoLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1672 941"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
    >
      <defs>
        <filter id="como-line-glow" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {[LINE_A1, LINE_A2].map((d, i) => (
        <path
          key={d}
          data-como={`line-a${i + 1}`}
          d={d}
          pathLength={1}
          strokeDasharray="1 1"
          fill="none"
          strokeWidth="4.2"
          strokeLinecap="round"
          className="stroke-ref-linha-04"
        />
      ))}

      <g data-como="line-b-group">
        <path
          data-como="line-b-glow"
          d={LINE_B}
          pathLength={1}
          strokeDasharray="1 1"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#como-line-glow)"
          className="stroke-ref-linha-lima opacity-60"
        />
        <path
          data-como="line-b"
          d={LINE_B}
          pathLength={1}
          strokeDasharray="1 1"
          fill="none"
          strokeWidth="3.6"
          strokeLinecap="round"
          className="stroke-ref-linha-lima"
        />
      </g>
    </svg>
  );
}

/**
 * Nó da referência 04: anel lima com miolo branco; os nós sobre o verde
 * ganham halo. Posicionado pelo centro (u-*), dentro do quadro.
 */
export function ComoNode({ index, className = "" }: { index: 0 | 1 | 2; className?: string }) {
  const glow = [
    "",
    "shadow-[0_0_calc(var(--u)*14)_calc(var(--u)*3)_rgb(196_232_60/0.55)]",
    "shadow-[0_0_calc(var(--u)*18)_calc(var(--u)*8)_rgb(196_232_60/0.7)]",
  ][index];
  const ring = index === 2 ? "u-size-24 border-[calc(var(--u)*5)] border-ref-no-lima/80" : "u-size-29 border-[calc(var(--u)*7.5)] border-ref-no-lima";

  // Camada externa posiciona (translate do Tailwind); a interna é animada pelo GSAP
  return (
    <span aria-hidden="true" className={`absolute hidden -translate-1/2 xl:block ${className}`}>
      <span data-como="node" className={`block rounded-full bg-white ${ring} ${glow}`} />
    </span>
  );
}
