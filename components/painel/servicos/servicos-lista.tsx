"use client";

import { Flip } from "gsap/Flip";
import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { formatar, servicos } from "@/lib/painel-data";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { Card } from "../card";
import { SearchIcon } from "../painel-icons";
import { ServicoIcon, StethoscopeIcon } from "./servicos-icons";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

/**
 * "Quantas unidades oferecem cada serviço" (referência 11: x 233–898,
 * y 193–740). Busca por nome e alternância "Mais / Menos oferecidos": as
 * linhas trocam de lugar deslizando (GSAP Flip) e as que entram aparecem
 * com as barras crescendo.
 *
 * Medidas em u relativas ao cartão; linhas a cada 44.75u, a partir de 122.6u.
 */

/** Unidades que enchem a barra inteira */
const ESCALA = 780;
/** Cores das barras, da 1ª à última posição (medidas na referência) */
const CORES = ["#288f64", "#2b9165", "#309268", "#3b9c6c", "#4ead72", "#57b475", "#5fba77", "#65be78", "#6ac37c"];

const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

type Ordem = "mais" | "menos";

export function ServicosLista() {
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState<Ordem>("mais");
  const listRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const reduced = useReducedMotion();
  const searchId = useId();

  const lista = useMemo(() => {
    const q = normalizar(busca.trim());
    const filtrada = servicos.filter((s) => normalizar(s.nome).includes(q));
    return [...filtrada].sort((a, b) => (ordem === "mais" ? b.unidades - a.unidades : a.unidades - b.unidades));
  }, [busca, ordem]);

  /** Guarda as posições atuais antes de a lista mudar */
  const capture = () => {
    if (reduced || !listRef.current) return;
    flipState.current = Flip.getState(listRef.current.querySelectorAll("[data-row]"));
  };

  // Depois que a lista mudou: anima do estado anterior para o novo
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !listRef.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: listRef.current.querySelectorAll("[data-row]"),
      duration: 0.75,
      ease: "power3.inOut",
      stagger: 0.025,
      onEnter: (els) =>
        gsap.fromTo(els, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" }),
    });
    // Barras das linhas que mudaram de posição trocam de cor e crescem de novo
    gsap.fromTo(listRef.current.querySelectorAll("[data-fill]"), { scaleX: 0.15 }, { scaleX: 1, duration: 0.9, ease: "power4.out", stagger: 0.03 });
  }, [lista]);

  return (
    <Card aria-labelledby="servicos-titulo" className="mx-5 p-5 sm:mx-8 xl:m-0 xl:p-0 xl:u-top-193 xl:u-left-23 xl:u-h-547 xl:u-w-666 xl:u-rounded-18">
      <div className="flex items-center gap-4 xl:block">
        <span data-pm="icon" className="relative grid size-14 shrink-0 place-items-center rounded-full bg-[#d3efdd] xl:absolute xl:u-top-17 xl:u-left-16 xl:u-size-70">
          <StethoscopeIcon className="w-7 text-ref-icone-10 xl:absolute xl:u-top-12 xl:u-left-14 xl:u-w-42" />
        </span>
        <h2 id="servicos-titulo" className="text-lg leading-tight font-bold text-ref-tinta-10 xl:absolute xl:u-top-28 xl:u-left-111 xl:u-text-21.25 xl:leading-none xl:whitespace-nowrap">
          Quantas unidades oferecem cada serviço
        </h2>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center xl:static xl:mt-0 xl:block">
        {/* Busca */}
        <label
          htmlFor={searchId}
          className="relative flex h-10 items-center sm:flex-1 rounded-[0.6rem] border-[1.5px] border-[#e3e7e4] bg-white transition-[border-color,box-shadow] duration-300 focus-within:border-ref-barra-2-10 focus-within:shadow-[0_0_0_4px_rgb(59_145_110/0.12)] xl:absolute xl:u-top-68 xl:u-left-111 xl:u-h-35 xl:u-w-237 xl:u-rounded-9"
        >
          <SearchIcon className="pointer-events-none absolute left-3 size-4 text-[#5a6c6b] xl:u-left-12 xl:u-size-17" />
          <span className="sr-only">Buscar serviço</span>
          <input
            id={searchId}
            type="search"
            value={busca}
            onChange={(e) => {
              capture();
              setBusca(e.target.value);
            }}
            placeholder="Buscar serviço..."
            autoComplete="off"
            className="h-full w-full rounded-[inherit] bg-transparent pr-3 pl-9 text-[0.9375rem] text-ref-tinta-10 outline-none placeholder:text-[#757a7f] xl:u-pl-38 xl:u-pr-10 xl:u-text-15 [&::-webkit-search-cancel-button]:hidden"
          />
        </label>

        {/* Mais / Menos oferecidos */}
        <div
          role="group"
          aria-label="Ordenar serviços"
          className="relative grid h-10 grid-cols-[48%_52%] rounded-[0.6rem] bg-[#e8f5ea] text-[0.875rem] font-medium xl:absolute xl:u-top-68 xl:u-left-374.5 xl:u-h-35 xl:u-w-266 xl:u-rounded-9 xl:u-text-14.25"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 left-0 w-[48%] rounded-[inherit] bg-[#0b5d42] shadow-[0_6px_14px_-8px_rgb(5_60_40/0.7)] transition-[translate,width] duration-500 ease-out-expo ${ordem === "menos" ? "w-[52%] translate-x-[92.3%]" : ""}`}
          />
          {(["mais", "menos"] as const).map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={ordem === o}
              onClick={() => {
                if (o === ordem) return;
                capture();
                setOrdem(o);
              }}
              className={`relative z-10 cursor-pointer rounded-[inherit] whitespace-nowrap transition-colors duration-300 ${ordem === o ? "text-white" : "text-[#041e16] hover:text-ref-barra-1-10"}`}
            >
              {o === "mais" ? "Mais oferecidos" : "Menos oferecidos"}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <ul ref={listRef} aria-label="Unidades por serviço" aria-live="polite" className="mt-4 xl:absolute xl:mt-0 xl:u-top-122.5 xl:u-left-0 xl:u-w-666">
        {lista.map((s, i) => (
          <li
            key={s.nome}
            data-row
            data-pm="row"
            className="group/row relative grid grid-cols-[1.75rem_1fr_3rem] items-center gap-x-3 gap-y-1.5 py-2.5 sm:grid-cols-[2rem_13rem_1fr_3rem] xl:block xl:u-h-44.75 xl:py-0 [.motion-ready_&]:opacity-0"
          >
            {/* Destaque ao passar o mouse */}
            <span aria-hidden="true" className="absolute inset-y-[3px] -inset-x-2 rounded-lg bg-[#f2f9f4] opacity-0 transition-opacity duration-300 group-hover/row:opacity-100 xl:u-left-12 xl:u-right-12" />
            {/* Fio entre as linhas */}
            {i > 0 && <span aria-hidden="true" className="absolute top-0 right-0 left-10 h-px bg-[#f0f2f0] xl:u-left-67 xl:u-right-73 xl:u-h-1.5" />}

            <ServicoIcon icone={s.icone} className="relative w-6 justify-self-center text-ref-icone-10 transition-transform duration-500 ease-out-expo group-hover/row:scale-110 xl:absolute xl:top-1/2 xl:u-left-21 xl:u-w-29 xl:-translate-y-1/2 xl:group-hover/row:scale-110" />
            <span className="relative text-[0.9375rem] text-ref-rotulo-10 sm:whitespace-nowrap xl:absolute xl:top-1/2 xl:u-left-69 xl:-translate-y-1/2 xl:u-text-17 xl:leading-none">{s.nome}</span>
            <span className="relative col-span-3 col-start-1 row-start-2 h-3 overflow-hidden rounded-full bg-[#ececec] sm:col-span-1 sm:col-start-3 sm:row-start-1 xl:absolute xl:top-1/2 xl:u-left-299 xl:u-h-16 xl:u-w-294 xl:-translate-y-1/2">
              <span
                data-fill
                data-pm="hbar"
                className="absolute inset-y-0 left-0 origin-left rounded-full transition-[background-color] duration-700"
                style={{ width: `${(s.unidades / ESCALA) * 100}%`, backgroundColor: CORES[Math.min(i, CORES.length - 1)] }}
              />
            </span>
            <strong className="relative text-right text-[0.9375rem] font-bold text-ref-tinta-10 xl:absolute xl:top-1/2 xl:u-right-26 xl:-translate-y-1/2 xl:u-text-17.75 xl:leading-none">
              <span data-count={s.unidades}>{formatar(s.unidades)}</span>
            </strong>
          </li>
        ))}
        {lista.length === 0 && (
          <li className="py-6 text-center text-[0.9375rem] text-ref-suave-10 xl:u-py-24 xl:u-text-16">
            Nenhum serviço encontrado para “{busca.trim()}”.
          </li>
        )}
      </ul>
    </Card>
  );
}
