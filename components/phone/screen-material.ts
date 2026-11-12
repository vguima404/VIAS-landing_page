import { gsap } from "gsap";
import { Color, DoubleSide, ShaderMaterial, type Texture } from "three";

import { colors } from "@/lib/tokens";

/**
 * Material da tela do iPhone.
 *
 * - Mostra a interface sem tone mapping (o Papel #F6F7F1 sai exato).
 * - Troca de tela: varredura diagonal de baixo para cima, com borda suave e
 *   um fio verde-rota na frente, como a Linha de Acesso passando e revelando
 *   a próxima etapa.
 * - Vidro: brilho sutil (fresnel + faixa) que desliza com a rotação.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform float uProgress;
  uniform vec3 uLine;
  uniform float uSheen;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 a = texture2D(uTexA, vUv).rgb;
    vec3 b = texture2D(uTexB, vUv).rgb;

    // Coordenada da varredura: 0 no canto inferior esquerdo, 1 no superior direito
    // (UV do glTF: v = 0 no topo). Diagonal suave, mais vertical que horizontal.
    vec2 q = vec2(vUv.x, 1.0 - vUv.y);
    float s = (q.x * 0.42 + q.y) / 1.42;

    float soft = 0.05;
    float p = uProgress * (1.0 + 2.0 * soft) - soft;
    float hidden = smoothstep(p - soft, p + soft, s);
    vec3 col = mix(b, a, hidden);

    // Fio da Linha de Acesso na frente da varredura
    float running = step(0.0005, uProgress) * step(uProgress, 0.9995);
    float line = (1.0 - smoothstep(0.002, 0.01, abs(s - p))) * running;
    col = mix(col, uLine, line * 0.95);

    // Vidro: fresnel discreto + faixa de reflexo que acompanha a rotação
    float facing = clamp(abs(dot(normalize(vNormal), normalize(vViewDir))), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float band = 1.0 - smoothstep(0.0, 0.22, abs(vUv.x * 0.8 + vUv.y * 0.6 - uSheen));
    col += vec3(1.0) * (band * 0.035 + fresnel * 0.06);

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export type ScreenMaterial = ShaderMaterial & {
  uniforms: {
    uTexA: { value: Texture | null };
    uTexB: { value: Texture | null };
    uProgress: { value: number };
    uLine: { value: Color };
    uSheen: { value: number };
  };
};

/**
 * Controla a tela de um palco: troca com varredura e brilho do vidro.
 * Concentra as mutações do material fora do ciclo de render do React.
 */
export class ScreenController {
  readonly material: ScreenMaterial;
  private current: Texture;
  private tween: gsap.core.Tween | null = null;

  constructor(
    initial: Texture,
    private readonly onChange: () => void,
  ) {
    this.material = createScreenMaterial(initial);
    this.current = initial;
  }

  /** Varredura da tela atual para `next` */
  transitionTo(next: Texture, duration: number, ease: string) {
    if (next === this.current) return;
    const u = this.material.uniforms;
    this.tween?.kill();
    // Interrompida no meio: parte do que já está mais visível
    if (u.uProgress.value > 0.5) u.uTexA.value = u.uTexB.value;
    u.uTexB.value = next;
    u.uProgress.value = 0;
    this.current = next;

    this.tween = gsap.to(u.uProgress, {
      value: 1,
      duration,
      ease,
      onUpdate: this.onChange,
      onComplete: () => {
        u.uTexA.value = next;
        u.uProgress.value = 0;
        this.onChange();
      },
    });
  }

  /** Faixa de reflexo acompanha a rotação lateral */
  setSheen(rotationY: number) {
    this.material.uniforms.uSheen.value = 0.7 - rotationY * 1.6;
  }

  dispose() {
    this.tween?.kill();
    this.material.dispose();
  }
}

export function createScreenMaterial(initial: Texture): ScreenMaterial {
  return new ShaderMaterial({
    name: "VIAS_Display_Runtime",
    uniforms: {
      uTexA: { value: initial },
      uTexB: { value: initial },
      uProgress: { value: 0 },
      uLine: { value: new Color(colors.rota) },
      uSheen: { value: 0.75 },
    },
    vertexShader,
    fragmentShader,
    toneMapped: false,
    // Como no material original da tela (doubleSided no .glb)
    side: DoubleSide,
  }) as ScreenMaterial;
}
