# VIAS · Landing page — Etapa 0: análise e plano

> Documento de trabalho. Nenhum código foi escrito nesta etapa.

---

## 1. Inventário: o que existe e onde

O prompt descreve uma pasta `referencias/` que **ainda não existe**. Os arquivos estão espalhados; localizei todos, exceto dois itens de marca.

| Esperado pelo prompt | Encontrado | Situação |
|---|---|---|
| `landing/02…09-*.png` | `Ref_landing_page/section2…9_*.png` (8 arquivos, 1672×941) | OK, todos legíveis |
| `app/UI-01…04.png` | `Downloads/UI-0X-aprovada.png` | OK, mas **resolução baixa** (ver §3) |
| `marca/vias-logo-transparente.png` | raiz do projeto (1042×260, RGBA) | OK |
| `marca/vias-logo-clara.png` | — | **Falta** (resolvido pelo SVG com `currentColor`) |
| `marca/vias-logo.svg` | — | **Falta** (ver §6, decisão D5) |
| `3d/iphone-14-pro.glb` | `VIAS-Smartphone/web/VIAS_iPhone14Pro.glb` | OK, já preparado no Blender |

Também existe `Downloads/vias-logo.png` (1254², fundo papel, mesma logo) e `Downloads/Interface de Busca de Atendimento VIAS.png` (variante da UI-01, 852×1846).

**Na Etapa 1** copio (sem mover) esses arquivos para `referencias/` com os nomes do prompt. `referencias/` fica fora de `public/` e não é publicada.

---

## 2. Análise das referências, seção a seção

Composição geral: grid de 1440 px, texto à esquerda (≈ 45%) e visual à direita, fotografia sangrando até a borda com máscara orgânica (curvas e diagonais), fundo Papel com cartografia em linhas finas de Linha `#D5DED7`.

| Seção | O que reproduzir | O que corrigir |
|---|---|---|
| **02 Hero** | Título em 3 linhas, rótulo mono com traço, CTAs pílula, 3 destaques com divisores verticais. À direita, cidade aérea com rotas brilhantes, grande curva verde-pinho e folhagem desfocada nos cantos inferiores (primeiro plano, ótima camada de parallax). | Navbar ("Sobre o VIAS"…); "Baixar o app" → "Explorar demonstração →"; "unidade mais próxima" → "unidade adequada". |
| **03 O problema** | Foto em diagonal, protagonista com o celular; 4 pílulas de pergunta empilhadas sobre a foto; mini mapa com pin e linha que **some** (fragmentada). | Logo antiga; estetoscópio em "Qual serviço?" → ícone de busca/lista. |
| **04 Como funciona** | Numerais grandes 01/02/03 em cinza, linha que liga os três cartões, protagonista olhando para cima, curva verde-pinho na base. | "UBS Central", "1,2 km", "15 min" → "Unidade demonstrativa", "Mamógrafo cadastrado", "SUS"; 03 → "28 min · Ônibus + caminhada"; foto da fachada **mantida** (genérica, sem placa ou nome legível; decisão de 12/11); selo "Demonstração — dados ilustrativos". |
| **05 Acessibilidade** | Foto do homem na estação com máscara em onda; lista com ícones circulares e trilho vertical com nó lima; cartão flutuante; faixa verde-pinho com mapa e rota no canto. | Cartão mostra tudo "confirmado" → trocar pelos 4 estados da UI-04 (Não informado ×2, Parcial, Informado) com ícone + texto + cor; botão "Ver informações de acessibilidade →". |
| **06 Inteligência** | 4 placas de mapa empilhadas em perspectiva, ligadas pela linha lima vertical; cartões laterais ligados por fios com nó; mapa do território na base. | Cruz médica (01 Saúde) → prédio; cérebro (04) → ícone de rede/nós. |
| **07 Gestores** | Fundo verde-pinho com território em mapa coroplético isométrico, rede de rotas com nós, 3 painéis de vidro escuro, destaque com pin. | Pins com cruz → prédio; painéis sem números; legenda **mantida em vermelho/amarelo/verde**, como na imagem (decisão de 12/11). |
| **08 Confiança** | Foto quente (senhora em casa), cartão branco, anotações 01/02/03 à direita com fios finos e nós. **É a única referência com a linha de progresso no estilo pedido** (borda da navbar com ponto lima). | Números "01/02/03" em lima → verde-rota. |
| **09 CTA + footer** | Duas fotos sangrando nas laterais com centro Papel, nó central que se bifurca até os dois botões, footer verde-pinho com "VIAS" gigante cortado. | Logo antiga; incluir links e textos da spec. |

