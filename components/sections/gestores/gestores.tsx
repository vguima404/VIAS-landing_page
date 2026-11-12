import Image from "next/image";

import { GestoresMotion } from "./gestores-motion";
import { MapFx } from "./map-fx";
import { CoverageCard, TravelTimeCard } from "./panels";
import { RegionsCard } from "./regions-card";

/**
 * 07 · Para gestores — reprodução de referencias/landing/07-para-gestores.png.
 *
 * Fundo: imagem fornecida (1672×941, mesmo quadro da referência), usada pixel
 * a pixel: território em mapa, rede de rotas e linhas lima. Por cima, em
 * HTML/SVG: textos, destaque, painéis e o cartão de regiões (este último
 * construído conforme o pedido de 12/11: hexágonos, escala sequencial, selo).
 *
 * Desktop (xl): medidas em u (1u = 1 px da referência). Quadro encostado à
 * direita (fx-*); texto a meio caminho (hx-*). Abaixo de xl: empilhado.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

const titleLines = ["O mapa também", "mostra onde chegar", "é mais difícil."];

export function Gestores() {
  return (
    <GestoresMotion
      id="gestores"
      data-theme="dark"
      aria-labelledby="gestores-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-07 py-20 text-white focus:outline-none xl:block xl:u-h-941 xl:py-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Visual: território e painéis                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 mt-10 xl:absolute xl:inset-0 xl:mt-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video xl:absolute xl:inset-0 xl:aspect-auto xl:[@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]">
            <div data-ges="map" className="absolute inset-0">
              <Image
                src="/images/gestores/07-gestores-fundo.webp"
                alt="Mapa isométrico de um território dividido em regiões em tons de verde, com unidades de saúde marcadas e uma rede de rotas acesas."
                fill
                quality={90}
                sizes="100vw"
                className="object-cover object-[72%_50%] xl:object-fill"
              />
            </div>
          </div>

          <MapFx />

          {/* Fios dos painéis (desktop) */}
          <svg aria-hidden="true" viewBox="0 0 1672 941" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block">
            <defs>
              <linearGradient id="ges-wire-a" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-ref-fio-07)" stopOpacity="0.15" />
                <stop offset="1" stopColor="var(--color-ref-fio-07)" />
              </linearGradient>
              <linearGradient id="ges-wire-b" x1="0" x2="1">
                <stop offset="0" stopColor="var(--color-ref-fio-07)" />
                <stop offset="1" stopColor="var(--color-ref-fio-07)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path data-ges="wire" d="M790 250 H850" pathLength={1} strokeDasharray="1 1" stroke="url(#ges-wire-a)" strokeWidth="1.4" fill="none" />
            <path data-ges="wire" d="M543 729 C660 728 760 716 905 700" pathLength={1} strokeDasharray="1 1" stroke="url(#ges-wire-b)" strokeWidth="1.4" fill="none" />
          </svg>

          {/* Painéis: entram em sequência, com leve parallax */}
          <div className="container-site relative mt-8 grid justify-items-center gap-4 sm:grid-cols-2 xl:static xl:mt-0 xl:block xl:max-w-none xl:p-0">
            <div data-ges="panel" data-depth="0.6" className={`max-xl:[--u:min(1px,calc((100vw-3rem)/310))] xl:absolute xl:u-top-148 xl:u-left-850 ${hidden}`}>
              <CoverageCard />
            </div>
            <div data-ges="panel" data-depth="1" className={`max-xl:[--u:min(1px,calc((100vw-3rem)/310))] xl:absolute xl:u-top-181 xl:u-left-1407 ${hidden}`}>
              <TravelTimeCard />
            </div>
            <div data-ges="panel" data-depth="0.8" className={`max-xl:[--u:min(1px,calc((100vw-3rem)/310))] sm:col-span-2 xl:absolute xl:u-top-613 xl:u-left-1323 ${hidden}`}>
              <RegionsCard />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Texto                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="container-site relative z-10 order-1 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:hx-left-0 xl:u-w-1672 xl:max-w-none xl:p-0">
        <p
          data-ges="label"
          className={`flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.04em] text-ref-rotulo-07 uppercase xl:absolute xl:u-top-192 xl:u-left-75 xl:u-gap-16 xl:u-text-18 xl:u-leading-24 xl:tracking-[0.015em] ${hidden}`}
        >
          VIAS para gestores <span aria-hidden="true">/</span> Inteligência territorial
          <span aria-hidden="true" data-ges="label-rule" className="hidden h-px bg-ref-fio-07 xl:block xl:u-w-192" />
        </p>

        <h2
          id="gestores-titulo"
          className="pointer-events-auto mt-5 flex flex-col font-display text-[clamp(2.3rem,1.1rem+4.6vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white xl:absolute xl:u-top-244 xl:u-left-72 xl:mt-0 xl:u-text-87.5 xl:u-leading-78"
        >
          {titleLines.map((line) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-ges="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-ges="lead"
          className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] text-ref-texto-07 xl:absolute xl:u-top-516 xl:u-left-76 xl:mt-0 xl:max-w-none xl:u-text-23 xl:u-leading-32 xl:tracking-[-0.02em] ${hidden}`}
        >
          Para a gestão pública, <span className="text-ref-destaque-07">o VIAS</span> transforma
          <br className="hidden xl:inline" /> dados de saúde, mobilidade e população em
          <br className="hidden xl:inline" /> uma leitura territorial do tempo de deslocamento
          <br className="hidden xl:inline" /> até serviços essenciais.
        </p>

        <p
          data-ges="pill"
          className={`pointer-events-auto mt-8 flex items-center gap-4 rounded-xl border border-white/20 bg-ref-pilula-07/85 px-4 py-3 text-[0.9375rem] text-white/95 backdrop-blur-sm xl:absolute xl:u-top-700 xl:u-left-76 xl:mt-0 xl:u-h-60 xl:u-w-467 xl:u-gap-27 xl:rounded-[calc(var(--u)*12)] xl:py-0 xl:u-pl-12 xl:u-text-17.5 xl:tracking-[-0.02em] xl:whitespace-nowrap ${hidden}`}
        >
          <svg aria-hidden="true" data-ges="pill-pin" viewBox="0 0 30 41" className="h-8 w-6 shrink-0 xl:u-h-41 xl:u-w-30">
            <ellipse cx="15" cy="38.5" rx="11" ry="2.3" className="fill-ref-lima-07/80" />
            <path d="M15 37C10.5 30 1.5 22.5 1.5 14a13.5 13.5 0 0 1 27 0C28.5 22.5 19.5 30 15 37Z" className="fill-ref-lima-07" />
            <circle cx="15" cy="14" r="6.3" className="fill-white" />
            <circle cx="15" cy="14" r="4" className="fill-ref-fundo-07" />
          </svg>
          Da jornada individual ao planejamento urbano.
        </p>
      </div>
    </GestoresMotion>
  );
}
