import { Logo } from "@/components/brand/logo";
import { site } from "@/lib/site";

import { FooterMotion } from "./footer-motion";

/**
 * Footer — reprodução da faixa inferior de
 * referencias/landing/09-cta-final-footer.png (y 760–941, 181u de altura).
 *
 * Verde-pinho medido, logo clara + slogan, links, fio, fonte dos dados e
 * copyright. Embaixo, a palavra "VIAS" gigante e discreta, cortada pela borda
 * inferior (SVG fornecido, vias-footer_1.svg), no tamanho e na posição medidos
 * na referência; à esquerda dela, o triângulo mais escuro que aparece na
 * referência.
 *
 * Desktop (xl): medidas em u, no quadro centralizado (hx-*), alinhado com o
 * CTA final logo acima. Abaixo de xl: empilhado.
 */

const hidden = "[.motion-ready_&]:opacity-0";

/** Quadro centralizado, alinhado com o CTA final */
const FRAME = "xl:inset-auto xl:inset-y-0 xl:hx-left-0 xl:u-w-1672";

const links = [
  { label: "Como funciona", href: "#como-funciona", x: "xl:u-left-572" },
  { label: "Acessibilidade", href: "#acessibilidade", x: "xl:u-left-732" },
  { label: "Para gestores", href: "#gestores", x: "xl:u-left-886" },
  { label: "Privacidade", href: site.privacyHref, x: "xl:u-left-1022" },
  { label: "Contato", href: site.contactHref, x: "xl:u-left-1153" },
];

/** vias-footer_1.svg (viewBox -30 90 3890 784; V com a cauda curva à esquerda): V, I, A, S */
const WORDMARK = [
  "M-10,114 L363,114 L685,657 L1007,114 L1267,114 L831,850 L539,850 L231,330 C178,240 74,118 -10,114 Z",
  "M1386,114 H1596 V850 H1386 Z",
  "M2177,114 L2452,114 L2891,850 L2646,850 L2550.0,690 L2079.0,690 L1983,850 L1738,850 Z M2314.5,297.5 L2478.0,570 L2151.0,570 Z",
  "M3030,264 A150,150 0 0 1 3180,114 L3738,114 A30,30 0 0 1 3768,144 L3768,252 A20,20 0 0 1 3748,272 L3298,272 A36,36 0 0 0 3262,308 L3262,352 A36,36 0 0 0 3298,388 L3688,388 A150,150 0 0 1 3838,538 L3838,700 A150,150 0 0 1 3688,850 L3150,850 A120,120 0 0 1 3030,730 L3030,706 A20,20 0 0 1 3050,686 L3574,686 A36,36 0 0 0 3610,650 L3610,584 A36,36 0 0 0 3574,548 L3160,548 A130,130 0 0 1 3030,418 Z",
];

export function Footer() {
  return (
    <FooterMotion
      data-theme="dark"
      className="relative overflow-hidden bg-ref-rodape-09 pt-14 pb-[25vw] text-ref-rodape-texto-09 [--focus-ring:var(--color-lima)] xl:u-h-181 xl:p-0"
    >
      {/* "VIAS" gigante, cortado pela borda inferior (medidas da referência, em px do footer) */}
      {/* Abaixo de xl a faixa é mais larga que a tela, para o "VIAS" ocupar a largura toda */}
      <div
        data-footer="mark"
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-[-55vw] aspect-[1672/181] w-[205vw] xl:aspect-auto ${FRAME} ${hidden}`}
      >
        <svg viewBox="0 0 1672 181" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <polygon points="335,109 254,236 416,236" className="fill-ref-marca-sombra-09" />
          <g transform="translate(436 84) scale(0.216)" className="text-ref-marca-09">
            <g fill="currentColor" stroke="currentColor" strokeWidth="18" strokeLinejoin="round" fillRule="evenodd">
              {WORDMARK.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </g>
        </svg>
      </div>

      <div className={`container-site relative xl:absolute xl:max-w-none xl:p-0 ${FRAME}`}>
        <div data-footer="brand" className={`xl:absolute xl:u-top-21.75 xl:u-left-54 ${hidden}`}>
          <Logo title="VIAS" className="h-8 w-auto text-papel xl:u-h-36.5" />
          <p className="mt-2 text-lg tracking-[-0.02em] xl:absolute xl:u-top-39.5 xl:mt-0 xl:u-text-17.75 xl:u-leading-23 xl:whitespace-nowrap">
            Via Inteligente de Acesso à Saúde
          </p>
        </div>

        <nav aria-label="Rodapé" className="mt-10 xl:static xl:mt-0">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 xl:block">
            {links.map((link) => (
              <li key={link.label} data-footer="link" className={`xl:absolute xl:u-top-38.5 ${link.x} ${hidden}`}>
                <a
                  href={link.href}
                  className="group/link relative inline-block py-1 text-base tracking-[-0.015em] whitespace-nowrap transition-colors duration-300 hover:text-papel xl:py-0 xl:u-text-17 xl:u-leading-22"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lima transition-transform duration-500 ease-out-expo group-hover/link:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span
          data-footer="rule"
          aria-hidden="true"
          className={`mt-10 block h-px bg-ref-divisor-09 xl:absolute xl:u-top-94.5 xl:u-left-54 xl:mt-0 xl:u-h-1.25 xl:u-w-1564 ${hidden}`}
        />

        <div className="mt-5 flex flex-col gap-2 text-sm text-ref-rodape-fino-09 sm:flex-row sm:justify-between xl:static xl:mt-0">
          <p data-footer="fine" className={`xl:absolute xl:u-top-106 xl:u-left-54 xl:u-text-12.5 xl:u-leading-17 xl:tracking-[-0.035em] xl:whitespace-nowrap ${hidden}`}>
            Fonte de dados: CNES / DATASUS.
          </p>
          <p data-footer="fine" className={`xl:absolute xl:u-top-106 xl:u-right-54.5 xl:u-text-12.5 xl:u-leading-17 xl:tracking-[-0.035em] xl:whitespace-nowrap ${hidden}`}>
            © 2026 VIAS · Dados exibidos na demonstração são ilustrativos.
          </p>
        </div>
      </div>
    </FooterMotion>
  );
}
