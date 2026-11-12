# VIAS — Via Inteligente de Acesso à Saúde · Landing page

Landing page imersiva do VIAS. Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText, DrawSVG) + Lenis.
O iPhone 3D (React Three Fiber) entra na Etapa 3.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Estrutura

```
app/                 layout (fontes, metadata, skip link), página, tokens CSS (globals.css), ícone
components/
  access-line/       Linha de Acesso: linha + nós (origem, conexão, acesso), desenho no scroll
  brand/             Logo (SVG com currentColor: pinho no claro, papel no escuro)
  providers/         SmoothScroll (Lenis + ticker do GSAP + âncoras com foco)
  sections/          seções da página (uma pasta por seção a partir da Etapa 3.1)
lib/
  tokens.ts          cores, easings, durações (espelho JS dos tokens CSS)
  gsap.ts            registro único dos plugins GSAP
  sections.ts        ids, rótulos e tema de cada seção (navbar e linha de progresso)
public/
  brand/             logo em SVG (pinho e clara)
  models/            iPhone 3D otimizado (vias-iphone.glb)
referencias/         imagens de referência aprovadas (não publicadas)
docs/                plano e decisões por etapa
```

## Linha de Acesso

```tsx
<AccessLine
  width={1200} height={200}                 // viewBox
  segments={[{ d: "M30 140 C …", variant: "solid" }]}   // solid | dashed | dotted | fragmented
  nodes={[{ x: 30, y: 140, kind: "origin" }, { x: 1170, y: 50, kind: "access" }]}
  mode={{ type: "scrub" }}                  // scrub | enter | manual (progress 0..1)
  track head tone="light"
/>
```

Sem JS ou com `prefers-reduced-motion`, a linha aparece completa e com todos os nós acesos.

## Créditos

Modelo 3D "Iphone 14 Pro" por mister dude (Sketchfab), licenciado sob CC BY 4.0. Modificado (tela separada, material da tela, otimização para a web).
