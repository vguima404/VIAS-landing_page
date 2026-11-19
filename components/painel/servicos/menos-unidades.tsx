import { formatar, servicos } from "@/lib/painel-data";

import { WarningIcon } from "../painel-icons";
import { ClipboardIllustration, ServicoIcon } from "./servicos-icons";

/**
 * "Serviços com menos unidades na cidade" (referência 11: x 917–1656,
 * y 193–463): cartão verde-claro com os três serviços de menor oferta numa
 * caixa branca, o texto de apoio e a prancheta com lupa (que flutua).
 */

const menos = [...servicos].sort((a, b) => a.unidades - b.unidades).slice(0, 3);

export function MenosUnidades() {
  return (
    <section
      data-pm="card"
      aria-labelledby="menos-titulo"
      className="relative mx-5 overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#e6f6ea,#e9f5eb_55%,#e2f2e6)] p-5 shadow-[0_1px_2px_rgb(12_50_38/0.04),0_10px_28px_-16px_rgb(12_50_38/0.2)] sm:mx-8 xl:absolute xl:m-0 xl:p-0 xl:u-top-193 xl:u-left-707 xl:u-h-271 xl:u-w-740 xl:u-rounded-18 [.motion-ready_&]:opacity-0"
    >
      {/* Mancha clara atrás da prancheta */}
      <span aria-hidden="true" className="absolute -right-16 -bottom-20 hidden size-72 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.75),transparent_68%)] sm:block xl:-u-right-40 xl:-u-bottom-70 xl:u-size-300" />

      <div className="relative flex items-center gap-3 xl:static xl:block">
        <span data-pm="warn" className="block shrink-0 xl:absolute xl:u-top-20 xl:u-left-22">
          <WarningIcon className="w-10 text-[#157351] xl:u-w-54" />
        </span>
        <h2 id="menos-titulo" className="text-lg leading-tight font-bold text-ref-tinta-10 xl:absolute xl:u-top-34 xl:u-left-96 xl:u-text-20.75 xl:leading-none xl:whitespace-nowrap">
          Serviços com menos unidades na cidade
        </h2>
      </div>

      <div className="relative mt-4 flex flex-col gap-5 sm:flex-row sm:items-center xl:static xl:mt-0 xl:block">
        {/* Os três de menor oferta */}
        <ul className="flex-1 rounded-xl bg-white/90 px-3 shadow-[0_8px_24px_-16px_rgb(12_60_40/0.35)] xl:absolute xl:u-top-89 xl:u-left-13 xl:u-h-165 xl:u-w-397 xl:u-rounded-14 xl:px-0">
          {menos.map((s, i) => (
            <li
              key={s.nome}
              data-pm="row"
              className="relative flex items-center gap-3 py-2.5 xl:absolute xl:inset-x-0 xl:top-[calc(var(--u)*var(--top))] xl:u-h-53 xl:py-0 [.motion-ready_&]:opacity-0"
              style={{ "--top": 4.5 + i * 53 } as React.CSSProperties}
            >
              {i > 0 && <span aria-hidden="true" className="absolute top-0 right-0 left-0 h-px bg-[#eef3f0] xl:u-left-12 xl:u-right-14 xl:u-h-1.5" />}
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eaf7ee] xl:absolute xl:top-1/2 xl:u-left-17 xl:u-size-46 xl:-translate-y-1/2">
                <ServicoIcon icone={s.icone} className="w-5 text-ref-icone-10 xl:u-w-25" />
              </span>
              <span className="flex-1 text-[0.9375rem] text-ref-rotulo-10 xl:absolute xl:top-1/2 xl:u-left-84 xl:-translate-y-1/2 xl:u-text-17 xl:leading-none xl:whitespace-nowrap">
                {s.nome}
              </span>
              <strong className="text-[1.25rem] font-bold text-ref-tinta-10 xl:absolute xl:top-1/2 xl:u-right-23 xl:-translate-y-1/2 xl:u-text-23.25 xl:leading-none">
                <span data-count={s.unidades}>{formatar(s.unidades)}</span>
              </strong>
            </li>
          ))}
        </ul>

        <span aria-hidden="true" className="hidden w-px self-stretch bg-[#89ad9a] sm:block xl:absolute xl:u-top-92 xl:u-left-436 xl:u-h-160 xl:u-w-1.5" />

        <p className="text-[0.9375rem] leading-snug text-[#163c2b] sm:w-40 xl:absolute xl:u-top-86.75 xl:u-left-465 xl:w-auto xl:u-text-15.5 xl:u-leading-22 xl:whitespace-nowrap">
          Serviços com <br className="hidden xl:inline" />
          baixa oferta podem <br className="hidden xl:inline" />
          indicar áreas que <br className="hidden xl:inline" />
          merecem atenção <br className="hidden xl:inline" />
          da gestão.
        </p>

        <span data-pm="clip" className="hidden shrink-0 sm:block xl:absolute xl:u-top-78 xl:u-left-606">
          <ClipboardIllustration className="w-20 animate-float text-[#0f6446] xl:u-w-121.5" />
        </span>
      </div>
    </section>
  );
}
