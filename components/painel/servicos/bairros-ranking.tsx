"use client";

import { useState } from "react";

import { bairros, formatar } from "@/lib/painel-data";

import { Card } from "../card";
import { PlacePinIcon, SaoPauloMap } from "./servicos-icons";

/**
 * "Bairros com mais unidades cadastradas" (referência 11: x 917–1656,
 * y 481–740): dez bairros em duas colunas e, à direita, o mapa da cidade
 * com o pin. Passar o mouse num bairro destaca a linha e faz o pin pular.
 *
 * Linhas a cada 33.75u (centro da 1ª em 86u). Colunas: posição termina em
 * 50u / 289u, nome em 58u / 300.5u, número termina em 218u / 515u.
 */

const COLS = [
  { rank: 50, nome: 58, valor: 218, de: 35 },
  { rank: 289, nome: 300.5, valor: 515, de: 272 },
];

export function BairrosRanking() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Card aria-labelledby="bairros-titulo" className="mx-5 p-5 sm:mx-8 xl:m-0 xl:p-0 xl:u-top-481 xl:u-left-707 xl:u-h-259 xl:u-w-740 xl:u-rounded-18">
      {/* Ondas verde-claras no canto inferior direito */}
      <svg aria-hidden="true" viewBox="0 0 200 110" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 hidden h-[45%] w-[27%] xl:block">
        <path d="M0 110C50 80 110 40 200 30V110Z" className="fill-[#eef8f0]" />
        <path d="M40 110C90 80 140 64 200 60V110Z" className="fill-[#e2f3e6]" />
        <path d="M110 110C140 92 170 86 200 84V110Z" className="fill-[#d5eedb]" />
      </svg>

      <div className="flex items-center gap-3 xl:block">
        <PlacePinIcon className="w-6 text-[#0e6a48] xl:absolute xl:u-top-17 xl:u-left-30 xl:u-w-28" />
        <h2 id="bairros-titulo" className="text-lg leading-tight font-bold text-ref-tinta-10 xl:absolute xl:u-top-23 xl:u-left-78 xl:u-text-21.5 xl:leading-none xl:whitespace-nowrap">
          Bairros com mais unidades cadastradas
        </h2>
      </div>

      <ol className="mt-4 grid gap-x-8 sm:grid-flow-col sm:grid-rows-5 xl:static xl:mt-0 xl:block">
        {bairros.map((b, i) => {
          const col = COLS[i < 5 ? 0 : 1];
          const row = i % 5;
          return (
            <li
              key={b.nome}
              data-pm="row"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className={`relative flex items-center border-b border-[#f0f0f0] py-2 sm:[&:nth-child(5n)]:border-0 xl:absolute xl:top-[calc(var(--u)*var(--top))] xl:left-[calc(var(--u)*var(--de))] xl:w-[calc(var(--u)*var(--w))] xl:u-h-33.75 xl:u-border-b-1.5 xl:py-0 [.motion-ready_&]:opacity-0 ${row === 4 ? "xl:border-transparent" : ""}`}
              style={{ "--de": col.de, "--top": 86 + row * 33.75 - 16.875, "--w": col.valor - col.de } as React.CSSProperties}
            >
              <span
                className="w-7 shrink-0 text-right text-[0.9375rem] text-[#20292d] xl:w-(--rank) xl:u-text-17.25 xl:leading-none"
                style={{ "--rank": `calc(var(--u) * ${col.rank - col.de})` } as React.CSSProperties}
              >
                {i + 1}.
              </span>
              <span
                className={`ml-2.5 flex-1 text-[0.9375rem] transition-colors duration-300 xl:ml-(--gap) xl:u-text-17.25 xl:leading-none ${hover === i ? "text-ref-icone-10" : "text-ref-rotulo-10"}`}
                style={{ "--gap": `calc(var(--u) * ${col.nome - col.rank})` } as React.CSSProperties}
              >
                {b.nome}
              </span>
              <strong className={`text-[0.9375rem] font-bold text-ref-tinta-10 transition-transform duration-300 ease-out-expo xl:u-text-17.75 xl:leading-none ${hover === i ? "-translate-x-1" : ""}`}>
                <span data-count={b.unidades}>{formatar(b.unidades)}</span>
              </strong>
            </li>
          );
        })}
      </ol>

      <span aria-hidden="true" className="hidden bg-[#a1b4ad] xl:absolute xl:block xl:u-top-26 xl:u-left-545 xl:u-h-205 xl:u-w-1.5" />

      {/* Mapa da cidade com o pin */}
      <div aria-hidden="true" className="relative mx-auto mt-5 w-40 xl:absolute xl:m-0 xl:u-top-65 xl:u-left-565 xl:u-w-162">
        <SaoPauloMap className="w-full" />
        <span
          data-pm="pin-drop"
          className={`absolute left-[40.1%] top-[29%] w-[16.7%] transition-transform duration-500 ease-[cubic-bezier(.34,1.8,.64,1)] ${hover !== null ? "-translate-y-2" : ""}`}
        >
          <span className="absolute -bottom-[6%] left-1/2 h-[18%] w-[90%] -translate-x-1/2 animate-ping rounded-full bg-ref-icone-10/30 motion-reduce:hidden" />
          <span className="absolute top-[22%] left-1/2 aspect-square w-[46%] -translate-x-1/2 rounded-full bg-white" />
          <PlacePinIcon className="relative w-full text-[#0e6a48] drop-shadow-[0_4px_6px_rgb(5_60_40/0.35)]" />
        </span>
      </div>
    </Card>
  );
}
