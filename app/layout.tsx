import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

import { Navbar } from "@/components/navbar/navbar";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "VIAS — Via Inteligente de Acesso à Saúde";
const description =
  "Diga o que você precisa, e o VIAS mostra onde ser atendido e como chegar lá do seu jeito. Necessidade, unidade e percurso conectados.";

export const metadata: Metadata = {
  title: { default: title, template: "%s · VIAS" },
  description,
  applicationName: "VIAS",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "VIAS",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#F6F7F1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={[
        spaceGrotesk.variable,
        inter.variable,
        plexMono.variable,
        "bg-papel font-sans text-grafite antialiased optimizeLegibility",
        // Âncoras descontam a navbar fixa; sem Lenis (reduced motion off), rolagem nativa suave
        "scroll-pt-(--spacing-nav) motion-safe:not-[.lenis]:scroll-smooth",
        // Cor do anel de foco (seções escuras redefinem para lima)
        "[--focus-ring:var(--color-rota)]",
      ].join(" ")}
    >
      <body
        className={[
          "min-h-dvh overflow-x-clip",
          "selection:bg-lima selection:text-pinho",
          "**:focus-visible:outline-2 **:focus-visible:outline-offset-3 **:focus-visible:outline-(--focus-ring)",
        ].join(" ")}
      >
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-100 -translate-y-[160%] rounded-pill bg-pinho px-5 py-3 font-semibold text-papel transition-transform duration-300 ease-out-expo [--focus-ring:var(--color-lima)] focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
