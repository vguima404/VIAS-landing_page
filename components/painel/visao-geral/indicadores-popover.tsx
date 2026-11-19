"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { ArrowRightSmall, ChevronDownIcon, InfoIcon } from "../painel-icons";

/**
 * "Como cada indicador é calculado" (referência: botão em x 1391–1643,
 * y 371–410; popover aberto em x 1422–1654, y 413–613). Fechado por padrão
 * (decisão de 19/11); abre no clique, fecha no Esc, no clique fora ou no
 * botão de novo. "Saiba mais sobre os dados" leva à seção Confiança e
 * privacidade da landing page.
 */

const termos = [
  { termo: "Unidades cadastradas", texto: "total de estabelecimentos no CNES." },
  { termo: "Atendem pelo SUS", texto: "unidades que realizam atendimentos pelo SUS." },
  { termo: "Unidades sem coordenadas", texto: "unidades sem endereço geográfico informado." },
];

export function IndicadoresPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} data-pm="info" className="relative z-20 mx-5 flex justify-end sm:mx-8 xl:absolute xl:m-0 xl:block xl:u-top-370.5 xl:u-left-1180.5 [.motion-ready_&]:opacity-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group/info flex h-10 cursor-pointer items-center gap-2 rounded-full border border-ref-botao-borda-10 bg-ref-botao-10 px-4 text-[0.8125rem] font-semibold text-ref-botao-texto-10 shadow-[0_6px_16px_-12px_rgb(8_80_50/0.6)] transition-[background-color,box-shadow] duration-300 hover:bg-[#d9f0dd] hover:shadow-[0_8px_20px_-10px_rgb(8_80_50/0.5)] xl:u-h-40 xl:u-w-253 xl:u-gap-0 xl:p-0 xl:u-border-1 xl:font-medium xl:u-text-12.25"
      >
        <InfoIcon className="size-4 shrink-0 text-ref-icone-10 xl:u-ml-15 xl:u-size-17" />
        <span className="whitespace-nowrap xl:u-ml-12.5">Como cada indicador é calculado</span>
        <ChevronDownIcon className={`w-3 shrink-0 transition-transform duration-500 ease-out-expo xl:u-ml-9 xl:u-w-11.5 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={id}
        role="region"
        aria-label="Sobre os indicadores"
        hidden={!open}
        className="absolute top-full right-0 mt-1 w-64 origin-top-right animate-pop-in rounded-xl border border-black/6 bg-white p-4 shadow-[0_18px_44px_-14px_rgb(10_40_30/0.35)] xl:mt-0 xl:u-top-42.5 xl:right-auto xl:u-left-31.5 xl:u-w-232 xl:u-h-200 xl:u-rounded-12 xl:p-0"
      >
        <p className="text-[0.875rem] font-semibold text-ref-tinta-10 xl:absolute xl:u-top-16 xl:u-left-17 xl:u-text-13.5 xl:leading-none">
          Sobre os indicadores
        </p>
        <dl className="mt-3 space-y-2.5 text-[0.75rem] leading-[1.35] xl:static xl:mt-0 xl:space-y-0">
          {termos.map((t, i) => (
            <div
              key={t.termo}
              className={`xl:absolute xl:u-left-17 xl:u-w-205 xl:u-text-11.5 xl:u-leading-16 ${["xl:u-top-43", "xl:u-top-85", "xl:u-top-126"][i]}`}
            >
              <dt className="inline font-semibold text-ref-tinta-10">{t.termo}:</dt>{" "}
              <dd className="inline text-ref-pop-texto-10">{t.texto}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/#confianca"
          className="group/link mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-ref-pop-link-10 hover:underline xl:absolute xl:mt-0 xl:u-top-173.5 xl:u-left-17 xl:u-gap-8 xl:u-text-11.5 xl:leading-none"
        >
          Saiba mais sobre os dados
          <ArrowRightSmall className="w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 xl:u-w-14" />
        </Link>
      </div>
    </div>
  );
}
