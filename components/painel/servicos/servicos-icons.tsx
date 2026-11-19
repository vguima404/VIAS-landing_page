import type { ServicoIcone } from "@/lib/painel-data";

/**
 * Ícones e ilustrações de "Serviços e bairros", desenhados a partir de
 * referencias/gestor/11-servicos-bairros.png. Decorativos (aria-hidden),
 * em `currentColor`.
 */

type P = { className?: string };
const base = { "aria-hidden": true, focusable: false } as const;
const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Ecg({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 28" className={className}>
      <path d="M15 27C6 20.4 0 15 0 8.6A7.6 7.6 0 0 1 15 5.4a7.6 7.6 0 0 1 15 3.2C30 15 24 20.4 15 27Z" fill="currentColor" />
      <path d="M1.5 13.5h7l2-4.5 3.4 9 3.2-11 2.3 6.5H28.5" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Laboratorio({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 26 30" className={className}>
      <path d="M8 1h10a1.2 1.2 0 0 1 0 2.4h-1V11l7.7 13.4c1.1 2-.3 4.6-2.6 4.6H3.9c-2.3 0-3.7-2.6-2.6-4.6L9 11V3.4H8A1.2 1.2 0 0 1 8 1Z" fill="currentColor" />
      <path d="M11.4 3.4v8.3L8.6 16.6h8.8l-2.8-4.9V3.4Z" fill="white" opacity=".28" />
    </svg>
  );
}

function Clinica({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className}>
      <circle cx="15" cy="15" r="15" fill="currentColor" />
      <path d="M12.3 6.8h5.4v5.5h5.5v5.4h-5.5v5.5h-5.4v-5.5H6.8v-5.4h5.5Z" fill="white" />
    </svg>
  );
}

function Vacina({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className} {...line}>
      <path d="m21 3 6 6M24 6l-4 4" />
      <path d="M20 10 9.5 20.5l-3-3L17 7Z" fill="currentColor" />
      <path d="m6.5 20.5-4 4M11 10.5l2 2M13.6 8l2 2" />
    </svg>
  );
}

function Pediatria({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className} {...line}>
      <circle cx="15" cy="16" r="12.5" />
      <path d="M12.5 3.8c0 2.2 1.6 3.4 3.3 3.4 1.5 0 2.4-1 2.4-2.2" />
      <path d="M10.5 20c2.4 2.4 6.6 2.4 9 0" />
      <circle cx="10.7" cy="14.6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="19.3" cy="14.6" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Ultrassom({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 28" className={className}>
      <rect x="0" y="0" width="30" height="21" rx="2.6" fill="currentColor" />
      <rect x="3.2" y="3.2" width="23.6" height="14.6" rx="1" fill="white" />
      <path d="M15 5.5c2.6 3 4.4 5.2 4.4 7.1a4.4 4.4 0 0 1-8.8 0c0-1.9 1.8-4.1 4.4-7.1Z" fill="currentColor" />
      <path d="M11 21v4.2M19 21v4.2M7.5 26.6h15" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function Dermatologia({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className} {...line}>
      <path d="M2 14.5h26M2 19.5h26M4 14.5v12h22v-12" />
      <path d="M15 19.5V11c0-4 1.5-7 4.5-9" />
      <path d="M12.5 19.5c0-3 1-4.6 2.5-4.6s2.5 1.6 2.5 4.6" fill="currentColor" />
      <path d="M8 23h2M20 23h2" />
    </svg>
  );
}

