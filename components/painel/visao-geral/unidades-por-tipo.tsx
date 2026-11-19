"use client";

import { useState } from "react";

import { formatar, pct, visaoGeral as d } from "@/lib/painel-data";

import { Card } from "../card";
import { BarsIcon } from "../painel-icons";

/**
 * "Unidades por tipo" (referência: x 238–757, y 424–786). Eixo de 0 a 600
 * com 36u a cada 100, barras de 88u a cada 113u, cores do escuro ao claro.
 * Ao passar o mouse (ou focar) uma barra, as outras recuam e um balão mostra
 * o número e a fatia do total.
 */

const TICKS = [600, 500, 400, 300, 200, 100, 0];
const COLORS = ["bg-ref-barra-1-10", "bg-ref-barra-2-10", "bg-ref-barra-3-10", "bg-ref-barra-4-10"];
/** u por unidade de saúde (36u a cada 100) */
const SCALE = 0.36;
/** Linha de base do gráfico, relativa ao cartão */
const BASE = 299;

export function UnidadesPorTipo() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Card aria-labelledby="tipo-titulo" className="mx-5 p-5 sm:mx-8 xl:m-0 xl:p-0 xl:u-top-424 xl:u-left-28 xl:u-h-362 xl:u-w-520">
      <div className="flex items-center gap-3 xl:block">
        <BarsIcon className="w-6 text-ref-tinta-10 xl:absolute xl:u-top-23 xl:u-left-26 xl:u-w-28" />
        <h2 id="tipo-titulo" className="text-xl font-bold text-ref-tinta-10 xl:absolute xl:u-top-25 xl:u-left-74 xl:u-text-23.5 xl:leading-none">
          Unidades por tipo
        </h2>
      </div>

      {/*
        Gráfico. Desktop: medidas em u, relativas ao cartão (--g = 1u).
        Abaixo de xl: uma caixa proporcional ao desenho do desktop, sem a faixa
        do título (--oy = 60), com --g = altura da caixa / 302.
      */}
      <div className="relative mt-3 aspect-[520/302] w-full [container-type:size] [--g:calc(100cqh/302)] [--oy:60] xl:static xl:mt-0 xl:aspect-auto xl:[container-type:normal] xl:[--g:var(--u)] xl:[--oy:0]">
          {/* Grade e rótulos do eixo y */}
          {TICKS.map((t) => {
            const y = BASE - t * SCALE;
            return (
              <div key={t} aria-hidden="true">
                <span
                  data-pm="grid"
                  className={`absolute h-[1.5px] origin-left ${t === 0 ? "bg-ref-base-10" : "bg-ref-grade-10"}`}
                  style={{ top: `calc(var(--g) * (${y - 0.75} - var(--oy)))`, left: "11.5%", width: t === 0 ? "86.5%" : "86%" }}
                />
                <span
                  className="absolute w-[8.1%] text-right text-[length:max(10px,calc(var(--g)*16))] leading-none text-ref-eixo-10"
                  style={{ top: `calc(var(--g) * (${y - 8} - var(--oy)))`, left: 0 }}
                >
                  {t}
                </span>
              </div>
            );
          })}

          {/* Barras */}
          <ul aria-label="Unidades por tipo de estabelecimento" className="contents">
            {d.porTipo.map((item, i) => {
              const h = item.valor * SCALE;
              const dim = hover !== null && hover !== i;
              return (
                <li
                  key={item.tipo}
                  tabIndex={0}
                  aria-label={`${item.tipo}: ${formatar(item.valor)} unidades (${pct(item.valor, d.unidades)}% do total)`}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="group/bar absolute top-0 bottom-0 cursor-default outline-none"
                  style={{ left: `${((72 + i * 113) / 520) * 100}%`, width: `${(88 / 520) * 100}%` }}
                >
                  {/* Valor sobre a barra */}
                  <span
                    data-pm="bar-value"
                    className="absolute inset-x-[-20%] text-center text-[length:max(13px,calc(var(--g)*19))] leading-none font-bold text-ref-valor-10 transition-transform duration-500 ease-out-expo group-hover/bar:-translate-y-1 [.motion-ready_&]:opacity-0"
                    style={{ top: `calc(var(--g) * (${BASE - h - 25.7} - var(--oy)))` }}
                  >
                    <span data-count={item.valor}>{item.valor}</span>
                  </span>
                  {/* Barra */}
                  <span
                    data-pm="bar"
                    className={`absolute inset-x-0 origin-bottom rounded-t-[calc(var(--g)*4)] transition-[opacity,filter] duration-300 group-focus-visible/bar:outline-2 group-focus-visible/bar:outline-offset-2 group-focus-visible/bar:outline-(--focus-ring) ${COLORS[i]} ${dim ? "opacity-45 saturate-50" : ""}`}
                    style={{ top: `calc(var(--g) * (${BASE - h} - var(--oy)))`, height: `calc(var(--g) * ${h})` }}
                  />
                  {/* Rótulo da categoria */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-14%] text-center text-[length:max(10.5px,calc(var(--g)*13.1))] leading-[calc(var(--g)*18)] whitespace-nowrap text-ref-eixo-10"
                    style={{ top: "calc(var(--g) * (310 - var(--oy)))" }}
                  >
                    <span className="xl:hidden">{item.curto}</span>
                    <span className="hidden xl:inline">
                      {item.tipo.includes("/") ? (
                        <>
                          Centro de saúde /<br />
                          Unidade básica
                        </>
                      ) : (
                        item.tipo
                      )}
                    </span>
                  </span>
                  {/* Balão */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-lg bg-ref-tinta-10 px-2.5 py-1.5 text-center text-[length:calc(var(--g)*12.5)] leading-tight whitespace-nowrap text-white shadow-lg transition-[opacity,translate] duration-300 ease-out-expo ${hover === i ? "-translate-y-full opacity-100" : "-translate-y-[80%] opacity-0"}`}
                    style={{ top: `calc(var(--g) * (${BASE - h - 34} - var(--oy)))` }}
                  >
                    <strong className="font-semibold">{pct(item.valor, d.unidades)}%</strong> do total
                  </span>
                </li>
              );
            })}
          </ul>
      </div>
    </Card>
  );
}
