import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

/**
 * Wordmark oficial do VIAS (com a Linha de Acesso cortando as letras).
 * Usa `currentColor`: verde-pinho em fundos claros (`text-pinho`),
 * Papel em fundos escuros (`text-papel`), equivalente à "logo clara".
 */
export function Logo({
  className,
  title = "VIAS",
  decorative = false,
}: {
  className?: string;
  /** Nome acessível (ignorado se `decorative`) */
  title?: string;
  /** `true` quando o texto ao lado já nomeia a marca */
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      fill="currentColor"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