**Navbar:** cada imagem traz uma diferente. Sigo a da 02 (links centrais + botão contorno), com a borda inferior da 08 (linha com ponto lima) como linha de progresso.

**Seções escuras:** a referência da 09 tem o CTA **claro** e só o footer escuro. Decidido (12/11): navbar escura sobre a 07 e sobre o footer; no CTA, clara, fiel à imagem. Sobre fundo escuro, o trecho percorrido da linha de progresso fica em lima, como na imagem 07.

---

## 3. Telas do app (UI-01 a UI-04)

As 4 telas estão coerentes com as regras de conteúdo (selo de demonstração, CNES sem promessa de vaga, 3 estados de acessibilidade com texto). Pontos:

- **Resolução:** UI-01 tem 724×1568 e as demais 852×1846. A tela do modelo é 1179×2556 (nativa do 14 Pro). Funciona, mas fica levemente suave no Hero em telas retina. **Peço versões em 1179×2556 se existirem.**
- **Proporção:** 0,4615 nas imagens vs 0,4613 na tela do modelo. Encaixe direto, sem corte.
- **Dynamic Island:** as telas já trazem a ilha desenhada, na mesma posição (±2%) da ilha da textura atual do modelo. Ao trocar a textura, a ilha vem da própria tela. Sem duplicação.
- **Detalhes a corrigir na fonte:** UI-02 parece mostrar "Mamografia · SU**s**" (s minúsculo) e UI-03/04 têm um tique antes de "9:41".

---

## 4. Análise do iPhone 3D (.glb)

Arquivo: `VIAS-Smartphone/web/VIAS_iPhone14Pro.glb` (**16,9 MB**). Já tem o trabalho de Blender que eu pediria (script `etapa2_tela_vias.py`), então **nenhum ajuste no Blender é necessário por enquanto.**

```
Sketchfab_model → Collada visual scene group → Iphone (escala 13,67)
  └─ iPhone_14_Pro            (node)
       └─ mesh "iPhone_14_Pro_Malha", 2 primitivas
            ├─ prim 0 · material "iPhone_Corpo"  · 57.199 vértices · alphaMode BLEND
            └─ prim 1 · material "VIAS_Display"  ·  3.816 vértices · a TELA
```

- **Nome que importa:** o material **`VIAS_Display`**. No three.js a malha com 2 primitivas vira um grupo com 2 meshes; localizo a tela pelo nome do material, não do mesh.
- **UV da tela:** `TEXCOORD_1` ("UV_Screen"), 0..1 em pé. No three.js: `texture.channel = 1`, `flipY = false`, `colorSpace = SRGBColorSpace`. Proporção 15,91 × 34,53 = 0,4606, compatível com 1179×2556.
- **Orientação:** a tela aponta para −Z. Giro 180° em Y.
- **Problema conhecido:** `iPhone_Corpo` está em `BLEND`, então o three.js desenha sem depth write (lentes traseiras pretas). Corrijo em runtime (`depthWrite = true` / opaco). A frente não é afetada.
- **Peso (o maior problema):** 15,9 MB são texturas do atlas original em 4K: normal 8,0 MB (PNG), ORM 2,3 MB, base color 1,9 MB, emissive 0,75 MB. A geometria é leve (≈ 61 mil vértices).
- **Otimização proposta (faço eu, sem Blender):** `gltf-transform` sobre uma cópia, com texturas em 2048 px (normal pode ir a 1024), WebP, geometria com Meshopt, sem a textura de tela embutida (aplicada em runtime). Meta: **≤ 2,5 MB**, provavelmente ~1,5 MB. KTX2 exige o binário `toktx`; WebP já atende à spec com menos atrito.
- **Licença:** o modelo é **CC BY 4.0** ("Iphone 14 Pro" por mister dude, Sketchfab). **A atribuição é obrigatória** no site (decisão D4).
- **Poster:** já existem renders 2400×3600 transparentes (`renders/final/`), mas com a tela vazia. Gero os posters com UI-01 e UI-03 aplicando a tela na render por warp de perspectiva (a câmera tem só 3°). Se o resultado não ficar perfeito, peço uma render no Blender com o mesmo pipeline.

