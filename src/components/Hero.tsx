import { useEffect, useRef } from 'react'
import { ParticleCanvas } from '../3d/ParticleCanvas'

export const Hero = ({ appReady }: { appReady: boolean }) => {
  const photoRef = useRef<HTMLImageElement>(null)

  // Intersection observer logic is now centralized in App.tsx for better reliability and simpler code.
  // The Hero component only provides the classes (reveal, reveal-trigger) to be observed.

  // The photoRef scroll effect is now handled by a separate useEffect to keep it distinct
  // from the IntersectionObserver logic, as the original instruction removed the global scroll listener.
  useEffect(() => {
    const onScroll = () => {
      if (photoRef.current) {
        photoRef.current.style.transform = `scale(1.04) translateY(${window.scrollY * .08}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const startAnim = appReady

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center">
      <ParticleCanvas />
      <div className="hero-overlay absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_50%,rgba(107,26,42,.18)_0%,transparent_65%),linear-gradient(to_right,rgba(8,3,5,.92)_0%,rgba(8,3,5,.7)_45%,rgba(8,3,5,.2)_100%)]"></div>

      {/* Photo panel */}
      <div className="hero-photo-wrap absolute right-0 top-0 bottom-0 w-[48%][z-3] overflow-hidden max-md:w-full max-md:right-0">
        <div className="absolute left-0 top-0 bottom-0 w-[40%] z-[1] bg-gradient-to-r from-[#0E0608] to-transparent max-md:w-full max-md:bg-gradient-to-b max-md:from-[#0E0608] max-md:via-transparent max-md:to-[#0E0608]"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(8,3,5,.4)] via-transparent to-[rgba(8,3,5,.6)]"></div>

        <img
          ref={photoRef}
          src="/photo.jpg"
          alt="Sriram — Developer"
          className="hero-photo-anim reveal-trigger w-full h-full object-cover object-top contrast-[1.05]"
          id="hero-img"
        />
        <div className="photo-accent absolute left-[-1px] top-[20%] bottom-[20%] w-[2px] bg-gradient-to-b from-transparent via-[#6B1A2A] via-[#C4526A] via-[#6B1A2A] to-transparent z-[4]"></div>
      </div>

      <div className="hero-corner-tl reveal-trigger absolute top-10 left-10 w-10 h-10 border-t border-l border-[#6B1A2A]/50 z-10" style={{ transitionDelay: '1.2s' }}></div>
      <div className="hero-corner-br reveal-trigger absolute bottom-10 right-10 w-10 h-10 border-b border-r border-[#6B1A2A]/50 z-10" style={{ transitionDelay: '1.2s' }}></div>

      <div className="hero-content relative z-[10] px-16 max-w-[700px] max-md:px-6 max-md:max-w-full">
        <div className="hero-eyebrow-anim reveal-trigger flex items-center gap-[14px] mb-6" style={{ transitionDelay: '0.2s' }}>
          <div className="eyebrow-line w-8 h-[1px] bg-[#6B1A2A]"></div>
          <span className="eyebrow-text font-mono text-[10px] tracking-[.5em] uppercase text-[#C4526A]">
            Frontend Developer · Open to Work
          </span>
        </div>

        <div className="hero-greeting-anim reveal-trigger font-body font-extralight italic text-[clamp(18px,2vw,24px)] text-[#F8F4F0]/45 mb-[6px]" style={{ transitionDelay: '0.4s' }}>
          Hello, I'm
        </div>

        <div className="hero-name-anim reveal-trigger font-display font-black text-[clamp(68px,10vw,140px)] leading-[0.85] tracking-[-.03em] text-white relative" style={{ transitionDelay: '0.5s' }}>
          <span className="name-outline block text-transparent [-webkit-text-stroke:1px_rgba(248,244,240,0.2)] leading-[0.88]">SRIRAM</span>
          <span className="name-filled block text-white">SRI<span className="name-wine-accent text-[#6B1A2A] italic">RAM</span></span>
        </div>

        <div className="hero-title-line-anim reveal-trigger h-[2px] my-5 bg-gradient-to-r from-[#6B1A2A] via-[#C4526A] to-transparent" style={{ transitionDelay: '0.9s' }}></div>

        <p className="hero-sub-anim reveal-trigger text-[clamp(14px,1.4vw,17px)] leading-[1.85] text-[#F8F4F0]/50 font-light max-w-[460px]" style={{ transitionDelay: '1s' }}>
          Building <strong className="text-[#D4C5BA] font-normal">clean, responsive</strong> digital experiences with <span className="text-[#C4526A] font-normal">Angular</span> & modern tools. Growing toward <strong>Full-Stack</strong> and <span className="text-[#C4526A] font-normal">AI-integrated</span> development.
        </p>

        <div className="hero-actions-anim reveal-trigger flex items-center gap-6 mt-9 flex-wrap" style={{ transitionDelay: '1.1s' }}>
          <a href="#" className="btn-wine relative inline-flex items-center gap-3 px-10 py-4 bg-[#6B1A2A] border border-transparent font-mono text-[11px] tracking-[.3em] uppercase transition-all duration-500 overflow-hidden group">
            <span className="relative z-10">Get Resume</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B2035] to-[#C4526A] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
          </a>
          <a href="#contact" className="btn-ghost-wine font-mono text-[11px] tracking-[.3em] uppercase text-[#9A8880] relative pb-[3px] transition-colors duration-300 hover:text-[#C4526A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4526A] after:transition-[width] after:duration-400 after:ease-in-out hover:after:w-full">
            Contact Me →
          </a>
        </div>
      </div>

      <div className="hero-scroll-anim reveal-trigger absolute bottom-9 left-16 z-10 flex items-center gap-4 max-md:left-6" style={{ transitionDelay: '1.4s' }}>
        <div className="scroll-line w-[60px] h-[1px] bg-gradient-to-r from-[#6B1A2A] to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C4526A] to-transparent animate-[scanLine_2s_ease-in-out_infinite]"></div>
        </div>
        <span className="scroll-txt font-mono text-[9px] tracking-[.4em] uppercase text-[#9A8880]">Scroll to explore</span>
      </div>

      <div className="hero-stats-anim reveal-trigger absolute bottom-[60px] right-16 z-10 flex gap-10 max-md:right-6 max-md:gap-5 max-md:bottom-20" style={{ transitionDelay: '1.3s' }}>
        <div className="hs-item text-center">
          <div className="hs-num font-display font-black text-4xl leading-none text-white">1<em className="text-[#6B1A2A] not-italic">+</em></div>
          <div className="hs-lbl font-mono text-[9px] tracking-[.3em] uppercase text-[#9A8880] mt-[5px]">Year Exp.</div>
        </div>
        <div className="hs-item text-center">
          <div className="hs-num font-display font-black text-4xl leading-none text-white">4<em className="text-[#6B1A2A] not-italic">+</em></div>
          <div className="hs-lbl font-mono text-[9px] tracking-[.3em] uppercase text-[#9A8880] mt-[5px]">Projects</div>
        </div>
        <div className="hs-item text-center">
          <div className="hs-num font-display font-black text-[28px] leading-none text-white">∞</div>
          <div className="hs-lbl font-mono text-[9px] tracking-[.3em] uppercase text-[#9A8880] mt-[5px]">Drive</div>
        </div>
      </div>

      <style>{`
        @keyframes photoReveal { from { opacity: 0; transform: scale(1.1) translateY(20px); filter: grayscale(100%) brightness(0.8); } to { opacity: 1; transform: scale(1) translateY(0); filter: grayscale(15%) brightness(1.05); } }
        @keyframes nameReveal {
          from { opacity: 0; transform: translateY(40px) skewY(2deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }
        @keyframes lineExpand { from { width: 0; opacity: 0; } to { width: 280px; opacity: 1; } }
        @keyframes scanLine { 0%{ transform:translateX(-100%); } 100%{ transform:translateX(200%); } }

        /* Trigger animations based on .visible class for repeatability */
        .hero-photo-anim.visible { animation: photoReveal 2.2s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hero-name-anim.visible { animation: nameReveal 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .hero-title-line-anim.visible { animation: lineExpand 1s cubic-bezier(0.16,1,0.3,1) 0.9s both; }
        
        .hero-eyebrow-anim.visible, 
        .hero-greeting-anim.visible,
        .hero-sub-anim.visible,
        .hero-actions-anim.visible,
        .hero-stats-anim.visible,
        .hero-scroll-anim.reveal-trigger.visible {
          animation: slideUpReveal 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s) both;
        }

        /* Set Delays */
        .hero-eyebrow-anim { --delay: 0.2s; }
        .hero-greeting-anim { --delay: 0.4s; }
        .hero-sub-anim { --delay: 1s; }
        .hero-actions-anim { --delay: 1.1s; }
        .hero-stats-anim { --delay: 1.3s; }
        .hero-scroll-anim { --delay: 1.4s; }
        
        /* Reset state */
        .reveal-trigger:not(.visible) {
          opacity: 0;
          transform: translateY(30px);
          animation: none !important;
        }

        @keyframes slideUpReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}


