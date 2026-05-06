import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardStackOverlayProps {
  page1: React.ReactNode;
  page2: React.ReactNode;
}

export const CardStackOverlay: React.FC<CardStackOverlayProps> = ({ page1, page2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!page1Ref.current || !page2Ref.current) return;

    const ctx = gsap.context(() => {
      // 1. Pin Page 1 and scale it down as the user scrolls
      // Using pinSpacing: false allows Page 2 to naturally scroll up and overlap it.
      gsap.to(page1Ref.current, {
        scale: 0.92,
        opacity: 0.6,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: page1Ref.current,
          start: 'top top',
          end: 'bottom top', // Animates while Page 1's height is scrolled
          scrub: true,
          pin: true,
          pinSpacing: false, // This is the magic for native stack overlapping
        }
      });

      // 2. Animate Page 2's border-radius as it scrolls up over Page 1
      gsap.fromTo(page2Ref.current, {
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
      }, {
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        ease: 'none',
        scrollTrigger: {
          trigger: page2Ref.current,
          start: 'top bottom', // Starts when Page 2 enters from bottom
          end: 'top top',      // Ends when Page 2 fully covers the top
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Page 1 (Bottom Layer - Sticky via GSAP) */}
      <div 
        ref={page1Ref} 
        className="w-full h-screen will-change-transform bg-[#050102]"
      >
        {page1}
      </div>

      {/* Page 2 (Overlaying Layer - Scrolls Naturally) */}
      <div 
        ref={page2Ref} 
        className="relative z-10 w-full bg-[#050102] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] will-change-transform"
      >
        {page2}
      </div>
    </div>
  );
};
