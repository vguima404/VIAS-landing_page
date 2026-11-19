/**
 * Ícones do Painel do gestor, desenhados a partir de
 * referencias/gestor/10-painel-gestor.png. Todos decorativos (aria-hidden):
 * o texto ao lado sempre nomeia o que o ícone mostra.
 * Usam `currentColor`; onde há "furos", a cor do furo vem de `holeClassName`.
 */

type IconProps = { className?: string };
type HoleProps = IconProps & { holeClassName?: string };

const base = { "aria-hidden": true, focusable: false } as const;

export function HouseIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 23 23" className={className} fill="currentColor">
      <path d="M11.5 1.2 22.3 10.6c.5.4.2 1.1-.4 1.1H20V21.4c0 .6-.4 1-1 1h-4.6v-6.6H8.6v6.6H4c-.6 0-1-.4-1-1V11.7H1.1c-.6 0-.9-.7-.4-1.1Z" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 20 20" className={className} fill="currentColor">
      <rect x="0" y="0" width="8.6" height="8.6" rx="2" />
      <rect x="11.4" y="0" width="8.6" height="8.6" rx="2" />
      <rect x="0" y="11.4" width="8.6" height="8.6" rx="2" />
      <rect x="11.4" y="11.4" width="8.6" height="8.6" rx="2" />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightSmall({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Prédio de saúde com cruz (Unidades cadastradas) */
export function BuildingIcon({ className, holeClassName = "fill-ref-circulo-10" }: HoleProps) {
  return (
    <svg {...base} viewBox="0 0 54 41" className={className}>
      <g fill="currentColor">
        <path d="M17 4c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v37H17Z" />
        <path d="M2 12h13.5v29H0V14c0-1.1.9-2 2-2Z" />
        <path d="M38.5 12H52c1.1 0 2 .9 2 2v27H38.5Z" />
      </g>
      <g className={holeClassName}>
        <path d="M25 4.5h4v4h4v4h-4v4h-4v-4h-4v-4h4Z" />
        <path d="M22.5 41v-6.5a4.5 4.5 0 0 1 9 0V41Z" />
        <rect x="3.5" y="17" width="3.6" height="3.6" rx=".6" />
        <rect x="9" y="17" width="3.6" height="3.6" rx=".6" />
        <rect x="3.5" y="24" width="3.6" height="3.6" rx=".6" />
        <rect x="9" y="24" width="3.6" height="3.6" rx=".6" />
        <rect x="3.5" y="31" width="3.6" height="3.6" rx=".6" />
        <rect x="9" y="31" width="3.6" height="3.6" rx=".6" />
        <rect x="41.4" y="17" width="3.6" height="3.6" rx=".6" />
        <rect x="46.9" y="17" width="3.6" height="3.6" rx=".6" />
        <rect x="41.4" y="24" width="3.6" height="3.6" rx=".6" />
        <rect x="46.9" y="24" width="3.6" height="3.6" rx=".6" />
        <rect x="41.4" y="31" width="3.6" height="3.6" rx=".6" />
        <rect x="46.9" y="31" width="3.6" height="3.6" rx=".6" />
        <rect x="21" y="21" width="3.6" height="3.6" rx=".6" />
        <rect x="29.4" y="21" width="3.6" height="3.6" rx=".6" />
      </g>
    </svg>
  );
}

/** Cruz vazada (centro do anel "Atendem pelo SUS") */
export function CrossOutlineIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 36 36" className={className} fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinejoin="round">
      <path d="M13 2.5h10v10.5h10.5v10H23v10.5H13V23H2.5V13H13Z" />
    </svg>
  );
}

/** Pin com sombra (Unidades sem coordenadas) */
export function PinIcon({ className, holeClassName = "fill-ref-circulo-10" }: HoleProps) {
  return (
    <svg {...base} viewBox="0 0 30 44" className={className}>
      <ellipse cx="15" cy="40" rx="15" ry="4" className="fill-[#a9dcb2]" />
      <path d="M15 40C11 33.5 1 25 1 14.5a14 14 0 0 1 28 0C29 25 19 33.5 15 40Z" fill="currentColor" />
      <circle cx="15" cy="14.5" r="5.6" className={holeClassName} />
    </svg>
  );
}

