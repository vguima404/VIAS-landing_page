import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { ArrowRightIcon, PinIcon, PlayIcon, RouteIcon, SearchIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

import { HeroMotion } from "./hero-motion";
import { HeroPhone } from "./hero-phone";

/**
 * 02 · Hero — reprodução de referencias/landing/02-hero.png.
 *
 * Desktop (xl, ≥ 1280 px): quadro com a proporção da referência (1672×941)
 * e todas as medidas em unidades de referência (u-*: 1u = 1 px da imagem),
 * medidas na imagem. O fundo (cidade, rotas, pins, disco e chão) é a imagem
 * public/images/hero/02-hero-fundo.webp, no mesmo quadro da referência.
 * Abaixo de xl: adaptação empilhada (para aprovação).
 *
 * Elementos com data-hero recebem a entrada animada (HeroMotion); a classe
 * [.motion-ready_&]:opacity-0 os mantém ocultos até a animação começar.
 */

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

const hidden = "[.motion-ready_&]:opacity-0";

type Highlight = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  lines: [string, string];
  /** x do texto na referência */
  left: string;
  /** Caixa do ícone (tamanho e deslocamento até a área visível medida) */
  icon: string;
  /** Divisor à direita, relativo à coluna */
  divider?: string;
};

// Medidas da referência: textos em x 109 / 285 / 505 (topo das letras em y 772),
// ícones visíveis em 109–138 / 286–310 / 505–540 (y 727–758), divisores em
// x 246,5 e 468,5 (y 729–806).
const highlights: Highlight[] = [
  {
    Icon: SearchIcon,
    lines: ["Encontre o", "serviço ideal"],
    left: "xl:u-left-109",
    icon: "xl:u-size-39 xl:-u-left-5",
    divider: "xl:u-left-137.5",
  },
  {
    Icon: PinIcon,
    lines: ["Descubra a", "unidade adequada"],
    left: "xl:u-left-285",
    icon: "xl:u-size-35.5 xl:-u-left-6 xl:u-top-2",
    divider: "xl:u-left-183.5",
  },
  { Icon: RouteIcon, lines: ["Veja o melhor", "percurso para você"], left: "xl:u-left-505", icon: "xl:u-size-42 xl:-u-left-4" },
];

