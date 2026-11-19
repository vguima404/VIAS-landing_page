"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { ease } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

import { Logo } from "@/components/brand/logo";

import { ArrowLeftIcon, GridIcon, HouseIcon } from "./painel-icons";

/**
 * Barra lateral do Painel do gestor (referência: x 0–210, y 0–870).
 * Logo do VIAS (a mesma da landing, pedido de 19/11), menu com o item ativo destacado e, embaixo, a ponte
 * estaiada (ilustração fornecida). "Voltar à landing page" é o item pedido
 * a mais, abaixo do menu, separado por um fio.
 *
 * Abaixo de xl vira uma barra superior com o menu em linha.
 */

const items = [
  { href: "/painel", label: "Visão geral", Icon: HouseIcon, icon: "xl:u-size-23" },
  { href: "/painel/servicos-e-bairros", label: "Serviços e bairros", Icon: GridIcon, icon: "xl:u-size-20" },
] as const;

const hidden = "[.motion-ready_&]:opacity-0";

export function Sidebar() {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const active = items.findIndex((item) => item.href === pathname);

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(ref);
      gsap
        .timeline({ defaults: { ease: ease.expo, duration: 1 } })
        // Logo se revela da esquerda para a direita, como a Linha de Acesso
        .fromTo(q('[data-ps="logo"]'), { opacity: 1, clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" }, 0.05)
        .fromTo(q('[data-ps="item"]'), { opacity: 0, x: -18 }, { opacity: 1, x: 0, stagger: 0.08 }, 0.3)
        .fromTo(q('[data-ps="bridge"]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.8, ease: ease.out }, 0.15);
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <aside
      ref={ref}
      aria-label="Painel do gestor"
      className="relative z-10 overflow-hidden bg-ref-lateral-10 text-ref-nav-texto-10 [--focus-ring:var(--color-lima)] xl:col-start-1 xl:row-start-1"
    >
      {/* Ponte estaiada, encostada na faixa inferior */}
      <div
        data-ps="bridge"
        aria-hidden="true"
        className={`pointer-events-none absolute hidden aspect-[937/1679] [mask-image:linear-gradient(transparent_44%,black_56%)] xl:block xl:-u-left-18 xl:u-bottom-0 xl:u-w-407 ${hidden}`}
      >
        <Image src="/images/painel/ponte-lateral.webp" alt="" fill sizes="30vw" className="object-cover opacity-75 saturate-[0.85]" priority />
      </div>

      <div className="relative flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 xl:block xl:p-0">
        {/* Logo */}
        {/* Logo da landing (wordmark com a Linha de Acesso), clara, pedido de 19/11 */}
        <Link href="/painel" aria-label="VIAS, Painel do gestor" className="block xl:absolute xl:u-top-52 xl:u-left-33">
          <span data-ps="logo" className={`block ${hidden}`}>
            <Logo decorative className="h-8 w-auto text-papel xl:u-h-36.5" />
          </span>
        </Link>

        <nav aria-label="Seções do painel" className="-mx-1 w-full overflow-x-auto sm:w-auto xl:static xl:m-0 xl:overflow-visible">
          <ul className="flex gap-1 xl:block">
            {/* Destaque do item ativo: desliza entre os itens */}
            {active >= 0 && (
              <li
                aria-hidden="true"
                className="pointer-events-none absolute hidden rounded-[0.75rem] border-l-[3px] border-ref-ativo-borda-10 bg-ref-ativo-10 shadow-[0_8px_18px_-10px_rgb(0_0_0/0.5)] transition-[top] duration-500 ease-out-expo xl:block xl:u-left-10 xl:u-h-51 xl:u-w-188 xl:u-rounded-13 xl:u-border-l-3.5"
                style={{ top: `calc(var(--u) * ${active === 0 ? 150 : 209})` }}
              />
            )}
            {items.map(({ href, label, Icon, icon }, i) => {
              const current = i === active;
              return (
                <li key={href} data-ps="item" className={hidden}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    className={[
                      "relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-[0.9375rem] whitespace-nowrap transition-colors duration-300",
                      current ? "bg-ref-ativo-10 xl:bg-transparent" : "hover:bg-white/8",
                      "xl:absolute xl:u-left-10 xl:u-h-51 xl:u-w-188 xl:u-gap-15 xl:u-rounded-13 xl:u-pl-23 xl:py-0 xl:u-text-15.25",
                      i === 0 ? "xl:u-top-150" : "xl:u-top-209",
                    ].join(" ")}
                  >
                    <Icon className={`size-5 shrink-0 text-white ${icon}`} />
                    <span className="xl:u-mt-0">{label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Pedido a mais: volta para a landing page */}
            <li data-ps="item" className={`absolute top-4 right-4 xl:right-auto xl:absolute xl:u-top-282 xl:u-left-24 xl:u-w-162 ${hidden}`}>
              <span aria-hidden="true" className="hidden h-px bg-white/14 xl:block" />
              <Link
                href="/"
                className="group/voltar flex items-center gap-2 rounded-xl px-3 py-2 text-[0.875rem] whitespace-nowrap text-ref-rodape-texto-10 transition-colors duration-300 hover:text-white xl:u-mt-16 xl:p-0 xl:u-gap-10 xl:u-text-14"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/25 transition-[background-color,border-color] duration-300 group-hover/voltar:border-ref-ativo-borda-10 group-hover/voltar:bg-ref-ativo-10 xl:u-size-30">
                  <ArrowLeftIcon className="size-4 transition-transform duration-300 ease-out-expo group-hover/voltar:-translate-x-0.5 xl:u-size-16" />
                </span>
                Voltar à landing page
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
