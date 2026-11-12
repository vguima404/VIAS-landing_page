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

/** Duas pessoas (preenchido): tipo de atendimento, ex. "SUS" */
export function PeopleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" {...props}>
      <circle cx="8" cy="7.2" r="3.3" />
      <circle cx="16.2" cy="7.6" r="3" />
      <path d="M1.8 19.6c0-3.7 2.6-6.4 6.2-6.4s6.2 2.7 6.2 6.4v.9H1.8v-.9Z" />
      <path d="M15.4 20.5v-.9c0-2.1-.7-3.9-1.9-5.2.8-.5 1.7-.8 2.7-.8 3.3 0 5.8 2.5 5.8 5.9v1H15.4Z" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.5 9.5 12 15l5.5-5.5" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 6 15.5 12l-6 6" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  );
}

/** Pessoa caminhando: trecho a pé */
export function WalkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="13" cy="4.3" r="1.7" />
      <path d="M10.2 21l2.3-5.2-2.2-2.6.9-4.6M11.2 8.6l-3 1.6-1.2 3.3M11.2 8.6l2.7 3.2 3.1 1M12.5 15.8l2.2 5.2" />
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

/** Estação com elevador: cabine com pessoa e setas de subir/descer */
export function ElevatorIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3" width="11" height="18" rx="1.5" />
      <circle cx="9" cy="7.2" r="1.5" />
      <path d="M7 17.5v-4.2c0-1.1.9-2 2-2s2 .9 2 2v4.2M18 4.5 20.5 7M18 4.5 15.5 7M18 4.5v6M18 19.5 20.5 17M18 19.5 15.5 17M18 19.5v-6" />
    </Base>
  );
}

/** Triângulo de alerta: informação em falta */
export function AlertTriangleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M10.3 4.1 2.6 17.6A2 2 0 0 0 4.3 20.6h15.4a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4.5M12 17.2h.01" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5.5 12.5 4 4 9-9" />
    </Base>
  );
}

/** Ponto de exclamação (dentro de um círculo de estado) */
export function ExclamationIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 6v8M12 18.2h.01" />
    </Base>
  );
}

/** Rede de nós: inteligência que conecta informações */
export function NetworkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="5" cy="5.5" r="1.9" />
      <circle cx="19" cy="5.5" r="1.9" />
      <circle cx="5" cy="18.5" r="1.9" />
      <circle cx="19" cy="18.5" r="1.9" />
      <path d="M6.4 6.9 10 10.2M17.6 6.9 14 10.2M6.4 17.1 10 13.8M17.6 17.1 14 13.8M7 5.5h10M7 18.5h10" />
    </Base>
  );
}

/** "i" em círculo: aviso informativo */
export function InfoIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.6h.01" />
    </Base>
  );
}
