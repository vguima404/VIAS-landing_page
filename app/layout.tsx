import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

import { Navbar } from "@/components/navbar/navbar";
import { ReferenceOverlay } from "@/components/dev/reference-overlay";
import { PhoneCanvasMount } from "@/components/phone";
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
      // O script inline abaixo adiciona .motion-ready antes da hidratação
      suppressHydrationWarning
      className={[
        spaceGrotesk.variable,
        inter.variable,
        plexMono.variable,
        "bg-papel font-sans text-grafite antialiased optimizeLegibility",
        // Contêiner de largura: base da unidade de referência --u (ver globals.css)
        "@container",
        // Âncoras descontam a navbar fixa (no desktop xl: 107u, compacta);
        // sem Lenis (reduced motion), rolagem nativa suave
        "scroll-pt-(--spacing-nav) xl:scroll-pt-[calc(min(100vw/1672,100svh/941)*107)] motion-safe:not-[.lenis]:scroll-smooth",
        // Cor do anel de foco (seções escuras redefinem para lima)
        "[--focus-ring:var(--color-rota)]",
      ].join(" ")}
    >
      <head>
        {/*
          Oculta os elementos de entrada (data-hero etc.) antes do primeiro
          paint, só quando há movimento. Se o JS de animação não iniciar em 4 s,
          devolve tudo ao estado visível.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-ready');setTimeout(function(){if(!window.__motionStarted)d.classList.remove('motion-ready')},4000)}}catch(e){}})();",
          }}
        />
      </head>
      <body
        className={[
          "min-h-dvh overflow-x-clip",
          // 1u = 1 px da referência; o quadro 1672×941 cabe inteiro na tela
          "[--u:min(calc(100cqw/1672),calc(100svh/941))]",
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
          <PhoneCanvasMount />
          {process.env.NODE_ENV === "development" && <ReferenceOverlay />}
        </SmoothScroll>
      </body>
    </html>
  );
}
