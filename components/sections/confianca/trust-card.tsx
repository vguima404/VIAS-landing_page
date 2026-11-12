import { CheckIcon, InfoIcon, PinIcon } from "@/components/ui/icons";

/**
 * Cartão da unidade (referência 08), branco, 323 × 435u. Medidas internas em
 * u, relativas ao canto do cartão. Ilustração da interface (dados
 * demonstrativos, com o selo da própria referência).
 *
 * Os nós (data-trust="node") marcam onde os fios das anotações 01/02/03 se
 * ligam: fonte, aviso e localização.
 */

/** Abaixo de xl: 1u acompanha a largura da tela, até 1 px */
const mobileUnit = "max-xl:[--u:min(1px,calc((100vw-3rem)/323))]";

export function TrustCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        mobileUnit,
        "relative u-h-435 u-w-323 rounded-[calc(var(--u)*22)] bg-white text-ref-cartao-texto-08",
        "shadow-[0_calc(var(--u)*24)_calc(var(--u)*50)_calc(var(--u)*-18)_rgb(40_30_10/0.35),0_calc(var(--u)*2)_calc(var(--u)*8)_rgb(40_30_10/0.1)]",
        className,
      ].join(" ")}
    >
      <p className="absolute u-top-28 u-left-22 font-mono u-text-16 u-leading-20 tracking-[0.02em] text-ref-rotulo-08 uppercase">Unidade de saúde</p>
      <h3 className="absolute u-top-57 u-left-21 font-display u-text-25 u-leading-30 font-bold tracking-[-0.025em] whitespace-nowrap text-ref-tinta-08">
        Unidade demonstrativa
      </h3>

      {/* 01 · Fonte do dado */}
      <div data-trust="row" className="absolute u-top-110 u-left-22 u-h-83 u-w-278 rounded-[calc(var(--u)*10)] bg-ref-caixa-08">
        <span aria-hidden="true" className="absolute u-top-28.5 u-left-9.5 grid u-size-25 place-items-center rounded-full bg-ref-check-08 text-white">
          <CheckIcon className="u-size-16" strokeWidth={3} />
        </span>
        <p className="absolute u-top-14 u-left-58 font-sans u-text-17 u-leading-27 tracking-[-0.015em] whitespace-nowrap">
          <strong className="font-bold text-ref-tinta-08">Mamógrafo cadastrado</strong>
          <br />
          Fonte: CNES
        </p>
      </div>
      <span data-trust="node" aria-hidden="true" className="absolute u-top-140 u-left-279 block u-size-11 -translate-1/2 rounded-full bg-ref-no-lima-08" />

      {/* 02 · O que o cadastro não confirma */}
      <div data-trust="row" className="absolute u-top-218 u-left-22">
        <InfoIcon aria-hidden="true" className="absolute u-top-11 u-left-5 u-size-26 text-ref-cartao-texto-08" strokeWidth={1.7} />
        <p className="absolute u-left-50 font-sans u-text-16 u-leading-23 tracking-[-0.02em] whitespace-nowrap">
          O cadastro do equipamento
          <br /> não confirma disponibilidade
          <br /> de vagas ou agendamento.
        </p>
      </div>
      <span data-trust="node" aria-hidden="true" className="absolute u-top-255 u-left-297 block u-size-11 -translate-1/2 rounded-full bg-ref-no-verde-08" />

      <span aria-hidden="true" className="absolute u-top-320 u-left-22 block h-px u-w-278 bg-[#dadada]" />

      {/* 03 · Localização */}
      <div data-trust="row" className="absolute u-top-341 u-left-25 flex items-center u-gap-14">
        <PinIcon aria-hidden="true" className="u-size-22 shrink-0 text-ref-cartao-texto-08" strokeWidth={1.8} />
        <p className="font-sans u-text-13 u-leading-20 tracking-[-0.03em] whitespace-nowrap">Localização · usada com sua permissão</p>
      </div>
      <span data-trust="node" aria-hidden="true" className="absolute u-top-355 u-left-297 block u-size-11 -translate-1/2 rounded-full bg-ref-no-verde-08" />

      <span aria-hidden="true" className="absolute u-top-385 u-left-22 block h-px u-w-278 bg-[#dadada]" />

      <p className="absolute inset-x-0 u-top-401 text-center font-sans u-text-14 u-leading-20 tracking-[-0.015em] text-[#4a5051]">
        Demonstração — dados ilustrativos
      </p>
    </div>
  );
}
