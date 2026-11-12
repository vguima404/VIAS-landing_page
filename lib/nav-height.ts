/**
 * Altura da navbar compacta (a que fica depois do primeiro scroll), em px.
 * Fonte única: o scroll-padding-top do <html> (layout.tsx), que já
 * acompanha o breakpoint (4.75rem no mobile, 107u no desktop xl).
 */
export function navHeight() {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
}
