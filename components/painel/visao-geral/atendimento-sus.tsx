"use client";

import { useState } from "react";

import { formatar, pct, visaoGeral as d } from "@/lib/painel-data";

import { Card } from "../card";
import { PieIcon } from "../painel-icons";

/**
 * "Atendimento SUS" (referência: x 774–1129, y 424–786). Rosca de 184u
 * (anel de 36u), "Sim" escuro a partir do topo no sentido horário, "Não"
 * claro; legenda à direita. Passar o mouse num lado (fatia ou legenda)
 * destaca a fatia e mostra o número dela no centro.
 */

const R = 74; // raio médio do anel (92 externo, 56 interno)
const GAP = 0.45; // fresta branca entre as fatias, em % do anel

export function AtendimentoSus() {
  const [hover, setHover] = useState<"sim" | "nao" | null>(null);
  const sim = pct(d.atendemSus, d.unidades);
  const nao = 100 - sim;

  const slices = [
    { key: "sim" as const, label: "Sim", value: d.atendemSus, share: sim, start: 0, color: "stroke-ref-barra-1-10", dot: "bg-ref-barra-1-10" },
    { key: "nao" as const, label: "Não", value: d.naoAtendemSus, share: nao, start: sim, color: "stroke-ref-barra-3-10", dot: "bg-ref-barra-3-10" },
  ];
  const active = slices.find((s) => s.key === hover);

  return (
    <Card aria-labelledby="sus-titulo" className="mx-5 p-5 sm:mx-8 xl:m-0 xl:p-0 xl:u-top-424 xl:u-left-564 xl:u-h-362 xl:u-w-356">
      <div className="flex items-center gap-3 xl:block">
        <PieIcon className="w-6 text-ref-tinta-10 xl:absolute xl:u-top-23 xl:u-left-23 xl:u-w-30" />
        <h2 id="sus-titulo" className="text-xl font-bold text-ref-tinta-10 xl:absolute xl:u-top-27 xl:u-left-68 xl:u-text-21.25 xl:leading-none">
          Atendimento SUS
        </h2>
      </div>

      <div className="mt-5 flex items-center gap-6 xl:static xl:mt-0 xl:block">
        {/* Rosca */}
        <div className="relative size-44 shrink-0 xl:absolute xl:u-top-97 xl:u-left-21.5 xl:u-size-184">
          <svg viewBox="0 0 184 184" aria-hidden="true" className="absolute inset-0 size-full -rotate-90 overflow-visible">
            {slices.map((s) => (
              <circle
                key={s.key}
                data-pm="slice"
                data-start={s.start + GAP}
                data-share={s.share - 2 * GAP}
                cx="92"
                cy="92"
                r={R}
                fill="none"
                pathLength={100}
                strokeDasharray={`${s.share - 2 * GAP} 100`}
                strokeDashoffset={-(s.start + GAP)}
                onPointerEnter={() => setHover(s.key)}
                onPointerLeave={() => setHover(null)}
                className={`${s.color} cursor-default transition-[stroke-width,opacity] duration-500 ease-out-expo ${hover === s.key ? "[stroke-width:44px]" : "[stroke-width:36px]"} ${hover && hover !== s.key ? "opacity-40" : ""}`}
              />
            ))}
          </svg>
          {/* Centro: total, ou a fatia em destaque */}
          <div className="absolute inset-0 grid place-items-center text-center xl:u-pt-4">
            <p className="leading-none">
              <span className="block text-[1.6rem] font-bold text-ref-tinta-10 tabular-nums xl:u-text-25">
                {active ? (
                  formatar(active.value)
                ) : (
                  <span data-count={d.unidades}>{formatar(d.unidades)}</span>
                )}
              </span>
              <span className="mt-1.5 block text-[1rem] text-ref-tinta-10 xl:u-mt-4 xl:u-text-18">
                {active ? `${active.label} · ${active.share}%` : "Total"}
              </span>
            </p>
          </div>
        </div>

        {/* Legenda */}
        <ul className="flex flex-col gap-5 xl:static xl:block">
          {slices.map((s, i) => (
            <li
              key={s.key}
              data-pm="legend"
              onPointerEnter={() => setHover(s.key)}
              onPointerLeave={() => setHover(null)}
              className={`relative flex gap-2.5 transition-opacity duration-300 xl:absolute xl:block xl:u-left-232.5 xl:u-w-110 [.motion-ready_&]:opacity-0 ${i === 0 ? "xl:u-top-139.5" : "xl:u-top-208.5"} ${hover && hover !== s.key ? "opacity-45" : ""}`}
            >
              <span aria-hidden="true" className={`mt-1 size-3 shrink-0 rounded-full xl:absolute xl:mt-0 xl:u-top-3.5 xl:left-0 xl:u-size-13 ${s.dot}`} />
              <p className="text-[1rem] leading-tight text-ref-tinta-10 xl:u-pl-25.5 xl:u-text-18 xl:leading-none">
                {s.label}
                <strong className="mt-1 block font-semibold whitespace-nowrap xl:u-mt-6.5 xl:u-text-16.5">
                  {formatar(s.value)} ({s.share}%)
                </strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
