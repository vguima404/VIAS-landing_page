import Image from "next/image";

import {
  AccessibilityIcon,
  BusIcon,
  ChevronDownIcon,
  ClockIcon,
  CloseIcon,
  PeopleIcon,
  PinIcon,
  SearchIcon,
  WalkIcon,
} from "@/components/ui/icons";

/**
 * Cartões das etapas 01 e 02 (referência 04).
 *
 * Medidas internas em u (px da referência), relativas ao canto do cartão
 * antes da rotação. No desktop os cartões herdam --u da página; abaixo de xl
 * cada cartão redefine --u para caber na coluna (mesmo desenho, menor).
 */

/** Abaixo de xl: 1u acompanha a largura da tela, até 1 px */
const mobileUnit = "max-xl:[--u:min(1px,calc((100vw-3rem)/400))]";

const card =
  "relative shrink-0 rounded-[calc(var(--u)*22)] bg-ref-cartao text-ref-cartao-texto shadow-[0_calc(var(--u)*18)_calc(var(--u)*36)_calc(var(--u)*-14)_rgb(10_40_32/0.38),0_calc(var(--u)*2)_calc(var(--u)*6)_rgb(10_40_32/0.12)]";

/** Etapa 01 · busca por necessidade (não interativo: é uma ilustração da interface) */
export function NeedCard({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`${mobileUnit} ${card} u-h-208 u-w-360 ${className}`}>
      {/* Campo de busca */}
      <div className="absolute u-top-14 u-left-20 u-h-56 u-w-315 rounded-full border-[calc(var(--u)*1.5)] border-black/8 bg-ref-campo shadow-[inset_0_calc(var(--u)*1)_calc(var(--u)*2)_rgb(0_0_0/0.04)]" />
      <SearchIcon className="absolute u-top-28.5 u-left-39 u-size-26" strokeWidth={2.4} />
      <span className="absolute u-top-30 u-left-82 font-sans u-text-20.5 leading-none">Mamografia</span>
      <CloseIcon className="absolute u-top-34 u-left-299 u-size-18" strokeWidth={2.2} />

      {/* Tipo de atendimento */}
      <div className="absolute u-top-80 u-left-32 u-h-56 u-w-315 rounded-full border-[calc(var(--u)*1.5)] border-black/8 bg-ref-campo shadow-[inset_0_calc(var(--u)*1)_calc(var(--u)*2)_rgb(0_0_0/0.04)]" />
      <PeopleIcon className="absolute u-top-94 u-left-53 u-size-28" />
      <span className="absolute u-top-100 u-left-97.5 font-sans u-text-18 leading-none">SUS</span>
      <ChevronDownIcon className="absolute u-top-101.5 u-left-307 u-size-18" strokeWidth={2.4} />

      {/* Botão */}
      <div className="absolute u-top-150 u-left-35 flex u-h-46 u-w-313 items-center justify-center rounded-full bg-ref-botao-04 font-sans u-text-16.5 leading-none font-semibold text-white">
        Buscar unidades
      </div>
    </div>
  );
}

/** Etapa 02 · unidade encontrada */
export function UnitCard({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`${mobileUnit} ${card} u-h-205 u-w-392 ${className}`}>
      {/* Foto da fachada (fornecida em 12/11; recorte na entrada da UBS) */}
      <div className="absolute u-top-7 u-left-7 u-h-191 u-w-173 overflow-hidden rounded-l-[calc(var(--u)*16)] rounded-r-[calc(var(--u)*3)] bg-ref-campo">
        <Image
          src="/images/como-funciona/04-unidade-fachada.webp"
          alt=""
          fill
          sizes="(min-width: 80rem) 12vw, 45vw"
          className="object-cover"
        />
      </div>

      <span className="absolute u-top-35 u-left-198 font-display u-text-23 leading-none font-semibold tracking-[-0.01em]">
        UBS Central
      </span>
      <span className="absolute u-top-72 u-left-199 flex u-h-23 u-w-47 items-center justify-center rounded-full bg-ref-sus font-sans u-text-13 leading-none font-bold text-white">
        SUS
      </span>

      <PinIcon className="absolute u-top-109 u-left-201 u-size-18" strokeWidth={2.2} />
      <span className="absolute u-top-110 u-left-227 font-sans u-text-16.5 leading-none">1,2 km</span>
      <ClockIcon className="absolute u-top-109.5 u-left-293.5 u-size-18" strokeWidth={2.2} />
      <span className="absolute u-top-110 u-left-319 font-sans u-text-16.5 leading-none">15 min</span>

      <span className="absolute u-top-141 u-left-203 h-px u-w-172 bg-black/12" />

      <AccessibilityIcon className="absolute u-top-157 u-left-205 u-size-24" strokeWidth={2} />
      <WalkIcon className="absolute u-top-159 u-left-250 u-size-24" strokeWidth={2} />
      <BusIcon className="absolute u-top-160 u-left-293 u-size-24" strokeWidth={2} />
    </div>
  );
}
