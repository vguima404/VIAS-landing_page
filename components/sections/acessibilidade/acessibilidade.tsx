import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { AlertTriangleIcon, BusIcon, ElevatorIcon, WalkIcon } from "@/components/ui/icons";

import { AcessibilidadeMotion } from "./acessibilidade-motion";
import { CardTilt } from "./card-tilt";
import { RouteCard } from "./route-card";

/**
 * 05 · Acessibilidade — reprodução de referencias/landing/05-acessibilidade.png.
 *
 * Desktop (xl): medidas da referência em u (1u = 1 px da imagem). O quadro
 * da imagem (fundo, cartão e rota) encosta à direita em telas largas (fx-*);
 * título, parágrafo e lista ficam a meio caminho (hx-*), como nas seções
 * anteriores. Abaixo de xl: adaptação empilhada (para aprovação).
 *
 * Fundo: imagem completa fornecida (1672×941, mesmo quadro da referência),
 * usada pixel a pixel. Cartão e rota do mapa são HTML/SVG por cima.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

const titleLines = ["O caminho", "também precisa", "funcionar para", "quem percorre."];

type Feature = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  /** Anel escuro (1º e 4º itens) ou claro (2º e 3º), como na referência */
  ring: "dark" | "light";
};

// Ícones: círculos de 51u em x 118–169; centros em y 622,5 / 679 / 736 / 792,5
const features: Feature[] = [
  { Icon: BusIcon, text: "Veículos acessíveis", ring: "dark" },
  { Icon: ElevatorIcon, text: "Estações com elevadores", ring: "light" },
  { Icon: WalkIcon, text: "Caminhos e infraestrutura", ring: "light" },
  { Icon: AlertTriangleIcon, text: "Informações em falta", ring: "dark" },
];

/**
 * Rota do minimapa (px da referência): nó de saída → nó do destino → segue
 * para a borda. Na referência ela sai em x 1357; no fundo fornecido o joelho
 * cobre esse ponto (borda em x ≈ 1416), então a rota começa logo depois dele,
 * mantendo a mesma curva (decisão de 12/11).
 */
const ROUTE_A = "M1432 769.3 C1456 773 1470 771 1487 762 C1510 749 1530 727 1555 715 C1572 711 1590 712.5 1607 713";
const ROUTE_B = "M1607 713 C1624 703 1638 690 1648 671 C1656 656 1663 645 1680 628";

