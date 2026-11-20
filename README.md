<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/brand/vias-logo-clara.svg" />
  <img src="public/brand/vias-logo.svg" alt="VIAS" width="220" />
</picture>

### Via Inteligente de Acesso à Saúde

**Saúde não é só encontrar. É conseguir chegar.**

Landing page imersiva do VIAS e painel de demonstração para gestores públicos de saúde.

[**Ver o site**](https://vias-viainteligentedeacessoasaude.vercel.app/) ·
[**Explorar a demonstração**](https://vias-jet.vercel.app) ·
[**Assistir ao pitch**](https://youtu.be/YSqMlLNoc98)

<br />

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=flat-square&logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)

<br />

<img src="docs/images/landing-hero.webp" alt="Primeira dobra da landing page do VIAS: o título 'Saúde não é só encontrar. É conseguir chegar.' ao lado de um iPhone com a busca de atendimento, sobre uma cidade com rotas verdes iluminadas." width="100%" />

</div>

---

## Sobre o VIAS

Encontrar uma unidade de saúde não basta: é preciso conseguir chegar até ela. O **VIAS** conecta os dois lados
do mesmo caminho:

- **Para cidadãos:** diga o que você precisa (um exame, um serviço, uma especialidade) e o VIAS mostra onde ser
  atendido e a melhor forma de chegar lá, do seu jeito, com informações de acessibilidade no percurso.
- **Para gestores públicos:** um painel que mostra onde o acesso à saúde é mais difícil, a partir dos dados do
  CNES/DATASUS, sem dados pessoais.

## O que tem aqui

| Página | O que é |
| --- | --- |
| [`/`](https://vias-viainteligentedeacessoasaude.vercel.app/) | Landing page em nove seções: Hero, O problema, Como funciona, Acessibilidade, Inteligência e integração, Para gestores, Confiança e privacidade, CTA final e footer |
| `/painel` | Painel do gestor, visão geral: indicadores, unidades por tipo, atendimento SUS e acessibilidade física |
| `/painel/servicos-e-bairros` | Quantas unidades oferecem cada serviço (com busca e ordenação), serviços com menor oferta e bairros com mais unidades |

> [!NOTE]
> Os números do painel são **simulados para demonstração** (`lib/painel-data.ts`), e a página avisa isso em destaque.

## Destaques

- 🧭 **Linha de Acesso:** a linha com nós que atravessa a página se desenha conforme o scroll, ligando necessidade,
  unidade e percurso.
- 📱 **iPhone 3D:** um único canvas WebGL desenha o aparelho em cada seção, trocando as telas do app; sem WebGL ou
  em aparelhos modestos, entra um poster renderizado da própria cena.
- 🎬 **Movimento com propósito:** GSAP (ScrollTrigger, SplitText, DrawSVG, Flip) e scroll suave com Lenis.
  Com `prefers-reduced-motion`, tudo aparece no estado final.
- 📊 **Painel animado:** números que contam, barras e roscas que se desenham, lista que se reordena deslizando.

- ♿ **Acessível:** link para pular ao conteúdo, foco visível, textos alternativos e estados de acessibilidade
  sempre com ícone, texto e cor.

## Tecnologias

| | |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript |
| Estilo | [Tailwind CSS 4](https://tailwindcss.com), com os tokens da marca em `app/globals.css` |
| Animação | [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) |
| 3D | [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + drei |

## Como rodar

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Estrutura

```
app/
  (landing)/         landing page (com navbar e o canvas do iPhone)
  painel/            Painel do gestor: visão geral e serviços e bairros
  globals.css        tokens da marca e utilitários (u-*, fx-*, hx-*)
components/
  access-line/       Linha de Acesso: linha + nós (origem, conexão, acesso), desenho no scroll
  brand/             logo (SVG com currentColor)
  navbar/, footer/   navegação com linha de progresso e rodapé
  phone/             iPhone 3D (canvas único, palcos, telas e posters)
  sections/          uma pasta por seção da landing
  painel/            barra lateral, cartões, gráficos e animações do painel
lib/
  site.ts            destinos dos links (demonstração, vídeo, painel…)
  painel-data.ts     dados simulados do painel
  tokens.ts, gsap.ts cores, easings e registro dos plugins GSAP
public/              logo, imagens, modelo 3D, telas e posters
referencias/         imagens de referência aprovadas (landing e painel)
docs/                plano, decisões e imagens deste README
```

## Fidelidade às referências

As telas reproduzem as imagens de `referencias/` (1672×941). No desktop (≥ 1280 px) as medidas usam a unidade de
referência `1u` = 1 px da imagem, escalada para que o quadro inteiro caiba na tela (`min(largura/1672, altura/941)`),
como a imagem vista em tela cheia. Os utilitários `u-*` aplicam essa unidade (ex.: `xl:u-left-103`). Em telas mais
largas que 16:9, `fx-*` medem a partir do quadro encostado à direita e `hx-*` a partir do quadro centralizado.

Para conferir em desenvolvimento:

- `http://localhost:3000/?ref` sobrepõe a referência a cada seção já construída (`?ref=70` = 70% de opacidade);
- tecla **R** liga/desliga e tecla **D** alterna o modo diferença (o que coincide fica preto);
- `window.__phoneStore.debugPose` / `debugCamera` ajustam a pose do iPhone ao vivo.

<details>
<summary><strong>Linha de Acesso: uso do componente</strong></summary>

```tsx
<AccessLine
  width={1200} height={200}                                // viewBox
  segments={[{ d: "M30 140 C …", variant: "solid" }]}      // solid | dashed | dotted | fragmented
  nodes={[{ x: 30, y: 140, kind: "origin" }, { x: 1170, y: 50, kind: "access" }]}
  mode={{ type: "scrub" }}                                 // scrub | enter | manual (progress 0..1)
  track head tone="light"
/>
```

Sem JS ou com `prefers-reduced-motion`, a linha aparece completa e com todos os nós acesos.

</details>

<details>
<summary><strong>iPhone 3D: como funciona</strong></summary>

Um único canvas WebGL fixo (`PhoneCanvasMount`, no layout da landing) desenha o iPhone em cada palco via `<View>` do drei:

```tsx
<PhoneSlot screen="ui-01" priority />                            // Hero (primeira dobra)
<PhoneSlot screen={tela} posterScreens={["ui-01", "ui-02", "ui-03"]} />
```

- Sempre mostra o poster (`public/posters/`, renderizado da própria cena 3D); o 3D entra por cima com crossfade.
- Sem WebGL2, com `prefers-reduced-motion`, economia de dados ou aparelho fraco: fica só o poster.
- Telas (`public/screens/`) e posters são indexados por `ui-01` a `ui-04` e `ui-03-previa` em
  `components/phone/phone-config.ts`.
- Cada palco tem câmera, pose e margem de desenho (`bleed`) próprias.
- three.js, R3F e drei ficam num chunk separado, carregado sob demanda.

</details>

## Créditos

- Modelo 3D "Iphone 14 Pro" por mister dude ([Sketchfab](https://sketchfab.com)), licenciado sob
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Modificado (tela separada, material da tela,
  otimização para a web).
- Dados de referência: CNES / DATASUS, Ministério da Saúde.
