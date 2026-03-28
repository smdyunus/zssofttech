'use client';

import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = () =>
      window.matchMedia('(hover: none)').matches;

    if (isTouchDevice()) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const onMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-expand');
      }
    };
    const onMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-expand');
      }
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      curX = lerp(curX, mouseX, 0.12);
      curY = lerp(curY, mouseY, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${curX}px`;
        cursorRef.current.style.top = `${curY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    const attachLinkListeners = () => {
      const interactable = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label'
      );
      interactable.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    attachLinkListeners();
    raf = requestAnimationFrame(animate);

    // Re-attach on DOM mutations (SPA navigation)
    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring - follows with lag */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/60 transition-[width,height,border-color] duration-200 ease-out hidden lg:block cursor-ring"
        style={{ left: -40, top: -40 }}
      />
      {/* Inner dot - follows exactly */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary hidden lg:block"
        style={{ left: -40, top: -40 }}
      />
      <style jsx global>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
        .cursor-ring.cursor-expand {
          width: 52px;
          height: 52px;
          border-color: rgba(59, 130, 246, 0.9);
          background: rgba(59, 130, 246, 0.08);
          mix-blend-mode: difference;
        }
      `}</style>
    </>
  );
}