function Mamografia({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 22 30" className={className}>
      <path
        d="M11 1.2c3.4 0 5.6 2.4 5.6 5.4 0 2.4-1.3 4.8-3.1 7.4l7.3 10.4-4.6 4.4L11 20.6l-5.2 8.2-4.6-4.4L8.5 14C6.7 11.4 5.4 9 5.4 6.6c0-3 2.2-5.4 5.6-5.4Zm0 3.8c-1.2 0-1.9.8-1.9 1.9 0 1.2.8 2.7 1.9 4.4 1.1-1.7 1.9-3.2 1.9-4.4 0-1.1-.7-1.9-1.9-1.9Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function Ressonancia({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className}>
      <path d="M15 1a13 13 0 0 1 10 21.3V26H5v-3.7A13 13 0 0 1 15 1Zm0 5.2a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2Z" fill="currentColor" fillRule="evenodd" />
      <circle cx="15" cy="13.8" r="3.4" fill="currentColor" />
      <rect x="2" y="25.6" width="26" height="3.2" rx="1.6" fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<ServicoIcone, (p: P) => React.JSX.Element> = {
  ecg: Ecg,
  laboratorio: Laboratorio,
  clinica: Clinica,
  vacina: Vacina,
  pediatria: Pediatria,
  ultrassom: Ultrassom,
  dermatologia: Dermatologia,
  mamografia: Mamografia,
  ressonancia: Ressonancia,
};

export function ServicoIcon({ icone, className }: { icone: ServicoIcone; className?: string }) {
  const Icon = ICONS[icone];
  return <Icon className={className} />;
}

/** Estetoscópio (título do cartão de serviços) */
export function StethoscopeIcon({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 42 46" className={className} fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2.5H3.5v12a10 10 0 0 0 20 0v-12H21" />
      <path d="M13.5 24.5v6.5a10 10 0 0 0 20 0v-4" />
      <circle cx="33.5" cy="22" r="5" />
    </svg>
  );
}

/** Pin simples (título dos bairros) */
export function PlacePinIcon({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 28 37" className={className}>
      <path d="M14 37C10 30.5 0 22.6 0 13.6a14 14 0 0 1 28 0C28 22.6 18 30.5 14 37Zm0-17.6a5.8 5.8 0 1 0 0-11.6 5.8 5.8 0 0 0 0 11.6Z" fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Prancheta com cruz e lupa ("Serviços com menos unidades") */
export function ClipboardIllustration({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 110 136" className={className}>
      <g data-clip="board">
        <rect x="4" y="12" width="82" height="112" rx="7" fill="white" stroke="currentColor" strokeWidth="3.4" />
        <rect x="27" y="3" width="36" height="17" rx="4.5" fill="currentColor" />
        <circle cx="45" cy="9" r="3" fill="white" />
        <path d="M38.5 34h13v13h13v13h-13v13h-13V60h-13V47h13Z" fill="currentColor" />
        <path d="M18 86h54M18 96h54M18 106h36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
      </g>
      <g data-clip="lens">
        <circle cx="80" cy="104" r="16" fill="white" fillOpacity=".75" stroke="currentColor" strokeWidth="3.6" />
        <path d="M73 104h14M87 98v12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        <path d="m91.5 115.5 13 13" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Município de São Paulo, estilizado (contorno irregular com os limites dos
 * distritos em branco) e o pin no centro.
 */
export function SaoPauloMap({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 162 168" className={className}>
      <path data-map="shape" d="M58 12 A8.3 8.3 0 0 1 70.0 6.0 A4.7 4.7 0 0 1 77.0 9.0 A4.7 4.7 0 0 1 84.0 12.0 A4.5 4.5 0 0 1 91.0 10.0 A4.5 4.5 0 0 1 98.0 8.0 A4.8 4.8 0 0 1 103.0 14.0 A4.8 4.8 0 0 1 108.0 20.0 A4.5 4.5 0 0 1 115.0 18.0 A4.5 4.5 0 0 1 122.0 16.0 A4.5 4.5 0 0 1 128.0 20.0 A4.5 4.5 0 0 1 134.0 24.0 A4.7 4.7 0 0 1 137.0 31.0 A4.7 4.7 0 0 1 140.0 38.0 A7.0 7.0 0 0 1 148.0 46.0 A4.4 4.4 0 0 1 147.0 53.0 A4.4 4.4 0 0 1 146.0 60.0 A4.4 4.4 0 0 1 151.0 65.0 A4.4 4.4 0 0 1 156.0 70.0 A5.1 5.1 0 0 1 158.0 78.0 A5.1 5.1 0 0 1 160.0 86.0 A4.7 4.7 0 0 1 157.0 93.0 A4.7 4.7 0 0 1 154.0 100.0 A7.8 7.8 0 0 1 158.0 112.0 A4.8 4.8 0 0 1 152.0 117.0 A4.8 4.8 0 0 1 146.0 122.0 A4.4 4.4 0 0 1 139.0 123.0 A4.4 4.4 0 0 1 132.0 124.0 A4.5 4.5 0 0 1 128.0 130.0 A4.5 4.5 0 0 1 124.0 136.0 A7.5 7.5 0 0 1 112.0 138.0 A4.7 4.7 0 0 1 109.0 145.0 A4.7 4.7 0 0 1 106.0 152.0 A4.5 4.5 0 0 1 102.0 158.0 A4.5 4.5 0 0 1 98.0 164.0 A7.8 7.8 0 0 1 86.0 160.0 A8.3 8.3 0 0 1 80.0 148.0 A7.9 7.9 0 0 1 70.0 140.0 A7.5 7.5 0 0 1 58.0 142.0 A4.5 4.5 0 0 1 54.0 136.0 A4.5 4.5 0 0 1 50.0 130.0 A7.4 7.4 0 0 1 38.0 130.0 A7.9 7.9 0 0 1 28.0 122.0 A7.8 7.8 0 0 1 16.0 118.0 A4.8 4.8 0 0 1 11.0 112.0 A4.8 4.8 0 0 1 6.0 106.0 A4.5 4.5 0 0 1 4.0 99.0 A4.5 4.5 0 0 1 2.0 92.0 A4.5 4.5 0 0 1 6.0 86.0 A4.5 4.5 0 0 1 10.0 80.0 A4.4 4.4 0 0 1 9.0 73.0 A4.4 4.4 0 0 1 8.0 66.0 A4.4 4.4 0 0 1 13.0 61.0 A4.4 4.4 0 0 1 18.0 56.0 A4.5 4.5 0 0 1 22.0 50.0 A4.5 4.5 0 0 1 26.0 44.0 A6.7 6.7 0 0 1 36.0 40.0 A8.3 8.3 0 0 1 42.0 28.0 A6.3 6.3 0 0 1 52.0 26.0 A4.7 4.7 0 0 1 55.0 19.0 A4.7 4.7 0 0 1 58.0 12.0Z" className="fill-[#c4e7cf]" />
      <g data-map="lines" fill="none" strokeWidth="1.1" strokeLinecap="round" className="stroke-[#a3d2b1]">
        <path d="M84 84 Q75.3 64.7 60 50" />
        <path d="M60 50 Q71.7 41.3 86 38" />
        <path d="M60 50 Q67.8 28.3 84 12" />
        <path d="M84 84 Q81.0 60.8 86 38" />
        <path d="M86 38 Q100.4 42.4 112 52" />
        <path d="M86 38 Q111.4 35.8 134 24" />
        <path d="M84 84 Q101.0 70.6 112 52" />
        <path d="M112 52 Q121.7 65.7 126 82" />
        <path d="M112 52 Q135.9 56.4 156 70" />
        <path d="M84 84 Q104.8 79.0 126 82" />
        <path d="M126 82 Q122.8 97.2 114 110" />
        <path d="M126 82 Q131.5 104.2 146 122" />
        <path d="M84 84 Q96.4 100.0 114 110" />
        <path d="M114 110 Q102.3 118.7 88 122" />
        <path d="M114 110 Q114.9 131.9 106 152" />
        <path d="M84 84 Q90.0 102.6 88 122" />
        <path d="M88 122 Q73.0 119.8 60 112" />
        <path d="M88 122 Q70.2 127.8 58 142" />
        <path d="M84 84 Q69.0 95.4 60 112" />
        <path d="M60 112 Q48.5 99.6 42 84" />
        <path d="M60 112 Q38.7 120.0 16 118" />
        <path d="M84 84 Q63.0 88.0 42 84" />
        <path d="M42 84 Q48.3 65.6 60 50" />
        <path d="M42 84 Q33.8 66.7 18 56" />
      </g>
      <ellipse cx="78.5" cy="85" rx="14" ry="4.5" className="fill-ref-icone-10" opacity=".16" />
    </svg>
  );
}
