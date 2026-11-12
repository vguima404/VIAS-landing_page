"use client";

import { AccessLine } from "@/components/access-line";

import { STREETS_PATH } from "./streets";

/**
 * Minimapa do canto inferior esquerdo (referência 03): a rota começa cinza,
 * passa pelo pin lima e segue em lima — e não chega a lugar nenhum.
 * As lacunas entre os trechos aparecem no desenho ligado ao scroll
 * (Linha de Acesso fragmentada: "o caminho fica mais incerto").
 * Coordenadas em px da referência (viewBox 1672×941).
 */
export function ProblemaMap() {
  return (
    <div aria-hidden="true" className="absolute inset-0 hidden xl:block">
      {/* Ruas: linhas brancas finas que surgem de baixo e somem perto do texto e da foto */}
      <svg
        data-problema="streets"
        viewBox="0 0 1672 941"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full [.motion-ready_&]:opacity-0"
      >
        <defs>
          <linearGradient id="problema-streets-fade-y" x1="0" y1="662" x2="0" y2="760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#000" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
          <mask id="problema-streets-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
            <rect x="0" y="0" width="1672" height="941" fill="url(#problema-streets-fade-y)" />
          </mask>
        </defs>
        <path
          d={STREETS_PATH}
          mask="url(#problema-streets-mask)"
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="stroke-white/90"
        />
      </svg>

      <AccessLine
        width={1672}
        height={941}
        stretch
        className="absolute! inset-0"
        mode={{ type: "scrub", start: "top 35%", end: "bottom 95%" }}
        strokeWidth={2.4}
        segments={[
          {
            d: "M0 808 C 60 806, 130 797, 170 798 S 196 808, 205 812 S 255 822, 275 825",
            from: 0,
            to: 0.42,
            className: "stroke-ref-rota-cinza",
          },
          {
            d: "M287 830 C 300 834, 318 840, 330 845 S 430 873, 460 885 S 515 920, 530 941",
            from: 0.52,
            to: 1,
            className: "stroke-ref-rota-lima",
          },
        ]}
      />

      {/* Pin lima: ponta em (284, 803) */}
      <span data-problema="pin" className="absolute u-top-755 u-left-266 [.motion-ready_&]:opacity-0">
        <svg viewBox="0 0 36 50" className="block u-h-50 u-w-36 drop-shadow-[0_2px_3px_rgb(0_0_0/0.18)]">
          <path d="M18 49C18 49 1.5 29.5 1.5 17a16.5 16.5 0 0 1 33 0C34.5 29.5 18 49 18 49Z" className="fill-ref-pin-lima" />
          <circle cx="18" cy="17" r="8.2" className="fill-white" />
          <circle cx="18" cy="17" r="4.6" className="fill-ref-pin-centro" />
        </svg>
      </span>
    </div>
  );
}
