import { formatar, visaoGeral as d } from "@/lib/painel-data";

import { InfoIcon, WarningIcon } from "../painel-icons";

/**
 * "Acessibilidade física" (referência: x 1146–1503, y 434–786): cartão
 * âmbar de alerta, com o dado que a fonte não publica.
 */
export function AcessibilidadeFisica() {
  return (
    <section
      data-pm="card"
      aria-labelledby="acess-titulo"
      className="relative mx-5 rounded-2xl border border-ref-alerta-borda-10 bg-ref-alerta-fundo-10 p-5 text-ref-alerta-texto-10 shadow-[0_10px_28px_-16px_rgb(120_80_10/0.25)] sm:mx-8 xl:absolute xl:m-0 xl:p-0 xl:u-top-434 xl:u-left-936 xl:u-h-352 xl:u-w-358 xl:u-rounded-16 xl:u-border-1 [.motion-ready_&]:opacity-0"
    >
      <div className="flex items-center gap-3 xl:block">
        <span data-pm="warn" className="block shrink-0 xl:absolute xl:u-top-25 xl:u-left-23">
          <WarningIcon className="w-8 text-ref-alerta-icone-10 xl:u-w-36" />
        </span>
        <h2 id="acess-titulo" className="text-lg font-bold text-ref-alerta-titulo-10 xl:absolute xl:u-top-30.5 xl:u-left-74 xl:u-text-17.5 xl:leading-none">
          Acessibilidade física
        </h2>
      </div>

      <p className="mt-5 text-[1.125rem] leading-snug font-bold text-ref-alerta-titulo-10 xl:absolute xl:mt-0 xl:u-top-102.5 xl:u-left-23 xl:u-w-320 xl:u-text-18.75 xl:u-leading-24.5">
        Acessibilidade física:
        <br />
        não informada pela fonte em <br className="hidden xl:inline" />
        <span data-count={d.unidades}>{formatar(d.unidades)}</span> unidades.
      </p>

      <span aria-hidden="true" className="my-5 block h-px bg-ref-alerta-fio-10 xl:absolute xl:my-0 xl:u-top-202.5 xl:u-left-24 xl:u-h-1.5 xl:u-w-311" />

      <div className="flex gap-3 xl:block">
        <InfoIcon className="mt-0.5 size-5 shrink-0 text-ref-alerta-icone-10 xl:absolute xl:mt-0 xl:u-top-234 xl:u-left-23 xl:u-size-22" />
        <p className="text-[0.9375rem] leading-snug xl:absolute xl:u-top-230.5 xl:u-left-60 xl:u-w-280 xl:u-text-16 xl:u-leading-21">
          O CNES não publica acessibilidade física. Este é um dado que a gestão pode levantar.
        </p>
      </div>
    </section>
  );
}
