import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { BuildingIcon, BusIcon, NetworkIcon, PinIcon } from "@/components/ui/icons";

import { InteligenciaMotion } from "./inteligencia-motion";

/**
 * 06 · Inteligência e integração — reprodução de
 * referencias/landing/06-inteligencia-integracao.png.
 *
 * Visual: vídeo fornecido das camadas se erguendo sobre o mapa (1,5×, todos
 * os quadros-chave), comandado pelo scroll durante um momento sticky. O
 * último quadro é a composição da referência: alinhado por correlação em
 * escala 1,328 com canto em (−22, 4,6)u dentro do quadro de 1672×941u.
 * Sem JS, com movimento reduzido e no mobile: imagem do último quadro.
 *
 * Desktop (xl): medidas em u (1u = 1 px da referência). Quadro encostado à
 * direita (fx-*); texto a meio caminho (hx-*). Abaixo de xl: empilhado.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

/** Caixa do vídeo (e do pôster) dentro do quadro, medida na referência */
const VIDEO_BOX =
  "xl:inset-auto xl:left-[calc(var(--u)*-22)] xl:top-[calc(var(--u)*4.5)] xl:h-[calc(var(--u)*956)] xl:w-[calc(var(--u)*1699.5)]";

type Layer = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: [string, string];
  /** Topo e largura do cartão; o nó fica em x 1298, na altura medida */
  card: string;
  node: string;
};

// Cartões: x 1363, 86u de altura; topos 147 / 313 / 469 / 632.
// Nós (x 1298) em y 189 / 352 / 509 / 669, ligados ao cartão por um fio.
const layers: Layer[] = [
  { Icon: BuildingIcon, title: "01 — SAÚDE", text: ["Unidades, serviços", "e equipamentos."], card: "xl:u-top-147 xl:u-w-219", node: "xl:u-top-189" },
  { Icon: BusIcon, title: "02 — MOBILIDADE", text: ["Linhas, pontos e", "alternativas de transporte."], card: "xl:u-top-313 xl:u-w-257", node: "xl:u-top-352" },
  { Icon: PinIcon, title: "03 — TERRITÓRIO", text: ["População, regiões", "e infraestrutura urbana."], card: "xl:u-top-469 xl:u-w-249", node: "xl:u-top-509" },
  {
    Icon: NetworkIcon,
    title: "04 — INTELIGÊNCIA",
    text: ["Interpretação das necessidades", "e conexão de informações."],
    card: "xl:u-top-632 xl:u-w-269",
    node: "xl:u-top-669",
  },
];

const titleLines = ["Conectar dados", "é o que transforma", "localização em acesso."];

