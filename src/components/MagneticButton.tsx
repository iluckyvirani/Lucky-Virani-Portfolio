/**
 * React port of "Magnetic Button" from ITomPoland/ui-components (MIT License,
 * Copyright (c) Tomasz Szmajda) - https://github.com/ITomPoland/ui-components
 */
import { useRef, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  download?: boolean;
  external?: boolean;
};

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function MagneticButton({ children, href, onClick, variant = 'primary', download, external }: Props) {
  const root = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const circle = useRef<HTMLSpanElement>(null);
  const magnet = 0.4;
  const textStrength = 0.18;

  const enter = (e: MouseEvent) => {
    if (reduced() || !root.current || !circle.current) return;
    const r = root.current.getBoundingClientRect();
    circle.current.style.left = `${e.clientX - r.left}px`;
    circle.current.style.top = `${e.clientY - r.top}px`;
    gsap.to(circle.current, { width: r.width * 2.5, height: r.width * 2.5, duration: 0.5, ease: 'power2.out' });
  };
  const move = (e: MouseEvent) => {
    if (reduced() || !root.current) return;
    const r = root.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(root.current, { x: x * magnet, y: y * magnet, duration: 1, ease: 'power3.out' });
    gsap.to(text.current, { x: x * textStrength, y: y * textStrength, duration: 1, ease: 'power3.out' });
  };
  const leave = (e: MouseEvent) => {
    if (reduced() || !root.current) return;
    gsap.to([root.current, text.current], { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    const r = root.current.getBoundingClientRect();
    gsap.to(circle.current, {
      width: 0,
      height: 0,
      left: `${e.clientX - r.left}px`,
      top: `${e.clientY - r.top}px`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const cls =
    'relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-ink px-7 py-3 text-sm font-semibold shadow-[3px_4px_0_#26231f] will-change-transform transition-colors ' +
    (variant === 'primary' ? 'bg-ink text-[#fffdf7] hover:text-ink' : 'bg-[#fffdf7] text-ink');
  const inner = (
    <>
      <span
        ref={circle}
        className={`pointer-events-none absolute h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          variant === 'primary' ? 'bg-marker' : 'bg-marker'
        }`}
      />
      <span ref={text} className="pointer-events-none relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
  const handlers = { onMouseEnter: enter, onMouseMove: move, onMouseLeave: leave };

  return href ? (
    <a
      ref={root}
      href={href}
      className={cls}
      download={download}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...handlers}
    >
      {inner}
    </a>
  ) : (
    <button ref={root} type="button" onClick={onClick} className={cls} {...handlers}>
      {inner}
    </button>
  );
}
