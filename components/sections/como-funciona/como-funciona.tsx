import Image from "next/image";
import type { ReactNode } from "react";

import { ComoLine, ComoNode } from "./como-line";
import { ComoMotion } from "./como-motion";
import { ComoPhone } from "./como-phone";
import { StepProvider } from "./como-step";
import { NeedCard, UnitCard } from "./step-cards";

/**
 * 04 · Como funciona — reprodução de referencias/landing/04-como-funciona.png.
 *
 * Desktop (xl): medidas da referência em u (1u = 1 px da imagem). O quadro
 * da imagem (fundo, numerais, cartões, linha e iPhone) encosta à direita em
 * telas largas (fx-*); título e parágrafo ficam a meio caminho (hx-*).
 * Abaixo de xl: adaptação empilhada (para aprovação).
 *
 * Fundo: imagem completa fornecida (1672×941, mesmo quadro da referência),
 * com protagonista, mapa claro e formas verde-pinho. Usada pixel a pixel.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/**
 * Contraste sobre a foto (desktop): a imagem de fundo põe parte dos textos
 * sobre as árvores. Halo claro nos textos escuros; sombra escura nos brancos.
 */
const haloClaro =
  "xl:[text-shadow:0_0_calc(var(--u)*14)_rgb(245_245_239/0.95),0_0_calc(var(--u)*4)_rgb(245_245_239/0.8)]";
const sombraEscura = "xl:[text-shadow:0_calc(var(--u)*1)_calc(var(--u)*12)_rgb(6_30_26/0.75)]";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

type Step = {
  numeral: ReactNode;
  title: string;
  text: string;
  /** Classes de posição no desktop (medidas na referência) */
  at: { numeral: string; title: string; rule: string; text: string };
  /** Etapa 03 fica sobre a fotografia escura */
  dark?: boolean;
  visual: ReactNode;
};

// Numerais (Space Grotesk 700, 107u): topo da tinta em y 442 / 438 / 378.
// Rótulos (25u): topo das maiúsculas em 533 / 528 / 467. Frases (Inter 20u):
// topo em 582 / 575 / 511. Fios lima em y 566 / 560 / 498.
const steps: Step[] = [
  {
    // O "1" da referência é uma barra reta (sem a bandeira do glifo da fonte)
    numeral: (
      <>
        0<span className="ml-[0.215em] inline-block h-[0.73em] w-[0.16em] bg-current" />
      </>
    ),
    title: "Necessidade",
    text: "O que você precisa?",
    at: {
      numeral: "xl:u-top-430 xl:u-left-79",
      title: "xl:u-top-530 xl:u-left-90",
      rule: "xl:u-top-565.5 xl:u-left-92",
      text: "xl:u-top-579 xl:u-left-91",
    },
    visual: <NeedCard className="mt-8 rotate-[-6deg] xl:absolute xl:u-top-607 xl:u-left-107 xl:mt-0" />,
  },
  {
    numeral: "02",
    title: "Unidade",
    text: "Encontre onde ser atendido.",
    at: {
      numeral: "xl:u-top-426 xl:u-left-608",
      title: "xl:u-top-525 xl:u-left-618",
      rule: "xl:u-top-559.5 xl:u-left-620",
      text: "xl:u-top-572 xl:u-left-619",
    },
    visual: <UnitCard className="mt-8 rotate-[-3deg] xl:absolute xl:u-top-609 xl:u-left-630 xl:mt-0" />,
  },
  {
    numeral: "03",
    title: "Percurso",
    text: "Descubra como chegar.",
    at: {
      numeral: "xl:u-top-366 xl:u-left-1304",
      title: "xl:u-top-464 xl:u-left-1316",
      rule: "xl:u-top-497.5 xl:u-left-1317",
      text: "xl:u-top-508 xl:u-left-1316",
    },
    dark: true,
    visual: (
      <div className="mt-8 xl:mt-0">
        <ComoPhone />
      </div>
    ),
  },
];