/** Calendário (Período dos dados da fonte) */
export function CalendarIcon({ className, holeClassName = "fill-ref-circulo-10" }: HoleProps) {
  return (
    <svg {...base} viewBox="0 0 36 38" className={className}>
      <rect x="0" y="5" width="36" height="33" rx="5" fill="currentColor" />
      <rect x="7" y="0" width="4.4" height="10" rx="2.2" fill="currentColor" stroke="white" strokeWidth="1.6" />
      <rect x="24.6" y="0" width="4.4" height="10" rx="2.2" fill="currentColor" stroke="white" strokeWidth="1.6" />
      <g className={holeClassName}>
        <rect x="6" y="16" width="6.6" height="6" rx="1" />
        <rect x="14.7" y="16" width="6.6" height="6" rx="1" />
        <rect x="23.4" y="16" width="6.6" height="6" rx="1" />
        <rect x="6" y="25" width="6.6" height="6" rx="1" />
        <rect x="14.7" y="25" width="6.6" height="6" rx="1" />
      </g>
    </svg>
  );
}

/** Círculo com "i" */
export function InfoIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 20 20" className={className}>
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <circle cx="10" cy="5.6" r="1.5" className="fill-white" />
      <rect x="8.6" y="8.4" width="2.8" height="7.4" rx="1.2" className="fill-white" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 12 8" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.2 1.4 6 6.2l4.8-4.8" />
    </svg>
  );
}

/** Três barras (título "Unidades por tipo") */
export function BarsIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 28 29" className={className} fill="currentColor">
      <rect x="0" y="16" width="7.4" height="13" rx="1.6" />
      <rect x="10.3" y="8" width="7.4" height="21" rx="1.6" />
      <rect x="20.6" y="0" width="7.4" height="29" rx="1.6" />
    </svg>
  );
}

/** Pizza com fatia destacada (título "Atendimento SUS") */
export function PieIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className} fill="currentColor">
      <path d="M13.6 1.4v15h15A14.4 14.4 0 1 1 13.6 1.4Z" />
      <path d="M16.4 0A13.6 13.6 0 0 1 30 13.6H16.4Z" />
    </svg>
  );
}

/** Triângulo de alerta com "!" */
export function WarningIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 36 32" className={className}>
      <path
        d="M15.3 2.2c1.2-2.1 4.2-2.1 5.4 0l14.6 25.3c1.2 2.1-.3 4.5-2.7 4.5H3.4c-2.4 0-3.9-2.4-2.7-4.5Z"
        fill="currentColor"
      />
      <rect x="16.3" y="10" width="3.4" height="11.5" rx="1.7" className="fill-white" />
      <circle cx="18" cy="25.8" r="2" className="fill-white" />
    </svg>
  );
}

/** Banco de dados (faixa inferior) */
export function DatabaseIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 20 21" className={className} fill="currentColor">
      <ellipse cx="10" cy="3.3" rx="10" ry="3.3" />
      <path d="M0 5.6c1.4 1.7 5.4 2.6 10 2.6s8.6-.9 10-2.6v3.6c0 1.8-4.5 3.3-10 3.3S0 11 0 9.2Z" />
      <path d="M0 11.3c1.4 1.7 5.4 2.6 10 2.6s8.6-.9 10-2.6v3.6c0 1.8-4.5 3.3-10 3.3S0 16.7 0 14.9Z" opacity=".85" />
      <path d="M0 17c1.4 1.4 5.4 2.2 10 2.2s8.6-.8 10-2.2v.7c0 1.8-4.5 3.3-10 3.3S0 19.5 0 17.7Z" opacity=".7" />
    </svg>
  );
}



/** Lupa (busca de distritos) */
export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}