export function Inteligencia() {
  return (
    <InteligenciaMotion
      id="tecnologia"
      data-theme="light"
      aria-labelledby="inteligencia-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-06 py-20 focus:outline-none xl:block xl:u-h-941 xl:py-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Visual: camadas (vídeo comandado pelo scroll) e cartões              */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 mt-10 xl:absolute xl:inset-0 xl:mt-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          {/* Telas mais largas que 16:9: a borda esquerda se funde no fundo claro, como no Hero */}
          <div className="relative aspect-video w-full overflow-hidden xl:absolute xl:inset-0 xl:aspect-auto xl:overflow-visible xl:[@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]">
            <div className={`absolute inset-0 ${VIDEO_BOX}`}>
              <Image
                src="/images/inteligencia/06-camadas-final.webp"
                alt="Quatro camadas de mapa empilhadas sobre o território — saúde, mobilidade, território e inteligência —, atravessadas por uma linha de acesso lima até o destino."
                fill
                quality={90}
                sizes="100vw"
                className="object-cover"
              />
              {/* Vídeo: só no desktop; carregado e comandado pelo scroll (InteligenciaMotion) */}
              <video
                data-intel="video"
                aria-hidden="true"
                muted
                playsInline
                preload="none"
                className="absolute inset-0 hidden h-full w-full object-cover opacity-0 xl:block"
              />
            </div>
          </div>

          {/* Cartões das camadas, ligados às placas por fios com nó */}
          <ol
            aria-label="Camadas de informação"
            className="container-site relative mt-8 grid gap-3 sm:grid-cols-2 xl:static xl:mt-0 xl:block xl:max-w-none xl:p-0"
          >
            {layers.map(({ Icon, title, text, card, node }) => (
              <li key={title} data-intel="layer" className="xl:contents">
                <span
                  aria-hidden="true"
                  data-intel="wire"
                  className={`absolute hidden h-[calc(var(--u)*1.5)] origin-left -translate-y-1/2 bg-linear-to-r from-ref-no-06 to-white/70 xl:block xl:u-left-1298 xl:u-w-65 ${node}`}
                />
                <span
                  aria-hidden="true"
                  data-intel="node"
                  className={`absolute hidden u-size-11 -translate-1/2 rounded-full bg-ref-no-06 shadow-[0_0_0_calc(var(--u)*2.5)_rgb(184_212_42/0.3)] xl:block xl:u-left-1298 ${node}`}
                />
                <div
                  data-intel="card"
                  className={[
                    "relative flex items-center gap-4 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_10px_30px_-18px_rgb(6_30_24/0.5)] backdrop-blur-md",
                    `xl:absolute xl:u-left-1363 xl:u-h-86 xl:gap-0 xl:rounded-[calc(var(--u)*18)] xl:p-0 ${card} ${hidden}`,
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-ref-icone-06/15 bg-white/60 text-ref-icone-06 xl:absolute xl:u-top-10 xl:u-left-11 xl:u-size-52 xl:border-[calc(var(--u)*1.5)]"
                  >
                    <Icon className="size-6 xl:u-size-30" strokeWidth={2.1} />
                  </span>
                  <div className="xl:absolute xl:u-top-15.5 xl:u-left-77">
                    <h3 className="font-sans text-[0.9375rem] leading-tight font-bold text-ref-cartao-titulo-06 xl:u-text-14.25 xl:u-leading-18 xl:tracking-[-0.01em] xl:whitespace-nowrap">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-ref-cartao-texto-06 xl:u-mt-7 xl:u-text-12 xl:u-leading-17 xl:tracking-[-0.02em] xl:whitespace-nowrap">
                      {text[0]}
                      <br className="hidden xl:inline" /> {text[1]}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Texto                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="container-site relative z-10 order-1 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:hx-left-0 xl:u-w-1672 xl:max-w-none xl:p-0">
        <p
          data-intel="label"
          className={`flex items-center gap-4 font-sans text-[0.6875rem] font-medium tracking-[0.14em] text-ref-rotulo-06 xl:tracking-[0.215em] uppercase xl:absolute xl:u-top-213 xl:u-left-65 xl:u-gap-28 xl:u-text-15 ${hidden}`}
        >
          <span aria-hidden="true" className="block h-px w-10 bg-current xl:u-h-1.5 xl:u-w-47" />
          Inteligência • Dados • Território
        </p>

        <h2
          id="inteligencia-titulo"
          className="pointer-events-auto mt-5 flex flex-col font-display text-[clamp(2.3rem,1.2rem+4.4vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.035em] text-ref-tinta-06 xl:absolute xl:u-top-264 xl:u-left-63 xl:mt-0 xl:u-text-72 xl:u-leading-69.5"
        >
          {titleLines.map((line) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-intel="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-intel="lead"
          className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] text-ref-texto-06 xl:absolute xl:u-top-501 xl:u-left-64 xl:mt-0 xl:max-w-none xl:u-text-22 xl:u-leading-31.25 xl:tracking-[-0.02em] ${hidden}`}
        >
          O VIAS combina informações de saúde,
          <br className="hidden xl:inline" /> mobilidade e território para aproximar
          <br className="hidden xl:inline" /> a necessidade da unidade adequada
          <br className="hidden xl:inline" /> e do caminho possível.
        </p>
      </div>
    </InteligenciaMotion>
  );
}
