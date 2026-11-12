import type { SVGProps } from "react";

/**
 * Ícones lineares do VIAS (traço 1.75, cantos arredondados, grade 24).
 * Decorativos por padrão: o texto ao lado dá o nome acessível.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

/** Lupa: "Encontre o serviço ideal" */
export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.4 15.4 20.5 20.5" />
    </Base>
  );
}

/** Marcador de mapa: "Descubra a unidade adequada" */
export function PinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21.5s-6.5-6.2-6.5-11.3a6.5 6.5 0 0 1 13 0c0 5.1-6.5 11.3-6.5 11.3Z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </Base>
  );
}

/** Rota entre dois pontos: "Veja o melhor percurso para você" */
export function RouteIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="5.5" cy="18" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <path d="M7.6 16.6c2.4-1.6 1.6-4.3 4.4-5.6 2.4-1.1 3.6-.9 4.6-2.8" />
    </Base>
  );
}

/** Play (triângulo) para o botão "Conheça o VIAS" */
export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" {...props}>
      <path d="M8.5 5.8v12.4c0 .8.9 1.3 1.6.9l9.6-6.2a1 1 0 0 0 0-1.8l-9.6-6.2c-.7-.4-1.6.1-1.6.9Z" />
    </svg>
  );
}

/** Prancheta: "Qual serviço?" (mesmo ícone de Serviço da UI-02) */
export function ClipboardIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <path d="M9 4.5V3.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v.7M9 10h6M9 13.5h6M9 17h3.5" />
    </Base>
  );
}

/** Prédio simples: unidade de saúde (sem cruz médica) */
export function BuildingIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 20.5h16M6 20.5V8.5l6-3.5 6 3.5v12" />
      <path d="M9.5 11h1M13.5 11h1M9.5 14.5h1M13.5 14.5h1M10.5 20.5v-3h3v3" />
    </Base>
  );
}

/** Ônibus: transporte público */
export function BusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="3.5" width="14" height="15" rx="2.5" />
      <path d="M5 11.5h14M5 7.5h14M8.5 15.5h.01M15.5 15.5h.01M7.5 18.5v2M16.5 18.5v2" />
    </Base>
  );
}

/** Cadeira de rodas: condições de acesso */
export function AccessibilityIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M11 8.5v5.5h5l2 4.5M11 11h4" />
      <path d="M8.2 11.6a5 5 0 1 0 6.9 6.6" />
    </Base>
  );
}
