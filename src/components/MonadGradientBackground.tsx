import { useEffect, useRef } from "react";

/**
 * Dependency-free WebGL gradient background tuned to the brand reference:
 * a domain-warped field forms organic curved bands; indigo-blue fills the body,
 * a warm spectral rim (magenta → rose → orange → gold) lights the right side,
 * valleys fall to black, with heavy film grain over everything.
 */
const FRAG = `precision highp float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0,0.0)), c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.55;
  for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.0 + vec2(1.7,9.2); a *= 0.5; }
  return s;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p  = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;   // centred, aspect-correct
  float t = uTime * 0.04;

  // domain-warped height field -> big organic lobes / curved bands
  vec2 q = p * 1.35;
  q += 0.85 * vec2(fbm(p*1.1 + vec2(0.0, t)), fbm(p*1.1 + vec2(3.1, -t*0.8)));
  float raw = fbm(q * 1.05 + vec2(t*0.3, 0.0));
  // stretch the compressed fbm range so valleys hit 0 (black) and ridges hit 1 (warm)
  float h = smoothstep(0.30, 0.74, raw);

  // warm appears on the RIGHT side of the bright body (spectral sweep), with
  // a bit of field noise so the boundary is organic
  float side = smoothstep(-0.32, 0.30, p.x*1.25 + 0.30*(raw - 0.5));

  // palette
  vec3 cBlack  = vec3(0.0);
  vec3 cIndigo = vec3(0.14, 0.10, 0.52);   // deep indigo
  vec3 cBlue   = vec3(0.30, 0.24, 0.93);   // #4d3ae6 vivid
  vec3 cMag    = vec3(0.62, 0.25, 0.80);   // magenta
  vec3 cPink   = vec3(0.88, 0.30, 0.45);   // rose
  vec3 cOrange = vec3(0.93, 0.62, 0.30);   // orange
  vec3 cGold   = vec3(0.97, 0.80, 0.45);   // gold

  // body: black -> indigo -> blue with height
  vec3 col = mix(cBlack, cIndigo, smoothstep(0.00, 0.22, h));
  col = mix(col, cBlue, smoothstep(0.18, 0.58, h));

  // warm spectral sweep over the lit (right) part of the bright body
  float warm = smoothstep(0.22, 0.78, h) * side;
  col = mix(col, cMag,    smoothstep(0.04, 0.34, warm));
  col = mix(col, cPink,   smoothstep(0.26, 0.52, warm));
  col = mix(col, cOrange, smoothstep(0.48, 0.74, warm));
  col = mix(col, cGold,   smoothstep(0.74, 0.96, warm));
  col += cGold * smoothstep(0.85, 1.0, warm) * 0.25;   // glow on the hottest peaks

  // crush the lowest valleys to black
  col *= 0.12 + 0.88 * smoothstep(0.0, 0.14, h);

  // heavy monochrome grain
  float g = hash(uv * uRes * 0.7 + t * 60.0) - 0.5;
  col += g * 0.12;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}`;

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

function MonadGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("[shader]", gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const t0 = performance.now();
    const loop = () => {
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      // don't loseContext(): getContext() returns the same context for this
      // canvas, so a StrictMode remount would otherwise inherit a dead one.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -20, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

export default MonadGradientBackground;
