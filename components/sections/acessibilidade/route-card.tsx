import { AccessibilityIcon, ArrowRightIcon, CheckIcon, ExclamationIcon } from "@/components/ui/icons";

/**
 * Cartão "Acessibilidade na rota" (referência 05).
 *
 * Medidas internas em u, no plano do cartão (a referência foi retificada pela
 * perspectiva medida): 328 × 445u. No desktop o cartão recebe a inclinação 3D
 * da imagem pela prop className; abaixo de xl fica plano e redefine --u para
 * caber na coluna.
 */

/** Abaixo de xl: 1u acompanha a largura da tela, até 1,1 px */
const mobileUnit = "max-xl:[--u:min(1.1px,calc((100vw-3rem)/328))]";

type Item = {
  lines: [string, string?];
  /** Topo da caixa de texto (Inter 18u, entrelinha 23u), medido pela linha de base */
  top: string;
  /** Centro do círculo de estado */
  dot: string;
  state: "ok" | "alerta";
  /** Divisor abaixo do item (y no cartão) */
  rule?: string;
};

const items: Item[] = [
  { lines: ["Ônibus acessível", "na linha selecionada"], top: "u-top-99", dot: "u-top-117 u-left-50", state: "ok", rule: "u-top-150" },
  { lines: ["Estação com elevador"], top: "u-top-169", dot: "u-top-177 u-left-51", state: "ok", rule: "u-top-203" },
  { lines: ["Caminho com", "piso tátil"], top: "u-top-219", dot: "u-top-231 u-left-52", state: "ok", rule: "u-top-277" },
  { lines: ["Trecho com", "informação em análise"], top: "u-top-296", dot: "u-top-315 u-left-53", state: "alerta" },
];

export function RouteCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        mobileUnit,
        "relative u-h-445 u-w-328 shrink-0 rounded-[calc(var(--u)*20)] border border-white/70 bg-ref-cartao-05/95 text-ref-cartao-texto-05 backdrop-blur-sm",
        "shadow-[0_calc(var(--u)*24)_calc(var(--u)*48)_calc(var(--u)*-16)_rgb(6_30_24/0.45),0_calc(var(--u)*2)_calc(var(--u)*8)_rgb(6_30_24/0.14)]",
        className,
      ].join(" ")}
    >
      {/* Cabeçalho */}
      <AccessibilityIcon aria-hidden="true" className="absolute u-top-24 u-left-34 u-size-36 text-ref-cartao-titulo-05" strokeWidth={2.4} />
      <h3 className="absolute u-top-29 u-left-85 font-display u-text-20.5 u-leading-24 font-semibold tracking-[-0.01em] whitespace-nowrap text-ref-cartao-titulo-05">
        Acessibilidade na rota
      </h3>
      <span aria-hidden="true" className="absolute u-top-77 u-left-24 block h-px u-w-278 bg-ref-divisor-05" />

      {/* Trilho que liga os estados */}
      <span aria-hidden="true" className="absolute u-top-130 u-left-51.5 block u-h-170 w-px bg-ref-divisor-05" />

      <ul aria-label="Acessibilidade na rota">
        {items.map((it) => (
          <li key={it.lines.join(" ")} data-acess="card-item">
            <span
              aria-hidden="true"
              className={`absolute grid u-size-26 -translate-1/2 place-items-center rounded-full ${it.dot} ${
                it.state === "ok" ? "bg-ref-check-05 text-white" : "bg-ref-alerta-05 text-white"
              } shadow-[0_0_0_calc(var(--u)*2.5)_rgb(236_236_231)]`}
            >
              {it.state === "ok" ? (
                <CheckIcon className="u-size-17" strokeWidth={3} />
              ) : (
                <ExclamationIcon className="u-size-18" strokeWidth={3.2} />
              )}
            </span>
            <span
              className={`absolute u-left-92 font-sans u-text-18 u-leading-23 tracking-[-0.01em] whitespace-nowrap ${it.top}`}
            >
              {it.state === "alerta" && <span className="sr-only">Atenção: </span>}
              {it.lines[0]}
              {it.lines[1] && (
                <>
                  <br /> {it.lines[1]}
                </>
              )}
            </span>
            {it.rule && <span aria-hidden="true" className={`absolute u-left-90 block h-px u-w-212 bg-ref-divisor-05 ${it.rule}`} />}
          </li>
        ))}
      </ul>

      {/* Botão (ilustração da interface do app: não navega) */}
      <div
        aria-hidden="true"
        data-acess="card-button"
        className="absolute u-top-368 u-left-26 flex u-h-53 u-w-275 items-center justify-between rounded-[calc(var(--u)*14)] bg-ref-botao-05 u-pr-22 u-pl-36 font-sans u-text-19 font-medium tracking-[-0.01em] text-white shadow-[0_calc(var(--u)*6)_calc(var(--u)*12)_calc(var(--u)*-6)_rgb(6_30_24/0.5)]"
      >
        Ver rotas alternativas
        <ArrowRightIcon className="u-size-22" strokeWidth={2} />
      </div>
    </div>
  );
}
