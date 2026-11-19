import { formatar, pct, visaoGeral as d } from "@/lib/painel-data";

import { Card, CardWaves } from "../card";
import { BuildingIcon, CalendarIcon, CrossOutlineIcon, PinIcon } from "../painel-icons";

/**
 * Os quatro indicadores (referência: y 194–352). Medidas em u relativas a
 * cada cartão. Números com `data-count` contam do zero na entrada.
 */

const circle = "relative grid shrink-0 place-items-center rounded-full bg-ref-circulo-10 xl:absolute";
const label = "text-[0.9375rem] leading-snug text-ref-rotulo-10 xl:absolute xl:leading-none";
const number = "font-bold text-ref-tinta-10 xl:absolute xl:leading-none";
const body = "relative flex min-w-0 flex-col gap-1 xl:static xl:block";
const shell = "flex items-center gap-5 p-5 xl:block xl:p-0 xl:u-top-194 xl:u-h-159";

const sus = pct(d.atendemSus, d.unidades);

export function Kpis() {
  return (
    <div className="grid gap-4 px-5 sm:grid-cols-2 sm:px-8 xl:static xl:block xl:p-0">
      {/* Unidades cadastradas */}
      <Card aria-label="Unidades cadastradas" className={`${shell} xl:u-left-28 xl:u-w-324`}>
        <CardWaves />
        <span data-pm="icon" className={`${circle} size-16 xl:u-top-26.5 xl:u-left-19.5 xl:u-size-90`}>
          <BuildingIcon className="w-9 text-ref-icone-10 xl:u-w-54" />
        </span>
        <div className={body}>
          <p className={`${label} xl:u-top-34.5 xl:u-left-127 xl:u-text-18`}>Unidades cadastradas</p>
          <p className={`${number} text-[2.25rem] xl:u-top-61 xl:u-left-126 xl:u-text-45`}>
            <span data-count={d.unidades}>{formatar(d.unidades)}</span>
          </p>
        </div>
      </Card>

      {/* Atendem pelo SUS */}
      <Card aria-label="Atendem pelo SUS" className={`${shell} xl:u-left-365 xl:u-w-324`}>
        <span className="relative grid size-16 shrink-0 place-items-center xl:absolute xl:u-top-26 xl:u-left-24 xl:u-size-89">
          <svg aria-hidden="true" viewBox="0 0 89 89" className="absolute inset-0 size-full -rotate-90">
            <circle cx="44.5" cy="44.5" r="38" fill="none" strokeWidth="13" className="stroke-[#bee6c5]" />
            <circle
              data-pm="ring"
              data-ring={sus}
              cx="44.5"
              cy="44.5"
              r="38"
              fill="none"
              strokeWidth="13"
              pathLength={100}
              strokeDasharray={`${sus - 0.8} 100`}
              strokeDashoffset={-0.4}
              className="stroke-ref-barra-1-10"
            />
          </svg>
          <CrossOutlineIcon className="relative w-7 text-ref-icone-10 xl:u-w-36" />
        </span>
        <div className={body}>
          <p className={`${label} xl:u-top-31.5 xl:u-left-134 xl:u-text-17.5`}>Atendem pelo SUS</p>
          <p className={`${number} text-[2.1rem] text-ref-verde-10 xl:u-top-57.5 xl:u-left-134 xl:u-text-42 xl:whitespace-nowrap`}>
            <span data-count={d.atendemSus}>{d.atendemSus}</span>{" "}
            <span className="font-semibold xl:u-text-30">
              (<span data-count={sus}>{sus}</span>%)
            </span>
          </p>
          <span aria-hidden="true" className="hidden bg-ref-fio-10 xl:absolute xl:block xl:u-top-108.5 xl:u-left-134 xl:u-h-1.5 xl:u-w-166" />
          <p className="text-[0.875rem] text-ref-suave-10 xl:absolute xl:u-top-121.5 xl:u-left-134.5 xl:u-text-17.5 xl:leading-none">
            Não atendem: <strong className="font-bold text-ref-tinta-10" data-count={d.naoAtendemSus}>{d.naoAtendemSus}</strong>
          </p>
        </div>
      </Card>

      {/* Unidades sem coordenadas */}
      <Card aria-label="Unidades sem coordenadas no cadastro" className={`${shell} xl:u-left-702 xl:u-w-339`}>
        <CardWaves />
        <span data-pm="icon" className={`${circle} size-16 xl:u-top-25 xl:u-left-18 xl:u-size-82`}>
          <PinIcon className="w-6 text-ref-icone-10 xl:u-w-32" />
        </span>
        <div className={body}>
          <p className={`${label} xl:u-top-29 xl:u-left-116 xl:u-text-17 xl:u-leading-22.5 xl:whitespace-nowrap`}>
            Unidades sem coordenadas <br className="hidden xl:inline" />
            no cadastro
          </p>
          <p className={`${number} text-[2.25rem] xl:u-top-79.5 xl:u-left-114 xl:u-text-42`}>
            <span data-count={d.semCoordenadas}>{d.semCoordenadas}</span>
          </p>
        </div>
      </Card>

      {/* Período dos dados */}
      <Card aria-label="Período dos dados da fonte" className={`${shell} xl:u-left-1054 xl:u-w-380`}>
        <CardWaves />
        <span data-pm="icon" className={`${circle} size-16 xl:u-top-26 xl:u-left-25 xl:u-size-82`}>
          <CalendarIcon className="w-7 text-ref-icone-10 xl:u-w-36" />
        </span>
        <div className={body}>
          <p className={`${label} xl:u-top-31.5 xl:u-left-128 xl:u-text-16.5`}>Período dos dados da fonte</p>
          <p className="text-[0.9375rem] leading-snug font-bold text-ref-verde-10 xl:absolute xl:u-top-61 xl:u-left-128 xl:u-text-19.5 xl:u-leading-23.5 xl:whitespace-nowrap">
            atualizados entre
            <br />
            {d.periodo.inicio} e {d.periodo.fim}
          </p>
        </div>
      </Card>
    </div>
  );
}
