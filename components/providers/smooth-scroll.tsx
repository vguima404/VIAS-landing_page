"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { navHeight } from "@/lib/nav-height";
import { smoothScroll } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LenisContext = createContext<Lenis | null>(null);

/** Instância do Lenis (ou `null` com movimento reduzido / antes de montar). */
export const useLenis = () => useContext(LenisContext);

/** Leva o foco ao destino da âncora, para teclado e leitores de tela. */
function focusTarget(el: HTMLElement) {
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * Smooth scroll com Lenis dirigido pelo ticker do GSAP, para que
 * ScrollTrigger e Lenis leiam a mesma posição no mesmo frame.
 * Com prefers-reduced-motion o Lenis não é criado: scroll nativo.
 * Também trata cliques em links "#ancora" (scroll suave + foco).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Lenis + ticker do GSAP
  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      lerp: smoothScroll.lerp,
      wheelMultiplier: smoothScroll.wheelMultiplier,
      touchMultiplier: smoothScroll.touchMultiplier,
      autoRaf: false,
      anchors: false, // tratado abaixo, com offset e foco
    });

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- expõe a instância via contexto
    setLenis(instance);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // Links de âncora internos
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;

      const hash = link.getAttribute("href")!;
      const target = hash === "#" || hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target) return;

      event.preventDefault();

      if (lenis) {
        // Pausado (ex.: menu mobile fechando): reativa antes, pois start()
        // chamado depois cancelaria a rolagem em curso
        if (lenis.isStopped) lenis.start();
        // O Lenis já desconta o scroll-padding-top do <html> (= altura da navbar)
        lenis.scrollTo(target === document.body ? 0 : target, {
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: () => focusTarget(target),
        });
      } else {
        // scrollTo por coordenada ignora o scroll-padding: desconta a navbar aqui
        const top = target === document.body ? 0 : target.getBoundingClientRect().top + window.scrollY - navHeight();
        window.scrollTo({ top });
        focusTarget(target);
      }
      history.pushState(null, "", hash === "#top" ? location.pathname : hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