export function ComoFunciona() {
  return (
    <StepProvider>
      <ComoMotion
        id="como-funciona"
        data-theme="light"
        aria-labelledby="como-funciona-titulo"
        className="relative flex flex-col overflow-hidden bg-ref-fundo-04 py-20 focus:outline-none xl:block xl:u-h-941 xl:py-0"
      >
        {/* ---------------------------------------------------------------- */}
        {/* Fundo (desktop)                                                    */}
        {/* ---------------------------------------------------------------- */}
        <div aria-hidden="true" className={`absolute hidden xl:block ${FRAME}`}>
          {/* Telas mais largas que 16:9: a borda esquerda (mapa) se funde no fundo claro, como no Hero */}
          <div
            data-como="photo"
            className="absolute inset-0 [@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]"
          >
            <Image src="/images/como-funciona/04-como-fundo.webp" alt="" fill quality={90} sizes="100vw" className="object-fill" />
          </div>
          {/* Véu verde-pinho atrás da etapa 03 (como a mancha da referência), para o texto branco sobre as árvores */}
          <div className="absolute u-top-300 u-left-1170 u-h-330 u-w-520 bg-[radial-gradient(closest-side,rgb(11_46_41/0.55),rgb(11_46_41/0.3)_55%,transparent)]" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Etapas: numerais, rótulos, cartões, linha e iPhone                 */}
        {/* ---------------------------------------------------------------- */}
        <div className={`relative order-2 xl:absolute ${FRAME}`}>
          <ComoLine />

          <ol aria-label="Como funciona, em três etapas" className="container-site grid gap-16 xl:absolute xl:inset-0 xl:block xl:max-w-none xl:p-0">
            {steps.map((s, i) => (
              <li key={s.title} data-como="step" data-step={i} className="flex flex-col items-start xl:contents">
                <span
                  aria-hidden="true"
                  data-como={`numeral-${i}`}
                  className={`font-display text-[5.5rem] leading-none font-bold tracking-[-0.02em] xl:absolute xl:u-text-107 ${
                    s.dark ? `text-ref-numeral xl:text-ref-numeral-escuro ${sombraEscura}` : "text-ref-numeral"
                  } ${s.at.numeral}`}
                >
                  {s.numeral}
                </span>
                <h3
                  data-como={`title-${i}`}
                  className={`mt-2 font-display text-2xl leading-none font-bold tracking-[0.11em] uppercase xl:absolute xl:mt-0 xl:u-text-25 ${
                    s.dark ? `text-ref-rotulo-04 xl:text-white ${sombraEscura}` : `text-ref-rotulo-04 ${haloClaro}`
                  } ${s.at.title}`}
                >
                  {s.title}
                </h3>
                <span
                  aria-hidden="true"
                  data-como={`rule-${i}`}
                  className={`mt-3 block h-0.5 w-16 bg-linear-to-r from-ref-no-lima from-40% to-ref-no-lima/0 xl:absolute xl:mt-0 xl:u-h-2.5 xl:u-w-70 ${s.at.rule}`}
                />
                <p
                  data-como={`text-${i}`}
                  className={`mt-3 font-sans text-lg leading-none tracking-[-0.02em] xl:absolute xl:mt-0 xl:u-text-20 xl:whitespace-nowrap ${
                    s.dark ? `text-ref-pergunta xl:text-ref-pergunta-clara ${sombraEscura}` : `text-ref-pergunta ${haloClaro}`
                  } ${s.at.text}`}
                >
                  {s.text}
                </p>
                <div data-como={`visual-${i}`} className="w-full xl:contents">
                  {s.visual}
                </div>
              </li>
            ))}
          </ol>

          {/* Nós da linha (acima dos cartões) */}
          <ComoNode index={0} className="u-top-853 u-left-112" />
          <ComoNode index={1} className="u-top-803 u-left-587" />
          <ComoNode index={2} className="u-top-706 u-left-1222" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Texto                                                              */}
        {/* ---------------------------------------------------------------- */}
        <div className="container-site relative z-10 order-1 mb-14 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:hx-left-0 xl:mb-0 xl:u-w-1672 xl:max-w-none xl:p-0">
          <h2
            id="como-funciona-titulo"
            className={`pointer-events-auto flex flex-col ${haloClaro} font-display text-[clamp(1.9rem,0.9rem+4.4vw,4rem)] leading-[0.95] font-bold tracking-[-0.025em] text-ref-tinta-04 xl:absolute xl:u-top-154 xl:u-left-67 xl:u-text-77 xl:u-leading-71`}
          >
            {/* A 1ª linha da referência é um pouco mais espaçada entre palavras */}
            {["Do que você precisa", "ao caminho para chegar."].map((line, i) => (
              <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
                <span data-como="line" className={`block xl:whitespace-nowrap ${i === 0 ? "xl:[word-spacing:0.075em]" : ""} ${hidden}`}>
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <p
            data-como="lead"
            className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] text-ref-texto-04 xl:absolute xl:u-top-318 xl:u-left-69 xl:mt-0 xl:max-w-none xl:u-text-22 xl:u-leading-30 xl:tracking-[-0.015em] ${hidden}`}
          >
            O VIAS organiza a busca por necessidade, identifica unidades
            <br className="hidden xl:inline" /> com o serviço procurado nas fontes consultadas e apresenta
            <br className="hidden xl:inline" /> alternativas de deslocamento.
          </p>
        </div>
      </ComoMotion>
    </StepProvider>
  );
}
