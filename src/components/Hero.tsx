import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ParticleCanvas } from '../3d/ParticleCanvas'

export const Hero = ({ appReady }: { appReady: boolean }) => {
  const photoRef = useRef<HTMLImageElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tickerRef.current) return

    const tl = gsap.to(tickerRef.current, {
      xPercent: -50,
      duration: 50,
      ease: 'none',
      repeat: -1,
      force3D: true,
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Skills stagger animation
  useEffect(() => {
    if (!skillsRef.current) return
    const items = skillsRef.current.querySelectorAll<HTMLElement>('.skill-item')
    gsap.set(items, { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: 24 })
    const onVisible = () => {
      gsap.to(items, {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 1.1,
      })
    }
    // fire once hero is ready
    const t = setTimeout(onVisible, 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (photoRef.current) {
        // Subtle parallax for the image
        photoRef.current.style.transform = `translateY(${window.scrollY * 0.1}px) scale(${1 + window.scrollY * 0.0005})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050102]">
      {/* Background layer */}
      <ParticleCanvas />

      {/* Dark gradient overlay + Vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(5,1,2,0.85)_60%,rgba(5,1,2,1)_100%)] pointer-events-none"></div>

      {/* Grain Texture */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>

      {/* Background large text (Faint behind everything) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="hero-bg-text-anim reveal-trigger font-display font-black text-[clamp(150px,35vw,600px)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(107,26,42,0.15)] opacity-10 tracking-[-0.05em] whitespace-nowrap" style={{ transitionDelay: '0.1s' }}>
          SRIRAM
        </h1>
      </div>

      {/* Top Main Heading Content */}
      <div className="relative z-[10] w-full pt-[10vh] lg:pt-[13vh] pb-4 flex justify-center pointer-events-none">
        <div className="hero-name-anim reveal-trigger relative" style={{ transitionDelay: '0.5s' }}>
          {/* Subtle red glow behind text (Reduced Intensity) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#722F37] opacity-[0.1] blur-[80px] rounded-full pointer-events-none"></div>

          <h1 className="font-display font-black text-[clamp(80px,18vw,230px)] leading-[0.8] tracking-[0em] uppercase text-center flex flex-wrap justify-center md:gap-4 m-0 relative z-10 scale-y-110">
            {/* Subtle vertical gradient and depth */}
            <span className="bg-gradient-to-b from-[#A63C4F] to-[#6B1A2A] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(107,26,42,0.3)]">SRI</span>
            <span className="bg-gradient-to-b from-[#A63C4F] to-[#6B1A2A] bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(107,26,42,0.3)]">RAM</span>
          </h1>
        </div>
      </div>

      {/* Grid container for Left, Center Image, Right Content */}
      <div className="relative z-[11] flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 items-end pb-8 lg:pb-0 px-6 lg:px-12 mt-auto">

        {/* Left Side: Description & CTA - Centered Vertically */}
        <div className="flex flex-col gap-6 lg:gap-8 max-lg:order-2 max-lg:items-center max-lg:text-center z-20 self-center max-lg:mt-8 lg:-mt-[5vh]">
          <p className="hero-sub-anim reveal-trigger text-[clamp(15px,1.2vw,17px)] leading-[1.8] text-[#F8F4F0]/80 font-light max-w-[340px]" style={{ transitionDelay: '0.7s' }}>
            Hey there! I'm a <strong className="text-white font-medium">Frontend Developer</strong> focused on clean code and building fast, scalable applications across platforms.
          </p>

          <div className="hero-actions-anim reveal-trigger pt-2" style={{ transitionDelay: '0.9s' }}>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 border border-white/20 text-[13px] tracking-wide text-[#F8F4F0] hover:text-white hover:border-[#C4526A]/50 transition-all duration-500 rounded-[2px] overflow-hidden bg-white/[0.02] backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-3 font-medium">
                <span className="text-[#C4526A] font-mono">//</span>
                Let’s Work Together
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </span>
              <span className="absolute inset-0 bg-[#C4526A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>

        {/* Center Side: Image */}
        <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] flex justify-center items-end max-lg:order-1 max-lg:-mt-[15vh] z-10 pointer-events-none">
          {/* Arch styled image container */}
          <div className="absolute bottom-0 w-[min(100%,480px)] h-[110%] rounded-t-[500px] overflow-hidden bg-[#050102]">
            <img
              ref={photoRef}
              src="/photo.png"
              alt="Sriram — Developer"
              className="hero-image-anim reveal-trigger w-full h-full object-cover object-top opacity-70 contrast-[1.1] grayscale-[20%] mix-blend-screen"
              style={{ transitionDelay: '0.3s' }}
            />
            {/* Bottom fade inside the arch to seamlessly blend with the background */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050102] via-[#050102]/80 to-transparent z-[12]"></div>

            {/* Soft inner glow and 1px top rim light for brushed metal effect */}
            <div className="absolute inset-0 rounded-t-[500px] shadow-[inset_0_0_80px_rgba(114,47,55,0.25),inset_0_1.5px_0_rgba(166,60,79,0.3)] z-[13]"></div>

            {/* Subtle noise texture over the arch */}
            <div className="absolute inset-0 z-[14] mix-blend-overlay opacity-20 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
          </div>
        </div>

        {/* Right Side: Skills/Services List - Centered Vertically */}
        <div
          ref={skillsRef}
          className="flex flex-col lg:text-right max-lg:order-3 max-lg:items-center z-20 self-center max-lg:mt-8 lg:-mt-[5vh] lg:min-w-[220px]"
        >
          {/* Label */}
          <p className="font-mono text-[12px] tracking-[.35em] uppercase text-[#C4526A]/80 font-semibold mb-5 max-lg:hidden drop-shadow-[0_0_8px_rgba(196,82,106,0.3)]">
            Expertise
          </p>

          {[
            { name: 'Angular Specialization', active: false },
            { name: 'Frontend Architecture', active: true },
            { name: 'UI / UX Integration', active: false },
            { name: 'Design Consultancy', active: false },
          ].map((skill) => (
            <div
              key={skill.name}
              className="skill-item group relative flex items-center gap-3 lg:justify-end max-lg:justify-center py-3 border-b border-white/[0.05] last:border-0 overflow-hidden"
            >
              {/* Hover scan-line */}
              <span className="absolute inset-0 bg-gradient-to-l from-[#C4526A]/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />

              {/* Active dot (desktop — sits to the left of text, which is on right) */}
              {skill.active && (
                <span className="max-lg:hidden w-1.5 h-1.5 rounded-full bg-[#C4526A] shadow-[0_0_8px_#C4526A] animate-pulse flex-shrink-0" />
              )}

              <span
                className={`relative z-10 font-display tracking-wide text-[clamp(13px,1.1vw,16px)] transition-colors duration-300 ${skill.active
                  ? 'text-white font-semibold'
                  : 'text-[#F8F4F0]/50 font-light group-hover:text-[#F8F4F0]/90'
                  }`}
              >
                {skill.name}
              </span>

              {/* Active dot (mobile — sits to right of text) */}
              {skill.active && (
                <span className="lg:hidden w-1.5 h-1.5 rounded-full bg-[#C4526A] shadow-[0_0_8px_#C4526A] animate-pulse flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ticker bar - Cinematic Premium Version */}
      <div className="hero-ticker-anim reveal-trigger relative z-[10] w-full border-t border-[#6B1A2A]/30 py-6 bg-black/40 backdrop-blur-md overflow-hidden flex items-center" style={{ transitionDelay: '1.4s' }}>
        {/* Cinematic edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-[11] pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-[11] pointer-events-none"></div>

        {/* Subtle top highlight for the bar */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C4526A]/40 to-transparent z-[12]"></div>

        <div
          ref={tickerRef}
          className="flex w-max"
          style={{
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {[1, 2, 3, 4].map((group) => (
            <div key={group} className="flex shrink-0 items-center gap-[8vw] px-[4vw]" style={{ transform: 'translate3d(0,0,0)' }}>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#8B2035] group-hover:text-[#C4526A] group-hover:drop-shadow-[0_0_8px_#C4526A] transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 5.63v12.74L12 22l10-3.63V5.63L12 2zm0 3.16l7.84 2.85v10.15L12 19.84l-7.84-3.68V8.01L12 5.16zm0 2.2l-4.5 10.1h2.2l.9-2.3h4.8l.9 2.3h2.2l-4.5-10.1zm0 2.2l1.6 4.1h-3.2l1.6-4.1z" />
                </svg>
                Angular
              </div>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#C4526A]/60 group-hover:text-[#C4526A] group-hover:drop-shadow-[0_0_8px_#C4526A] transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                </svg>
                React
              </div>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#C4526A]/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_white] transition-all duration-500" viewBox="0 0 24 24">
                  <mask id={`ts-mask-${group}`}>
                    <rect width="24" height="24" fill="white" />
                    <text x="12" y="17" fontFamily="Arial, Helvetica, sans-serif" fontSize="11" fontWeight="bold" fill="black" textAnchor="middle" style={{ letterSpacing: '-0.5px' }}>TS</text>
                  </mask>
                  <rect width="24" height="24" fill="currentColor" mask={`url(#ts-mask-${group})`} />
                </svg>
                TypeScript
              </div>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#8B2035]/60 group-hover:text-[#C4526A] group-hover:drop-shadow-[0_0_8px_#C4526A] transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.377 1.394 2.738 2.776 5.712 2.776 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.377-1.394-2.738-2.776-5.712-2.776zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg>
                Tailwind
              </div>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#8B2035]/60 group-hover:text-[#C4526A] group-hover:drop-shadow-[0_0_8px_#C4526A] transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 6.33v8.66L12 19.33l7.5-4.34V6.33L12 2zm5.5 12.07l-5.5 3.18-5.5-3.18V7.59l5.5-3.18 5.5 3.18v6.66z" />
                  <path d="M12 6.5l-4 2.3v4.4l4 2.3 4-2.3v-4.4l-4-2.3zm2.5 6.07l-2.5 1.44-2.5-1.44V9.09l2.5-1.44 2.5 1.44v3.48z" />
                </svg>
                Node.js
              </div>
              <div className="group flex items-center gap-4 text-[#F8F4F0]/60 font-mono text-[13px] tracking-widest hover:text-white transition-all duration-500 cursor-default uppercase">
                <svg className="w-5 h-5 text-[#C4526A]/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_white] transition-all duration-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 2a3.5 3.5 0 000 7h.5v1H8a3.5 3.5 0 000 7h.5v1a3.5 3.5 0 107 0v-1h.5a3.5 3.5 0 100-7H15.5v-1h.5a3.5 3.5 0 100-7H15.5V2H8zm4 3.5v3.5h3.5A3.5 3.5 0 1112 5.5zM12 9v3.5H8.5A3.5 3.5 0 1112 9zm0 3.5v3.5h3.5a3.5 3.5 0 11-3.5-3.5zm0 3.5V13h-3.5a3.5 3.5 0 103.5 3.5z" />
                </svg>
                Figma
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 lg:bottom-12 left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-3 pointer-events-none opacity-80">
        <div className="w-[1px] h-12 bg-[#722F37]/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#A63C4F] to-transparent animate-[scroll-down_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-down { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
        @keyframes bgTextReveal { from { opacity: 0; transform: scale(0.95) translate(-50%, -50%); filter: blur(10px); } to { opacity: 0.1; transform: scale(1) translate(-50%, -50%); filter: blur(0); } }
        @keyframes imageReveal { from { opacity: 0; transform: translateY(40px) scale(0.95); filter: grayscale(100%) brightness(0.5); } to { opacity: 0.7; transform: translateY(0) scale(1); filter: grayscale(20%) brightness(1); } }
        @keyframes nameScaleUp { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        /* Trigger animations based on .visible class */
        .hero-bg-text-anim.visible { animation: bgTextReveal 2s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s) forwards; }
        .hero-image-anim.visible { animation: imageReveal 1.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s) forwards; }
        .hero-name-anim.visible { animation: nameScaleUp 1.2s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s) forwards; }
        
        .hero-sub-anim.visible,
        .hero-actions-anim.visible,
        .hero-ticker-anim.visible {
          animation: slideUpCenterReveal 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s) forwards;
        }

        /* Reset state */
        .reveal-trigger:not(.visible) {
          opacity: 0;
          animation: none !important;
        }

        @keyframes slideUpCenterReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
