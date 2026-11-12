import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { AccessibilityIcon, BuildingIcon, BusIcon, ClipboardIcon } from "@/components/ui/icons";

import { ProblemaMap } from "./problema-map";
import { ProblemaMotion } from "./problema-motion";

/**
 * 03 · O problema — reprodução de referencias/landing/03-o-problema.png.
 *
 * Desktop (xl): mesmas medidas da referência em unidades u (1u = 1 px da
 * imagem). Como no Hero, o quadro da imagem encosta à direita em telas
 * largas (fx-*) e o texto fica a meio caminho (hx-*).
 * Abaixo de xl: adaptação empilhada.
 *
 * Fotografia: public/images/problema/03-problema-foto.webp (recebida em 12/11).
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

type Question = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: [string, string?];
  /** Posição e altura medidas na referência */
  box: string;
};

// Pílulas: x 1290–1577 (287u); topos 449 / 550 / 651 / 753; alturas 83 / 83 / 82 / 87
const questions: Question[] = [
  { Icon: ClipboardIcon, text: ["Qual serviço?"], box: "xl:u-top-449 xl:u-h-83" },
  { Icon: BuildingIcon, text: ["Qual unidade?"], box: "xl:u-top-550 xl:u-h-83" },
  { Icon: BusIcon, text: ["Qual transporte?"], box: "xl:u-top-651 xl:u-h-82" },
  { Icon: AccessibilityIcon, text: ["Quais condições", "de acesso?"], box: "xl:u-top-753 xl:u-h-87" },
];

const titleLines = ["O endereço", "mais perto nem", "sempre é o", "atendimento certo."];

export function Problema() {
  return (
    <ProblemaMotion
      id="problema"
      data-theme="light"
      aria-labelledby="problema-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-03 py-20 focus:outline-none xl:block xl:u-h-941 xl:py-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Visual: fotografia (diagonal), minimapa e perguntas                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 xl:absolute xl:inset-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          {/* Fotografia: recorte diagonal medido (borda de (776,0) a (636,400)) */}
          <div
            data-problema="photo-plane"
            className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden xl:absolute xl:inset-0 xl:aspect-auto xl:max-w-none xl:[clip-path:polygon(46.41%_0,38.04%_42.51%,37.68%_49.95%,38.28%_100%,100%_100%,100%_0)]"
          >
            {/*
              Foto alinhada à referência por correlação: escala 0,834 (1668×939u)
              e canto em (4, 4)u dentro do quadro.
            */}
            <div
              data-problema="photo"
              className={`absolute inset-0 xl:inset-auto xl:u-top-4 xl:u-left-4 xl:u-h-939 xl:u-w-1668 ${hidden}`}
            >
              <Image
                src="/images/problema/03-problema-foto.webp"
                alt="Mulher no ponto de ônibus olhando o celular, pensativa; ao fundo, pessoas na plataforma e um ônibus parado."
                fill
                quality={90}
                sizes="(min-width: 1280px) 100vw, 100vw"
                className="object-cover object-[62%_40%] xl:object-fill"
              />
            </div>
          </div>

          <ProblemaMap />

          {/* Perguntas que ficam sem resposta */}
          <ul
            data-problema="questions"
            aria-label="Perguntas de quem procura atendimento"
            className="relative mx-auto -mt-28 grid w-full max-w-xl grid-cols-2 gap-3 px-5 xl:static xl:mt-0 xl:block xl:max-w-none xl:px-0"
          >
            {questions.map(({ Icon, text, box }) => (
              <li
                key={text.join(" ")}
                data-problema="question"
                className={`xl:absolute xl:u-left-1290 xl:u-w-287 ${box} ${hidden}`}
              >
                {/*
                  Camada visual separada: o GSAP anima a entrada no <li> (e grava
                  translate:none nele), o hover move só esta camada
                */}
                <div
                  className={[
                    "group/pill flex h-full items-center gap-3 rounded-pill bg-ref-pilula px-4 py-3 text-[0.9375rem] leading-tight text-ref-pilula-texto shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)]",
                    // Hover: sobe levemente, clareia e ganha sombra; o ícone vira verde-rota
                    "cursor-default transition-[translate,background-color,box-shadow] duration-300 ease-out-expo",
                    "hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_32px_-12px_rgb(0_0_0/0.45)] motion-reduce:hover:translate-y-0",
                    "xl:u-gap-24 xl:py-0 xl:u-pl-30 xl:u-text-21 xl:u-leading-24",
                  ].join(" ")}
                >
                  <Icon className="size-6 shrink-0 text-ref-pilula-icone transition-colors duration-300 group-hover/pill:text-rota xl:u-size-37" strokeWidth={1.5} />
                  <span>
                    {text[0]}
                    {text[1] && (
                      <>
                        <br className="hidden xl:inline" /> {text[1]}
                      </>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Texto                                                                */}
      {/* ------------------------------------------------------------------ */}
      {/* No desktop a camada de texto cobre o quadro: não pode capturar o mouse das pílulas */}
      <div className="container-site relative z-10 order-1 mb-12 xl:pointer-events-none xl:absolute xl:inset-y-0 xl:hx-left-0 xl:mb-0 xl:u-w-1672 xl:max-w-none xl:p-0">
        <h2
          id="problema-titulo"
          className="pointer-events-auto flex flex-col font-display text-[clamp(2.5rem,1.4rem+4.6vw,4.25rem)] leading-[0.9] font-bold tracking-[-0.035em] text-ref-tinta-03 xl:absolute xl:u-top-192 xl:u-left-68 xl:u-text-84 xl:u-leading-75"
        >
          {titleLines.map((line) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-problema="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-problema="lead"
          className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] tracking-[-0.015em] text-ref-texto-03 xl:absolute xl:u-top-522 xl:u-left-69 xl:tracking-normal xl:mt-0 xl:max-w-none xl:u-text-23.5 xl:u-leading-32.5 ${hidden}`}
        >
          Saber onde existe o serviço, se a unidade
          <br className="hidden xl:inline" /> atende à sua necessidade e como chegar até ela
          <br className="hidden xl:inline" /> são perguntas diferentes. Quando essas respostas
          <br className="hidden xl:inline" /> não se encontram, o caminho fica mais incerto.
        </p>
      </div>
    </ProblemaMotion>
  );
}