---

## 5. Solução do iPhone 3D: proposta

**Um único `<Canvas>` persistente, com `<View>` do drei, e o mesmo iPhone em dois "palcos".**

Considerei as três opções:

1. **Canvas único com o iPhone viajando do Hero até Como funciona.** Descartado: a seção 03 fica entre as duas, e o aparelho atravessaria a fotografia da protagonista (que já segura um celular real). Isso quebraria a cena mais emocional da narrativa.
2. **Um canvas por seção.** Dois contextos WebGL, modelo e texturas enviados duas vezes à GPU, mais memória no mobile.
3. **Canvas único + `View` (escolhida).** Um contexto WebGL, `position: fixed`, `pointer-events: none`, z-index abaixo da navbar. Cada seção tem um elemento "slot" no DOM e a `View` renderiza o iPhone exatamente ali, com scissor. O .glb é carregado uma vez (cache do `useGLTF`) e as texturas são compartilhadas.

**Continuidade narrativa:** no fim do Hero o aparelho sobe com parallax mais rápido e gira poucos graus (sai de cena). Em Como funciona, ele entra pelo mesmo eixo, já "de volta", e assume o papel de tela do método.

**Tela:** troco o material `VIAS_Display` por um `ShaderMaterial` próprio (`toneMapped: false`, para o Papel #F6F7F1 sair exato) com:
- `uTexA`, `uTexB`, `uProgress`: transição entre telas como uma **varredura suave ao longo de uma diagonal**, com borda em verde-rota, como se a Linha de Acesso passasse e revelasse a próxima etapa (≈ 700 ms, `expo.out`);
- reflexo de vidro sutil (gradiente que se desloca com a rotação), sem cromado.

**Hero, linha que entra no celular:** projeto os cantos da tela 3D para coordenadas de página a cada frame. O SVG da Linha de Acesso na cidade termina exatamente na borda do aparelho, e a continuação é desenhada **dentro da textura** (UI-01 composta num `CanvasTexture` com o traço animado sobre o mapa da tela). Visualmente: a mesma linha, sem emenda.

**Movimento:** câmera quase frontal; rotação Y ±6° e X ±3° ligada ao scroll (GSAP `scrub`) somada ao mouse no desktop (amortecido por `damp`). Iluminação: `Environment` com softboxes de estúdio (Lightformers, sem HDR externo), `ContactShadows` difusa.

**Performance e fallback:**
- `next/dynamic(..., { ssr: false })` + carregamento quando o Hero monta (é a primeira dobra) e preload para Como funciona.
- Poster `next/image` com prioridade no Hero; o 3D entra com crossfade quando a primeira frame estiver pronta, sem layout shift (o slot tem proporção fixa).
- `frameloop="demand"`, invalidando só quando há scroll, mouse ou animação; render pausado quando nenhum slot está visível (IntersectionObserver).
- DPR limitado (1,5 mobile / 2 desktop) e `PerformanceMonitor` reduz se cair FPS.
- **Poster permanente** quando há `prefers-reduced-motion`, falta de WebGL, `saveData` ou aparelho fraco (`deviceMemory ≤ 2` ou `hardwareConcurrency ≤ 4` no mobile). Em Como funciona, o poster troca de tela por crossfade de opacidade.

---

## 6. Decisões técnicas da stack

- **Next.js** (versão estável atual, App Router) + React 19 + TypeScript strict.
- **Tailwind CSS v4** com tokens em `@theme` (cores, fontes, raios, sombras) e espelho em `lib/tokens.ts` para o JS (cores no shader, easings no GSAP).
- **GSAP + ScrollTrigger + `@gsap/react` (`useGSAP`)**. Como o GSAP hoje é gratuito com todos os plugins, uso também **SplitText** (revelação por linhas com máscara) e **DrawSVGPlugin** (Linha de Acesso), sem dependência extra.
- **Lenis** sincronizado ao `gsap.ticker`; desligado em reduced motion. Âncoras da navbar via `lenis.scrollTo` com offset da navbar.
- **R3F + drei + three** apenas no chunk dinâmico do iPhone.
- **Sem outras dependências** (ícones e mapas em SVG próprios).

### Estrutura de pastas

```
app/
  layout.tsx            fontes (next/font), metadata/OG, skip link, providers
  page.tsx              Server Component: compõe as seções
  globals.css           Tailwind v4 + @theme (tokens) + utilitários base
  opengraph-image.png
components/
  providers/            SmoothScroll (Lenis+GSAP), MotionPreferences
  navbar/               Navbar, ProgressLine, MobileMenu
  access-line/          AccessLine (path + nós), NodeOrigin, NodeJunction, NodeAccess, useDrawOnScroll
  phone/                PhoneStage (Canvas+Views), PhoneModel, ScreenMaterial, PhonePoster, usePhoneSupport
  ui/                   Button, DemoBadge, AccessState, GlassPanel, Icon (set SVG linear)
  sections/
    hero/ problema/ como-funciona/ acessibilidade/ inteligencia/ gestores/ confianca/ cta-final/ footer/
      (cada uma: Section.tsx server + partes client só onde há animação)
lib/
  tokens.ts  motion.ts (easings, durações, registro dos plugins)  sections.ts (ids, rótulos, tema)
public/
  models/vias-iphone.glb
  screens/ui-01…04.webp
  images/<seção>/…  (AVIF/WebP gerados a partir dos PNGs que você enviar)
  posters/
referencias/            (cópias de trabalho, não publicadas)
docs/
```

`lib/sections.ts` é a fonte única para navbar, nós da linha de progresso, tooltips e tema claro/escuro de cada seção.

### Contraste da paleta (calculado)

| Par | Razão | Uso |
|---|---|---|
| Verde-rota sobre Papel | 4,68 | OK texto normal (AA) |
| Sálvia-escuro sobre Papel / Névoa | 5,10 / 4,70 | OK |
| Parcial / Informado / Azul sobre Branco | 5,04 / 6,29 / 5,42 | OK |
| Lima sobre Verde-pinho | 9,94 | OK |
| Lima sobre Papel | 1,15 | **Proibido para texto** (só pontos e nós) |
| Sálvia-escuro sobre Verde-pinho | 2,25 | **Falha.** Texto secundário em seções escuras usa Papel a ~75% |
| Verde-rota sobre Verde-pinho | 2,45 | Só linhas decorativas, nunca texto |

---

## 7. Plano de motion por seção (resumo)

| Seção | Momento-chave | Pin? |
|---|---|---|
| 02 Hero | Entrada: título por linhas (SplitText), linha se desenha da cidade até o celular e continua na tela; parallax: céu < cidade < folhagem; mouse move o iPhone. | Não |
| 03 Problema | Foto revela por máscara diagonal + zoom-out; as 4 perguntas surgem uma a uma; a linha do mini mapa se desenha **com lacunas** e para no meio. | Não |
| 04 Como funciona | Sticky curto (~2 telas): etapas 01→02→03 acendem, os fragmentos da 03 se unem nos 3 nós, e o iPhone troca UI-01→02→03. | Sim, curto |
| 05 Acessibilidade | Itens do cartão entram com o estado (ícone, texto, cor) em sequência; a rota no canto ganha trechos contínuos e tracejados. | Não |
| 06 Inteligência | As 4 placas (imagens em perspectiva, nas posições exatas da referência) começam separadas e se alinham com o scroll; a linha vertical atravessa e acende os nós de cada cartão. | Sim, curto |
| 07 Gestores | Navbar escurece; território com parallax lento; rede de rotas se desenha; painéis entram em sequência. | Não |
| 08 Confiança | Os 3 fios das anotações se desenham um a um até os itens do cartão. | Não |
| 09 CTA | Linha nasce no nó central e se bifurca até os dois botões; fotos laterais com parallax; footer com "VIAS" gigante subindo levemente. | Não |

Linha de progresso: um nó por seção (02–09) e portal no fim. Escala da 07 (Alta/Média/Baixa) em vermelho/amarelo/verde, como na referência, sempre com o texto ao lado.

---

## 8. Ativos de que preciso (por seção)

**Regras para todas as imagens**
- PNG sRGB (eu converto para AVIF/WebP). Sem texto, sem logo, sem pins, sem rotas e sem interface: **tudo isso eu desenho em SVG/HTML.**
- **Camadas de uma mesma seção no mesmo canvas e alinhadas** (se sobrepostas, recompõem a cena).
- **Fundo com "clean plate":** a área atrás da pessoa preenchida (sem buraco), porque o parallax revela essa área.
- Recortes com alpha limpo, inclusive cabelo.
- **Enquadramento idêntico ao da referência**, em 2× (3344×1882), com ~10% de sobra além dessa área em todas as bordas (o parallax desloca as camadas; a sobra nunca muda o enquadramento visível).
- Sujeito numa área segura central, para o recorte vertical do mobile funcionar.
- Mesma protagonista (rosto, cabelo, roupa) em 03, 04 e 09.

| # | Seção | Arquivo(s) | Formato / tamanho |
|---|---|---|---|
| A1–A4 | 02 Hero | **Recebido (12/11):** fundo completo (cidade, rotas, pins, disco e chão) em 1672×941, no mesmo quadro da referência → `public/images/hero/02-hero-fundo.webp` (versão 2× em 3344×1882 recebida). Uma versão em 2× (3344×1882) deixaria o fundo mais nítido em telas retina. | — |
| B1 | 03 Problema | **Fundo completo da seção, como o do Hero:** a fotografia da protagonista no ponto com o recorte diagonal e o mapa claro de ruas no canto inferior esquerdo, exatamente no quadro da referência 03. **Sem** título, parágrafo, as 4 pílulas de pergunta, a rota (cinza e lima) e o pin (eu desenho e animo), e sem logo/navbar. | PNG/WebP, 3344×1882 (2×) ou 1672×941 |
| B2 | 03 Problema | Opcional, para parallax: a protagonista recortada (com bolsa e celular), no mesmo quadro, com transparência **real** (não o xadrez desenhado) | PNG com alpha, mesmo tamanho do B1 |
| C1 | 04 Como funciona | **Recebido em 12/11:** fundo completo da seção (protagonista, mapa claro e formas verde-pinho), 1672×941, usado pixel a pixel. Arquivo: `public/images/como-funciona/04-como-fundo.webp`. | ✓ |
| C2 | 04 Como funciona | Opcional, para parallax: protagonista recortada, no mesmo quadro | PNG com alpha, mesmo tamanho do C1 |
| C3 | 04 Como funciona | **Recebido em 12/11.** Recorte vertical da fachada (portão e entrada) com a placa removida, para não contradizer "UBS Central". Arquivo: `public/images/como-funciona/04-unidade-fachada.webp`. | ✓ |
| D1 | 05 Acessibilidade | **Recebido em 12/11:** fundo completo da seção (homem na estação, área clara e faixas verde-pinho com mapa), 1672×941, usado pixel a pixel. Arquivo: `public/images/acessibilidade/05-acessibilidade-fundo.webp`. A onda verde sobe mais que na referência (último item da lista ganhou halo claro) e o joelho cobre o início da rota (rota começa em x 1432). | ✓ |
| D2 | 05 Acessibilidade | Opcional, para parallax: homem em cadeira de rodas recortado, no mesmo quadro do D1 | PNG com alpha, 1672×941 |
| E1–E4 | 06 Inteligência | **Substituído em 12/11 pelo vídeo fornecido** (camadas se erguendo sobre o mapa): `public/videos/06-camadas.mp4`, versão 1080p (reenviada em 12/11), acelerada 1,5× (5,3 s, 127 quadros, todos quadros-chave, sem áudio, 10 MB) e comandado pelo scroll durante o momento sticky. Último quadro em `public/images/inteligencia/06-camadas-final.webp` (sem JS, mobile e movimento reduzido). Alinhado à referência em escala 1,328, canto (−22; 4,6)u. | ✓ |
| E5 | 06 Inteligência | Não é mais necessário: o mapa do território está no vídeo. | — |
| F1 | 07 Gestores | Fundo aéreo escuro (verde-pinho dessaturado) | PNG, 3344×1882 + sobra (ver regras) |
| F2 | 07 Gestores | Território coroplético **em perspectiva, como na referência**, sem pins, rotas nem painéis (eu desenho por cima, alinhado à imagem) | PNG com alpha, 3344×1882, mesmo canvas da F1 |
| F3 | 07 Gestores | **Guia (não publicado):** o mesmo território **com** rotas e pins, para eu alinhar o SVG | PNG, mesmo canvas |
| G1 | 08 Confiança | Fundo: sala com janela e plantas, sem a pessoa | PNG, 3344×1882 + sobra (ver regras) |
| G2 | 08 Confiança | Senhora recortada com o celular | PNG com alpha, mesmo canvas |
| G3 | 08 Confiança | Primeiro plano: mesa, caneca, bolsa, óculos | PNG com alpha, mesmo canvas |
| H1 | 09 CTA | Protagonista caminhando: fundo de rua + recorte | 2 PNGs, 1800×2400 (retrato) |
| H2 | 09 CTA | Gestor no laptop: fundo de escritório + recorte | 2 PNGs, 1800×2400 (retrato) |
| U1 | App | UI-01…04 em **1179×2556** (se houver) e UI-02 com "SUS" corrigido | PNG |

Sobre o Hero: você tem o projeto Unreal `VIAS-City` e os takes renderizados. Se a cidade da A1 vier de lá, as camadas (céu, cidade, folhagem) saem por render passes com a mesma câmera, e a cidade fica coerente com o vídeo.

**Enquanto as imagens não chegam**, cada slot usa um placeholder neutro identificado ("FOTO — 03 protagonista no ponto"). O layout e as animações são construídos com as proporções finais.

---

## 8.1 Regra de fidelidade (definida em 12/11)

Cada seção tem de ser **visualmente igual à sua imagem de referência**: mesma composição, posições, tamanhos, enquadramento das fotos, cores e espaçamentos. O layout não é reinterpretado nem reorganizado; as animações entram por cima do resultado estático.

- Só entram, sem perguntar, as correções que o prompt manda (logo oficial, navbar única da §6, dados demonstrativos, ícones lineares, texto em HTML), sempre no mesmo lugar e tamanho do elemento que substituem.
- Qualquer outro afastamento, mesmo por motivo técnico, é perguntado antes.
- **Verificação a cada etapa:** cada seção é medida na imagem de referência (1672×941) e conferida com captura de tela no mesmo tamanho, lado a lado e em sobreposição, antes da entrega.
- **Mobile:** as referências são só de desktop. A versão mobile de cada seção é uma adaptação e será apresentada para aprovação.
- **iPhone do Hero:** tamanho, ângulo e posição serão os da imagem 02; os posters serão gerados de novo nessa pose.

## 9. Decisões que preciso de você

- **D1 · "Explorar demonstração →"** (navbar, Hero, CTA): para onde leva? Não existe demo no projeto. URL externa (protótipo/app) ou âncora provisória?
- **D2 · "Conhecer o painel para gestores →"**: âncora para a seção 07 ou URL externa?
- **D3 · Footer "Privacidade" e "Contato"**: destinos? Sugestão: Privacidade → seção 08 (`#confianca`) até existir uma página; Contato → `mailto:` com o e-mail que você indicar.
- **D4 · Crédito CC BY 4.0 do modelo 3D**: sugiro uma linha discreta no footer: *Modelo 3D "Iphone 14 Pro" por mister dude (Sketchfab), CC BY 4.0. Modificado.*
- **D5 · Logo SVG**: você tem o vetor original? Se não, vetorizo a partir do PNG transparente (traçado + limpeza manual dos nós) e mostro para aprovação na Etapa 1.
- **D6 · Pasta `referencias/`**: confirma que copio os arquivos encontrados para ela com os nomes do prompt?

---

## 10. Próximo passo

Com o OK, a **Etapa 1** cria o projeto Next.js na raiz desta pasta (mantendo `Ref_landing_page/` e a logo), os tokens, as fontes, Lenis + GSAP, o layout base com skip link e o componente `AccessLine` reutilizável (origem, conexão, acesso; desenho no scroll; estado estático em reduced motion). Também copio as referências (D6) e otimizo o .glb, para a Etapa 3 já começar com o arquivo leve.
