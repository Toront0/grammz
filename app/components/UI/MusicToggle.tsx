// components/MusicToggleButton.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MusicToggleButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  size?: number;
}

const WAVE_COUNT = 3;

export default function MusicToggleButton({
  isPlaying,
  onToggle,
  size = 32
}: MusicToggleButtonProps) {
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const paths = gsap.utils.toArray<SVGPathElement>(".wave-path");
    tweensRef.current.forEach((t) => t.kill());
    tweensRef.current = [];

    if (isPlaying) {
      paths.forEach((path, i) => {
        const proxy = { phase: i * 0.5 };
        const tween = gsap.to(proxy, {
          phase: `+=${Math.PI * 2}`,
          duration: 4 + i * 0.6,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            path.setAttribute("d", generateSinePath(proxy.phase, i));
          }
        });
        tweensRef.current.push(tween);
      });
    } else {
      paths.forEach((path) => {
        const tween = gsap.to(path, {
          attr: { d: "M0,50 L100,50" },
          duration: 0.5,
          ease: "power2.out"
        });
        tweensRef.current.push(tween);
      });
    }

    return () => {
      tweensRef.current.forEach((t) => t.kill());
      tweensRef.current = [];
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Turn off music" : "Turn on music"}
      style={{ width: size, height: size }}
      className="flex items-center cursor-pointer justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur transition hover:bg-black/70 active:scale-95 mix-blend-difference"
    >
      <svg
        width={size - 8}
        height={size - 8}
        viewBox="0 0 100 100"
        fill="#fff"
        className="overflow-visible"
      >
        {Array.from({ length: WAVE_COUNT }).map((_, i) => (
          <path
            key={i}
            className="wave-path"
            d="M0,50 L100,50"
            stroke="currentColor"
            strokeWidth={3 - i * 0.6}
            strokeLinecap="round"
            fill="none"
            opacity={1 - i * 0.3}
          />
        ))}
      </svg>
    </button>
  );
}

function generateSinePath(phase: number, layer: number): string {
  const width = 100;
  const mid = 50;
  const amplitude = 28 - layer * 7;
  const frequency = 1.5 + layer * 0.8;

  let d = `M0,${mid}`;
  for (let x = 0; x <= width; x += 1) {
    const y =
      mid + amplitude * Math.sin((x / width) * Math.PI * frequency + phase);
    d += ` L${x},${y}`;
  }
  return d;
}
