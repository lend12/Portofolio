import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; radius: number; phase: number; speed: number; alpha: number };

export default function BlinkingDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let dots: Dot[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = Math.max(32, Math.min(52, Math.min(width, height) / 19));
      dots = [];
      for (let y = spacing / 2; y < height + spacing; y += spacing) {
        for (let x = spacing / 2; x < width + spacing; x += spacing) {
          if (Math.random() > 0.32) {
            dots.push({
              x: x + (Math.random() - 0.5) * spacing * 0.35,
              y: y + (Math.random() - 0.5) * spacing * 0.35,
              radius: 0.5 + Math.random() * 1.15,
              phase: Math.random() * Math.PI * 2,
              speed: 0.45 + Math.random() * 1.1,
              alpha: 0.25 + Math.random() * 0.55,
            });
          }
        }
      }
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const seconds = time / 1000;
      for (const dot of dots) {
        const pulse = 0.65 + Math.sin(seconds * dot.speed + dot.phase) * 0.35;
        context.beginPath();
        context.fillStyle = `rgba(210, 220, 235, ${dot.alpha * pulse})`;
        context.arc(dot.x, dot.y + ((seconds * 1.5 + dot.phase) % 18), dot.radius * pulse, 0, Math.PI * 2);
        context.fill();
      }
      frameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="blinking-dots-bg" />;
}
