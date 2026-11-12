"use client";

import { useEffect, useRef } from "react";

import { AccessNodeGlyph } from "@/components/access-line";
import { Logo } from "@/components/brand/logo";
import { useLenis } from "@/components/providers/smooth-scroll";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { navSections } from "@/lib/sections";
import { site } from "@/lib/site";

/**
 * Menu mobile: <dialog> modal nativo.
 * - showModal() torna o resto da página inerte e prende o foco no painel;
 * - Esc fecha; o foco volta ao botão que abriu;
 * - o Lenis pausa enquanto o painel está aberto.
 * Entrada/saída com opacity + translate (`starting:` e `transition-discrete`).
 */
export function MobileMenu({
  id,
  open,
  onClose,
  activeId,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  activeId: string | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  // Abre/fecha conforme o estado
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, lenis]);

  // Fechamento por qualquer via (Esc, link, botão): sincroniza o estado
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      // start() reinicia o Lenis e cancelaria uma rolagem já em curso
      if (lenis?.isStopped) lenis.start();
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [lenis, onClose]);

  // Ao passar para o layout desktop, o menu deixa de existir
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 64rem)");
    const handle = () => mql.matches && dialogRef.current?.open && dialogRef.current.close();
    mql.addEventListener("change", handle);
    return () => mql.removeEventListener("change", handle);
  }, []);

  const close = () => dialogRef.current?.close();

  /**
   * Link do menu: reativa o Lenis antes de fechar, para que a rolagem até a
   * âncora (feita em seguida pelo SmoothScroll) não seja cancelada.
   */
  const closeForNavigation = () => {
    if (lenis?.isStopped) lenis.start();
    close();
  };

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-label="Menu"
      data-lenis-prevent
      className={[
        "fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-papel p-0 text-grafite",
        "[--focus-ring:var(--color-rota)] backdrop:bg-transparent",
        "-translate-y-3 opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-500 ease-out-expo",
        "open:translate-y-0 open:opacity-100 starting:open:-translate-y-3 starting:open:opacity-0",
        "motion-reduce:translate-y-0 motion-reduce:duration-200 lg:hidden",
      ].join(" ")}
    >
      <div className="container-site flex min-h-full flex-col pb-10">
        <div className="flex h-(--spacing-nav) items-center justify-between border-b border-linha">
          <Logo decorative className="h-6 w-auto text-pinho" />
          <button
            type="button"
            onClick={close}
            className="-mr-2 grid size-11 place-items-center rounded-full text-pinho transition-colors hover:bg-nevoa"
          >
            <CloseIcon className="size-6" />
            <span className="sr-only">Fechar menu</span>
          </button>
        </div>

        <nav aria-label="Principal (menu)" className="mt-10 flex-1">
          <ol className="relative grid gap-1 border-l border-linha pl-7">
            {navSections.map((s, i) => (
              <li
                key={s.id}
                className="translate-y-2 opacity-0 transition-[opacity,translate] duration-600 ease-out-expo in-open:translate-y-0 in-open:opacity-100 motion-reduce:translate-y-0"
                style={{ transitionDelay: `${120 + i * 60}ms` }}
              >
                <a
                  href={`#${s.id}`}
                  onClick={closeForNavigation}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className="group/item relative flex items-baseline gap-4 py-3 font-display text-[2rem] leading-tight font-bold tracking-tight text-pinho"
                >
                  <AccessNodeGlyph
                    kind="junction"
                    active={activeId === s.id}
                    className="absolute top-1/2 -left-7 size-4 -translate-1/2"
                  />
                  <span className="label-mono text-rota">{s.number}</span>
                  <span className="transition-transform duration-300 ease-out-expo group-hover/item:translate-x-1">
                    {s.navLabel}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <a
          href={site.demoHref}
          onClick={closeForNavigation}
          className="group/cta mt-10 inline-flex items-center justify-center gap-2 rounded-pill bg-pinho px-6 py-4 text-base font-semibold text-papel transition-[scale] active:scale-[0.98]"
        >
          Explorar demonstração
          <ArrowRightIcon className="size-5 transition-transform duration-300 ease-out-expo group-hover/cta:translate-x-0.5" />
        </a>
      </div>
    </dialog>
  );
}
