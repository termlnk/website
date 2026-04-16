import { useEffect, useRef } from 'react';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './shader';

export function GodrayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const glCtx = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!glCtx) return;
    const gl = glCtx;

    function createShader(source: string, type: number) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(VERTEX_SHADER, gl.VERTEX_SHADER));
    gl.attachShader(program, createShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pLoc = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    gl.uniform2f(uRes, w, h);
    gl.uniform3f(gl.getUniformLocation(program, 'u_color'), 1, 1, 1);
    gl.uniform1f(gl.getUniformLocation(program, 'u_intensity'), 0.25);
    gl.uniform1f(gl.getUniformLocation(program, 'u_rays'), 0.09);
    gl.uniform1f(gl.getUniformLocation(program, 'u_reach'), 0.2);
    gl.uniform1f(gl.getUniformLocation(program, 'u_dither'), 0);

    gl.viewport(0, 0, w, h);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const startTime = performance.now();
    let lastFrame = 0;
    let rafId: number;

    function render(now: number) {
      rafId = requestAnimationFrame(render);
      if (document.hidden) return;
      if (now - lastFrame < 33) return;
      lastFrame = now;
      gl.uniform1f(uTime, (now - startTime) * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    rafId = requestAnimationFrame(render);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        opacity: 0.24,
      }}
    />
  );
}
