import Image from "next/image";

import { ArrowRightIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

import { CtaMotion } from "./cta-motion";

/**
 * 09 · CTA final — reprodução da parte de cima de
 * referencias/landing/09-cta-final-footer.png (y 0–760; o footer, y 760–941,
 * é o componente Footer).
 *
 * Fundo (2512×760 = quadro de 1672 + 420 de cada lado): no quadro, a foto do
 * banner fornecido, alinhada à referência (cada lado alinhado à parte, com
 * SIFT + RANSAC, encontrando-se no meio do painel claro). O gestor e as
 * sobras dos dois lados vêm das fotos individuais fornecidas depois (mulher
 * na rua, homem no escritório), alinhadas pelos rostos à mesma referência:
 * em telas largas as laterais continuam a cena, sem borrão.
 *
 * Por cima, em HTML/SVG: título, parágrafo, a Linha de Acesso (nasce de um nó
 * central e se bifurca até os dois botões) e os dois CTAs com legendas.
 *
 * Desktop (xl): medidas em u (1u = 1 px da referência), tudo no quadro
 * CENTRALIZADO na tela (hx-*), como na referência, em que título, linha e
 * botões ficam no centro da página. Em telas mais largas que o quadro, as
 * sobras mostram as laterais reais da foto. Abaixo de xl: empilhado, com o
 * quadro da foto inteiro embaixo (as duas pessoas).
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, centralizado na tela */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:hx-left-0 xl:u-w-1672";

const titleLines = ["Para quem precisa", "chegar. E para quem", "planeja o caminho"];

/** Linha de Acesso: do nó (835, 502) até o topo de cada botão (curvas medidas na referência) */
const BRANCHES = ["M835 502 C758.9 531.4 669.5 521.6 598.2 561.9", "M835 502 C912.3 531.4 1000.8 521.5 1076.6 562.3"];

type Cta = {
  label: string;
  href: string;
  caption: [string, string];
  /** Coluna (centro do botão na referência) */
  column: string;
  button: string;
};

const ctas: Cta[] = [
  {
    label: "Explorar demonstração",
    href: site.demoHref,
    caption: ["Para cidadãos · encontre atendimento", "e o caminho até ele"],
    column: "xl:u-left-389",
    button: [
      "bg-[linear-gradient(90deg,var(--color-ref-botao-09)_14%,var(--color-ref-botao-fim-09)_58%)] text-ref-botao-texto-09",
      "shadow-[0_10px_24px_-14px_rgb(120_140_20/0.55)]",
      "hover:bg-[linear-gradient(90deg,var(--color-lima)_0%,var(--color-lima)_100%)]",
      "xl:u-w-327 xl:u-text-20.5 xl:u-gap-12",
    ].join(" "),
  },
  {
    label: "Conhecer o painel para gestores",
    href: site.gestoresHref,
    caption: ["Para gestores públicos · veja onde o", "acesso à saúde é mais difícil"],
    column: "xl:u-left-881",
    button: [
      "border-[1.5px] border-ref-contorno-09 text-ref-contorno-09",
      "hover:bg-ref-contorno-09 hover:text-papel",
      "xl:u-w-333 xl:u-border-1.75 xl:u-text-16.75 xl:u-gap-11 xl:tracking-[-0.02em]",
    ].join(" "),
  },
];

export function Cta() {
  return (
    <CtaMotion
      id="comece"
      data-theme="light"
      aria-labelledby="comece-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-09 pt-24 focus:outline-none xl:block xl:u-h-760 xl:pt-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Foto                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 mt-12 xl:absolute xl:inset-0 xl:mt-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          <div className="relative aspect-[1672/760] w-full overflow-hidden xl:absolute xl:inset-0 xl:aspect-auto xl:overflow-visible">
            {/* A imagem vai 420u além do quadro de cada lado (o quadro fica no meio) */}
            <div
              data-cta="photo"
              className={`absolute inset-y-0 left-[calc(-420/1672*100%)] w-[calc(2512/1672*100%)] xl:[@media(min-aspect-ratio:2500/941)]:[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] ${hidden}`}
            >
              <Image
                src="/images/cta/09-cta-fundo.webp"
                alt="À esquerda, uma mulher caminha pela cidade com o celular na mão e uma sacola no ombro; à direita, um homem de óculos trabalha no notebook em um escritório."
                fill
                quality={90}
                sizes="150vw"
                className="object-fill"
              />
            </div>
            {/* Véus claros, como na referência: na borda da protagonista, junto à
                legenda dos cidadãos, e atrás do botão e da legenda de gestores */}
            <div
              aria-hidden="true"
              className="absolute hidden u-top-530 u-left-400 u-h-230 u-w-200 bg-[linear-gradient(90deg,transparent_12%,rgb(243_241_229/0.85)_30%,rgb(243_241_229/0.85)_60%,transparent)] [mask-image:linear-gradient(transparent,black_35%)] xl:block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-[radial-gradient(ellipse_calc(var(--u)*145)_calc(var(--u)*130)_at_calc(var(--u)*1160)_calc(var(--u)*620),var(--color-ref-fundo-09),transparent)] xl:block"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Texto, Linha de Acesso e CTAs (no quadro da foto)                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-1 xl:absolute xl:inset-0">
        <div className={`container-site relative text-center xl:absolute xl:max-w-none xl:p-0 ${FRAME}`}>
          <h2
            id="comece-titulo"
            className="mx-auto flex max-w-[40rem] flex-col font-display text-[clamp(2.3rem,1.2rem+4.4vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ref-tinta-09 xl:absolute xl:u-top-171 xl:u-left-440 xl:u-w-800 xl:max-w-none xl:u-text-67 xl:u-leading-64.5 xl:tracking-[-0.04em]"
          >
            {titleLines.map((line, i) => (
              <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
                <span data-cta="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                  {line}
                  {i === titleLines.length - 1 && <span className="text-ref-linha-09">.</span>}
                </span>
              </span>
            ))}
          </h2>

          <p
            data-cta="lead"
            className={`mx-auto mt-6 max-w-[36rem] text-[1.0625rem] leading-[1.45] text-ref-texto-09 xl:absolute xl:u-top-390 xl:u-left-430.5 xl:mt-0 xl:u-w-800 xl:max-w-none xl:u-text-21.75 xl:u-leading-30 xl:tracking-[-0.03em] ${hidden}`}
          >
            Cidadãos descobrem onde ser atendidos e como chegar.
            <br className="hidden xl:inline" /> Gestores públicos enxergam onde o acesso à saúde é
            <br className="hidden xl:inline" /> mais difícil. O VIAS conecta os dois lados do mesmo caminho.
          </p>

          {/* Linha de Acesso (desktop): nó central que se bifurca até os botões */}
          <svg aria-hidden="true" viewBox="0 0 1672 760" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block">
            {BRANCHES.map((d) => (
              <path key={d} data-cta="branch" d={d} pathLength={1} strokeDasharray="1 1" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-ref-linha-09" />
            ))}
          </svg>
          <span
            data-cta="node"
            aria-hidden="true"
            className={`absolute hidden u-top-502 u-left-835 u-size-13 -translate-1/2 rounded-full bg-ref-linha-09 xl:block ${hidden}`}
          />

          <ul className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10 xl:static xl:mt-0">
            {ctas.map((cta) => (
              <li key={cta.label} className={`flex flex-col items-center xl:absolute xl:u-top-562 xl:u-w-400 ${cta.column}`}>
                <a
                  data-cta="button"
                  href={cta.href}
                  className={[
                    "group/cta inline-flex h-14 items-center justify-center gap-3 rounded-pill px-7 text-base font-medium whitespace-nowrap",
                    "transition-[background-color,color,scale] duration-300 active:scale-[0.98] xl:u-h-66 xl:px-0 xl:tracking-[-0.015em]",
                    cta.button,
                    hidden,
                  ].join(" ")}
                >
                  {cta.label}
                  <ArrowRightIcon className="size-5 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-1 xl:u-size-21" />
                </a>
                <p
                  data-cta="caption"
                  className={`mt-4 text-[0.9375rem] leading-snug text-ref-legenda-09 xl:u-mt-12 xl:u-text-17 xl:u-leading-21 xl:tracking-[-0.025em] xl:whitespace-nowrap ${hidden}`}
                >
                  {cta.caption[0]}
                  <br className="hidden xl:inline" /> {cta.caption[1]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CtaMotion>
  );
}
