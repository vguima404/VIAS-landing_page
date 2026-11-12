"use client";

import { useCallback, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { ArrowRightIcon, MenuIcon } from "@/components/ui/icons";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { navSections, sections, type SectionTheme } from "@/lib/sections";
import { site } from "@/lib/site";

import { MobileMenu } from "./mobile-menu";
import { ProgressLine } from "./progress-line";

const MENU_ID = "menu-principal";

/**
 * Navbar única do site (spec §6).
 *
 * Estados, expostos como data-attributes no <header> (`group/nav`):
 * - data-scrolled: no topo do Hero é transparente; depois, Papel translúcido.
 * - data-theme: sobre seções escuras ([data-theme="dark"]) vira a variante
 *   escura, com logo clara. Fundos trocam por crossfade de opacidade.
 * Link ativo conforme a seção visível (aria-current).
 */
export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<SectionTheme>("light");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useGSAP(() => {
    const header = headerRef.current;
    if (!header) return;
    // A troca acontece quando a seção escura encosta na linha de progresso
    // (base da navbar), com 2 px de tolerância para pousos de âncora.
    const navLine = () => header.offsetHeight + 2;

    // Fundo aparece depois do primeiro movimento de scroll
    ScrollTrigger.create({
      start: 16,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive || self.progress >= 1),
    });

    // Contraste: escuro enquanto uma seção escura passa sob a navbar
    const underNav = new Set<Element>();
    gsap.utils.toArray<HTMLElement>('[data-theme="dark"]').forEach((el) => {
      if (header.contains(el)) return;
      ScrollTrigger.create({
        trigger: el,
        start: () => `top ${navLine()}px`,
        end: () => `bottom ${navLine()}px`,
        onToggle: (self) => {
          if (self.isActive) underNav.add(el);
          else underNav.delete(el);
          setTheme(underNav.size > 0 ? "dark" : "light");
        },
      });
    });

    // Seção ativa: a que cruza o meio da viewport
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActiveId(s.id);
        },
      });
    });
  });

  const dark = theme === "dark";

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled}
      data-theme={theme}
      className="group/nav fixed inset-x-0 top-0 z-50 h-(--spacing-nav) data-[theme=dark]:[--focus-ring:var(--color-lima)]"
    >
      {/* Fundos: Papel translúcido e Pinho translúcido, trocados por opacidade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-papel/80 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out-power3 group-data-[scrolled=true]/nav:opacity-100 group-data-[theme=dark]/nav:opacity-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-pinho/85 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-out-power3 group-data-[theme=dark]/nav:opacity-100"
      />

      <div className="container-site relative flex h-full items-center justify-between gap-8">
        <a
          href="#top"
          className={`-m-2 rounded-md p-2 transition-colors duration-500 ${dark ? "text-papel" : "text-pinho"}`}
        >
          <Logo title="VIAS — voltar ao início" className="h-6 w-auto lg:h-7" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className={`group/link relative inline-block py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                    dark
                      ? "text-papel-suave hover:text-papel aria-[current=true]:text-papel"
                      : "text-grafite/70 hover:text-pinho aria-[current=true]:text-pinho"
                  }`}
                >
                  {s.navLabel}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-out-expo group-hover/link:scale-x-100 group-aria-[current=true]/link:scale-x-100 ${
                      dark ? "bg-lima" : "bg-rota"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.demoHref}
            className={`group/cta hidden items-center gap-2 rounded-pill border px-5 py-2.5 text-[0.9375rem] font-medium transition-[color,background-color,border-color,scale] duration-300 active:scale-[0.97] sm:inline-flex ${
              dark
                ? "border-papel/35 text-papel hover:border-lima hover:bg-lima hover:text-pinho"
                : "border-pinho/30 text-pinho hover:border-pinho hover:bg-pinho hover:text-papel"
            }`}
          >
            Explorar demonstração
            <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-0.5" />
          </a>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen(true)}
            className={`-mr-2 grid size-11 place-items-center rounded-full transition-colors lg:hidden ${
              dark ? "text-papel hover:bg-papel/10" : "text-pinho hover:bg-nevoa"
            }`}
          >
            <MenuIcon className="size-6" />
            <span className="sr-only">Abrir menu</span>
          </button>
        </div>
      </div>

      <ProgressLine tone={theme} />

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </header>
  );
}