export function Acessibilidade() {
  return (
    <AcessibilidadeMotion
      id="acessibilidade"
      data-theme="light"
      aria-labelledby="acessibilidade-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-05 py-20 focus:outline-none xl:block xl:u-h-941 xl:py-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Visual: fotografia, cartão e rota                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 mt-12 xl:absolute xl:inset-0 xl:mt-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          {/* Telas mais largas que 16:9: a borda esquerda se funde no fundo claro, como no Hero */}
          <div
            data-acess="photo-plane"
            className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11] xl:absolute xl:inset-0 xl:aspect-auto xl:[@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]"
          >
            <div data-acess="photo" className={`absolute inset-0 ${hidden}`}>
              <Image
                src="/images/acessibilidade/05-acessibilidade-fundo.webp"
                alt="Homem em cadeira de rodas sorrindo numa estação de transporte, com um ônibus ao fundo."
                fill
                quality={90}
                sizes="100vw"
                className="object-cover object-[64%_50%] xl:object-fill"
              />
            </div>
          </div>

          {/* Rota no mapa verde (canto inferior direito) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1672 941"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
          >
            {[ROUTE_A, ROUTE_B].map((d, i) => (
              <path
                key={d}
                data-acess={`route-${i}`}
                d={d}
                pathLength={1}
                strokeDasharray="1 1"
                fill="none"
                strokeWidth="3.4"
                strokeLinecap="round"
                className="stroke-ref-rota-05"
              />
            ))}
          </svg>
          <span data-acess="route-node" aria-hidden="true" className="absolute hidden u-top-769.25 u-left-1432 -translate-1/2 xl:block">
            <span className="block u-size-17 rounded-full border-[calc(var(--u)*4)] border-ref-rota-05 bg-white" />
          </span>
          <span data-acess="route-node" aria-hidden="true" className="absolute hidden u-top-713 u-left-1607 -translate-1/2 xl:block">
            <span className="block u-h-15 u-w-19 rounded-full border-[calc(var(--u)*3.5)] border-ref-pin-05 bg-white" />
          </span>
          {/* Pin do destino: ponta encostada no nó */}
          <svg
            data-acess="pin"
            aria-hidden="true"
            viewBox="0 0 36 52"
            className="absolute hidden u-top-646 u-left-1589 u-h-58 u-w-36 origin-bottom drop-shadow-[0_calc(var(--u)*3)_calc(var(--u)*4)_rgb(0_0_0/0.35)] xl:block"
          >
            <path d="M18 51C13 41 2 31 2 18a16 16 0 0 1 32 0c0 13-11 23-16 33Z" className="fill-ref-pin-05" />
            <circle cx="18" cy="18" r="9" className="fill-white" />
            <circle cx="18" cy="18" r="6.2" className="fill-ref-pin-centro-05" />
          </svg>

          {/* Cartão: posição e inclinação 3D medidas na referência (cantos ±6u); hover como o iPhone */}
          <div
            data-acess="card"
            className={`relative z-10 mx-auto -mt-24 w-fit sm:-mt-40 xl:absolute xl:u-top-222.5 xl:u-left-1226.75 xl:mx-0 xl:mt-0 ${hidden}`}
          >
            <CardTilt>
              <RouteCard />
            </CardTilt>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Texto e lista                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="container-site relative z-10 order-1 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:hx-left-0 xl:u-w-1672 xl:max-w-none xl:p-0">
        <h2
          id="acessibilidade-titulo"
          className="pointer-events-auto flex flex-col font-display text-[clamp(2.4rem,1.3rem+4.4vw,4.25rem)] leading-[0.92] font-bold tracking-[-0.03em] text-ref-tinta-05 xl:absolute xl:u-top-176 xl:u-left-68 xl:u-text-68.5 xl:u-leading-63.25"
        >
          {titleLines.map((line) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-acess="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-acess="lead"
          className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] text-ref-texto-05 xl:absolute xl:u-top-464 xl:u-left-70 xl:mt-0 xl:max-w-none xl:u-text-19.5 xl:u-leading-26.25 xl:tracking-[-0.03em] ${hidden}`}
        >
          Mobilidade acessível depende de mais do que
          <br className="hidden xl:inline" /> uma rota desenhada. O VIAS considera informações
          <br className="hidden xl:inline" /> sobre veículos, estações e caminhos — e sinaliza
          <br className="hidden xl:inline" /> quando algum trecho ainda não tem confirmação.
        </p>

        {/* Lista com trilho vertical e nó lima */}
        <div className="pointer-events-auto relative mt-10 xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0">
          <span
            aria-hidden="true"
            data-acess="rail"
            className={`absolute top-1 bottom-1 left-[1.5625rem] w-0.5 origin-top rounded-full bg-ref-trilho-05 xl:top-auto xl:bottom-auto xl:u-top-593 xl:u-left-70.5 xl:u-h-204 xl:u-w-2 xl:rounded-b-[calc(var(--u)*8)] ${hidden}`}
          />
          <span
            aria-hidden="true"
            data-acess="rail-node"
            className={`absolute top-6 left-[1.625rem] size-3.5 -translate-1/2 rounded-full bg-ref-no-lima-05 xl:u-top-626 xl:u-left-71.5 xl:u-size-16 ${hidden}`}
          />
          <ul aria-label="O que o VIAS considera" className="pointer-events-auto grid gap-3 pl-14 xl:absolute xl:u-top-594 xl:u-left-118 xl:block xl:pl-0">
            {features.map(({ Icon, text, ring }) => (
              <li key={text} data-acess="feature" className={`flex items-center gap-4 xl:u-h-56.75 xl:u-gap-21 ${hidden}`}>
                <span
                  aria-hidden="true"
                  className={`grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] text-ref-icone-05 xl:u-size-51 xl:border-[calc(var(--u)*2)] ${
                    ring === "dark" ? "border-ref-anel-05" : "border-ref-anel-claro-05"
                  }`}
                >
                  <Icon className="size-6 xl:u-size-30" strokeWidth={1.9} />
                </span>
                {/*
                  Halo claro (desktop): no fundo fornecido a onda verde sobe mais
                  que na referência e encosta no último item (decisão de 12/11)
                */}
                <span className="text-[1.0625rem] leading-tight text-ref-lista-05 xl:u-text-19 xl:u-leading-24 xl:tracking-[-0.035em] xl:[text-shadow:0_0_calc(var(--u)*3)_rgb(245_245_240/0.95),0_0_calc(var(--u)*9)_rgb(245_245_240/0.9),0_0_calc(var(--u)*18)_rgb(245_245_240/0.75)]">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AcessibilidadeMotion>
  );
}
