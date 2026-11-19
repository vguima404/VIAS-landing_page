import type { ComponentPropsWithoutRef } from "react";

/**
 * Cartão branco do painel: cantos de 16u, sombra suave e, ao passar o mouse,
 * sobe 3 px com a sombra mais longa. Posição/tamanho vêm de `className`.
 */
export function Card({ className = "", children, ...props }: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      data-pm="card"
      {...props}
      className={[
        "relative overflow-hidden rounded-2xl bg-white",
        "shadow-[0_1px_2px_rgb(12_50_38/0.05),0_10px_28px_-14px_rgb(12_50_38/0.2)]",
        "transition-[translate,box-shadow] duration-500 ease-out-expo",
        "hover:-translate-y-[3px] hover:shadow-[0_2px_4px_rgb(12_50_38/0.05),0_22px_40px_-18px_rgb(12_50_38/0.3)]",
        "xl:absolute xl:u-rounded-16",
        "[.motion-ready_&]:opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

/** Ondas verde-claras no canto inferior direito dos cartões de indicador */
export function CardWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 90"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute right-0 bottom-0 h-[55%] w-[55%] ${className}`}
    >
      <path d="M0 90C40 70 70 30 180 22V90Z" className="fill-[#e9f6ec]" />
      <path d="M50 90C90 66 120 42 180 40V90Z" className="fill-[#dcf0e0]" />
      <path d="M110 90C135 74 155 64 180 62V90Z" className="fill-[#cfe9d4] opacity-70" />
    </svg>
  );
}
