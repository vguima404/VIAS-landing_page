import Image from "next/image";

import { ConfiancaMotion } from "./confianca-motion";
import { TrustCard } from "./trust-card";

/**
 * 08 · Confiança e privacidade — reprodução de
 * referencias/landing/08-confianca-privacidade.png.
 *
 * Fundo: foto fornecida (1672×941, mesmo quadro da referência), usada pixel a
 * pixel. Como na referência, um véu claro sobe da esquerda (atrás do texto) e
 * outro, mais leve, da direita (atrás das anotações).
 *
 * Por cima, em HTML/SVG: texto, cartão da unidade e as anotações 01/02/03
 * ligadas por fios aos itens do cartão. Números em verde-rota (o prompt pede:
 * nunca lima sobre fundo claro).
 *
 * Desktop (xl): medidas em u (1u = 1 px da referência). Quadro encostado à
 * direita (fx-*); texto a meio caminho (hx-*). Abaixo de xl: empilhado.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro da referência no desktop: 1672u × altura da seção, encostado à direita */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:fx-left-0 xl:u-w-1672";

const titleLines = ["Cada informação", "precisa mostrar", "o que sabe —", "e o que não sabe."];

type Note = {
  n: string;
  title: [string, string];
  text: string[];
  /** Posição medida na referência (número em x 1420; texto em x ~1465) */
  at: string;
  textX: string;
};

const notes: Note[] = [
  { n: "01", title: ["Saiba de onde vem", "a informação."], text: ["Cada dado indica", "a fonte consultada."], at: "xl:u-top-264", textX: "xl:u-left-1467" },
  {
    n: "02",
    title: ["O que falta", "também aparece."],
    text: ["Informado, parcial e", "não informado aparecem", "com texto, ícone e cor."],
    at: "xl:u-top-468",
    textX: "xl:u-left-1464",
  },
  { n: "03", title: ["Seus dados", "merecem cuidado."], text: ["A localização só é usada", "com sua permissão."], at: "xl:u-top-671", textX: "xl:u-left-1462" },
];

/** Fios: do nó no cartão até o número da anotação (px da referência) */
const WIRES = [
  { d: "M1327 407 L1429 298", c: "stroke-ref-no-lima-08" },
  { d: "M1345 522 L1416 490", c: "stroke-ref-no-verde-08" },
  { d: "M1345 622 L1414 677", c: "stroke-ref-no-verde-08" },
];

export function Confianca() {
  return (
    <ConfiancaMotion
      id="confianca"
      data-theme="light"
      aria-labelledby="confianca-titulo"
      className="relative flex flex-col overflow-hidden bg-ref-fundo-08 py-20 focus:outline-none xl:block xl:u-h-941 xl:py-0"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Visual: foto, cartão, fios e anotações                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative order-2 mt-10 xl:absolute xl:inset-0 xl:mt-0">
        <div className={`relative xl:absolute ${FRAME}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-video xl:absolute xl:inset-0 xl:aspect-auto xl:[@media(min-aspect-ratio:1720/941)]:[mask-image:linear-gradient(to_right,transparent,black_10%)]">
            <div data-trust="photo" className={`absolute inset-0 ${hidden}`}>
              <Image
                src="/images/confianca/08-confianca-fundo.webp"
                alt="Senhora sentada à mesa da cozinha, de óculos, consultando o celular; ao lado, uma caneca, uma bolsa e alguns papéis."
                fill
                quality={90}
                sizes="100vw"
                className="object-cover object-[55%_40%] xl:object-fill"
              />
            </div>
            {/* Véus claros, como na referência: atrás do texto e das anotações */}
            <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(248_246_241/0.6)_0%,rgb(248_246_241/0.45)_22%,rgb(248_246_241/0.12)_36%,transparent_44%)] xl:block" />
            <div aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(270deg,rgb(248_246_241/0.5)_0%,rgb(248_246_241/0.3)_12%,transparent_22%)] xl:block" />
          </div>

          {/* Fios das anotações (desktop) */}
          <svg aria-hidden="true" viewBox="0 0 1672 941" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full xl:block">
            {WIRES.map((w) => (
              <path key={w.d} data-trust="wire" d={w.d} pathLength={1} strokeDasharray="1 1" fill="none" strokeWidth="1.6" strokeLinecap="round" className={w.c} />
            ))}
          </svg>

          {/* Cartão da unidade */}
          <div
            data-trust="card"
            className={`relative z-[5] mx-auto -mt-24 w-fit sm:-mt-40 xl:absolute xl:u-top-267 xl:u-left-1048 xl:mx-0 xl:mt-0 ${hidden}`}
          >
            <TrustCard />
          </div>

          {/* Anotações */}
          <ol aria-label="Como o VIAS trata as informações" className="container-site relative mt-10 grid gap-8 sm:grid-cols-3 xl:static xl:mt-0 xl:block xl:max-w-none xl:p-0">
            {notes.map((note) => (
              <li key={note.n} data-trust="note" className={`flex gap-3 xl:absolute xl:block ${note.at} ${hidden}`}>
                <span className="shrink-0 font-mono text-lg leading-none font-semibold text-rota xl:absolute xl:u-left-1420 xl:u-text-21 xl:u-leading-21">
                  {note.n}
                  <span aria-hidden="true" className="ml-1 text-ref-no-lima-08 xl:absolute xl:u-top-0 xl:u-left-30 xl:ml-0">
                    ·
                  </span>
                </span>
                <div className={`xl:absolute ${note.textX}`}>
                  <h3 className="font-display text-lg leading-tight font-bold tracking-[-0.02em] text-ref-tinta-08 xl:u-text-20 xl:u-leading-25 xl:whitespace-nowrap">
                    {note.title[0]}
                    <br className="hidden xl:inline" /> {note.title[1]}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-ref-nota-texto-08 xl:u-mt-10 xl:u-text-15 xl:u-leading-20 xl:tracking-[-0.015em] xl:whitespace-nowrap">
                    {note.text.map((t, i) => (
                      <span key={t}>
                        {i > 0 && <br className="hidden xl:inline" />} {t}
                      </span>
                    ))}
                  </p>
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
        <h2
          id="confianca-titulo"
          className="pointer-events-auto flex flex-col font-display text-[clamp(2.3rem,1.2rem+4.4vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.03em] text-ref-tinta-08 xl:absolute xl:u-top-185 xl:u-left-53 xl:u-text-64 xl:u-leading-62.5"
        >
          {titleLines.map((line) => (
            <span key={line} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
              <span data-trust="line" className={`block xl:whitespace-nowrap ${hidden}`}>
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-trust="lead"
          className={`pointer-events-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.45] text-ref-texto-08 xl:absolute xl:u-top-469 xl:u-left-55 xl:mt-0 xl:max-w-none xl:u-text-22.5 xl:u-leading-30 xl:tracking-[-0.02em] ${hidden}`}
        >
          A confiança do VIAS depende de
          <br className="hidden xl:inline" /> fontes identificáveis, limites explícitos
          <br className="hidden xl:inline" /> e escolhas responsáveis sobre dados pessoais.
        </p>
      </div>
    </ConfiancaMotion>
  );
}