export function Hero() {
  return (
    <HeroMotion
      id="inicio"
      data-theme="light"
      aria-labelledby="inicio-titulo"
      className="relative overflow-hidden bg-ref-fundo pt-[calc(var(--spacing-nav)+2.5rem)] focus:outline-none xl:u-h-941 xl:pt-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Texto                                                                */}
      {/* ------------------------------------------------------------------ */}
      {/*
        No desktop, em telas largas o texto fica a meio caminho entre a borda
        esquerda da tela e a do quadro da imagem (que encosta à direita)
      */}
      <div className="container-site relative z-10 xl:absolute xl:inset-y-0 xl:hx-left-0 xl:u-w-1672 xl:max-w-none xl:p-0">
        <p
          data-hero="eyebrow"
          className={`flex items-center gap-4 font-mono text-[0.6875rem] font-normal tracking-[0.05em] xl:tracking-[0.07em] text-ref-rotulo uppercase xl:absolute xl:u-top-180 xl:u-left-105 xl:u-gap-24 xl:u-text-15.5 xl:leading-none ${hidden}`}
        >
          Via Inteligente de Acesso à Saúde
          <span data-hero="rule" aria-hidden="true" className={`block h-px w-16 bg-ref-fio xl:u-h-1.5 xl:u-w-90 ${hidden}`} />
        </p>

        <h1
          id="inicio-titulo"
          className="mt-5 flex flex-col font-display text-[clamp(2.75rem,1.6rem+5vw,4.5rem)] leading-[0.93] font-bold tracking-[-0.035em] text-ref-tinta xl:absolute xl:u-top-226 xl:u-left-100 xl:mt-0 xl:u-text-85 xl:u-leading-79"
        >
          {[
            { text: "Saúde não é só", cls: "" },
            { text: "encontrar.", cls: "" },
            { text: "É conseguir chegar", cls: "text-ref-rota", dot: true },
          ].map((line) => (
            <span key={line.text} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-hero="line" className={`block xl:whitespace-nowrap ${line.cls} ${hidden}`}>
                {line.text}
                {line.dot && <span className="text-lima">.</span>}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero="lead"
          className={`mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] tracking-[-0.015em] text-ref-texto xl:absolute xl:u-top-485 xl:u-left-106 xl:mt-0 xl:max-w-none xl:u-text-23 xl:u-leading-30 ${hidden}`}
        >
          Com o <strong className="font-bold text-ref-tinta">VIAS</strong>, você encontra o exame,
          <br className="hidden xl:inline" /> serviço ou especialidade que precisa
          <br className="hidden xl:inline" /> e descobre a melhor forma de chegar até lá.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 xl:absolute xl:u-top-615 xl:u-left-102 xl:mt-0 xl:flex-nowrap xl:u-gap-34">
          <a
            data-hero="cta"
            href={site.demoHref}
            className={`group/cta inline-flex h-14 items-center gap-3 rounded-pill bg-ref-botao pr-7 pl-8 text-base font-medium whitespace-nowrap text-ref-botao-texto shadow-[0_10px_24px_-12px_rgb(6_52_41/0.6)] transition-[background-color,scale] duration-300 hover:bg-pinho active:scale-[0.98] xl:u-h-62 xl:u-gap-17 xl:u-pr-34 xl:u-pl-40 xl:u-text-19 ${hidden}`}
          >
            Explorar demonstração
            <ArrowRightIcon className="size-5 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-1 xl:u-size-19" />
          </a>

          <a
            data-hero="cta"
            href="#como-funciona"
            className={`group/play inline-flex items-center gap-4 text-[0.9375rem] font-medium whitespace-nowrap text-ref-secundario xl:u-gap-19 xl:u-text-17 ${hidden}`}
          >
            <span className="grid size-11 place-items-center rounded-full border-2 border-ref-secundario transition-[background-color,color,scale] duration-300 group-hover/play:scale-105 group-hover/play:bg-ref-secundario group-hover/play:text-papel xl:u-size-43 xl:u-border-2">
              <PlayIcon className="size-5 translate-x-px xl:u-size-21" />
            </span>
            Conheça o VIAS
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-4 xl:static xl:mt-0">
          {highlights.map(({ Icon, lines, left, icon, divider }) => (
            <li
              key={lines[0]}
              data-hero="highlight"
              className={`relative text-[0.8125rem] leading-snug text-ref-texto-suave xl:absolute xl:u-top-722 xl:u-text-15.5 xl:u-leading-21 ${left} ${hidden}`}
            >
              <Icon className={`size-7 text-ref-icone xl:absolute xl:top-0 ${icon}`} strokeWidth={1.6} />
              <span className="mt-2 block xl:u-mt-45 xl:whitespace-nowrap">
                {lines[0]}
                <br />
                {lines[1]}
              </span>
              {divider && (
                <span
                  aria-hidden="true"
                  className={`absolute hidden w-px bg-ref-divisor xl:block xl:u-top-7 xl:u-h-77 ${divider}`}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Visual: fundo da referência (cidade, rotas, pins, disco e chão) e iPhone */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative mt-12 aspect-[4/5] overflow-hidden sm:aspect-[16/11] xl:absolute xl:inset-0 xl:mt-0 xl:aspect-auto">
        {/*
          Imagem de fundo fornecida (1672×941, mesmo quadro da referência 02).
          Desktop: a imagem ocupa o quadro, pixel a pixel. Se a tela for mais
          larga que 16:9, o quadro encosta à direita e a sobra à esquerda é o
          fundo claro da seção; só nesse caso a borda esquerda da imagem (que
          tem uma vinheta escura) se funde nele. Em 16:9 a imagem fica intacta.
          Mobile: mostra o lado direito/inferior (cidade e celular).
        */}
        <div data-hero="plane" className="absolute inset-0">
          <div data-hero="city" className={`absolute inset-0 ${hidden}`}>
            <div
              className={`absolute inset-0 ${FRAME} xl:[@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]`}
            >
              <Image
                src="/images/hero/02-hero-fundo.webp"
                alt=""
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-[82%_100%] xl:object-fill"
              />
            </div>
          </div>
        </div>

        {/*
          Folhagens desfocadas de primeiro plano (desktop), como na referência.
          Uma imagem 1672×941 usada duas vezes, recortada ao meio: a metade
          esquerda acompanha a borda esquerda da tela, a direita acompanha o
          quadro da imagem. Saem afastando-se para os lados ao rolar.
        */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
          <div data-hero="foliage-exit-left" className="absolute inset-y-0 left-0 u-w-1672 [clip-path:inset(0_50%_0_0)]">
            <div data-hero="foliage" className={`absolute inset-0 ${hidden}`}>
              <Image src="/images/hero/02-hero-folhagem.webp" alt="" fill sizes="100vw" className="object-fill" />
            </div>
          </div>
          <div data-hero="foliage-exit-right" className="absolute inset-y-0 fx-left-0 u-w-1672 [clip-path:inset(0_0_0_50%)]">
            <div data-hero="foliage" className={`absolute inset-0 ${hidden}`}>
              <Image src="/images/hero/02-hero-folhagem.webp" alt="" fill sizes="100vw" className="object-fill" />
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 ${FRAME}`}>
          <HeroPhone
            className={`absolute bottom-[3%] left-1/2 w-[80%] -translate-x-1/2 sm:w-[52%] xl:bottom-auto xl:u-top-90 xl:u-left-832 xl:u-w-620 xl:translate-x-0 ${hidden}`}
          />
        </div>
      </div>
    </HeroMotion>
  );
}
