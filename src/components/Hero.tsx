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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#8B2035] opacity-[0.1] blur-[80px] rounded-full pointer-events-none"></div>

          <h1 className="font-display font-black text-[clamp(80px,18vw,230px)] leading-[0.8] tracking-[-.05em] uppercase text-center flex flex-wrap justify-center md:gap-2 m-0 relative z-10 scale-y-110">
            {/* Reduced drop shadow */}
            <span className="text-[#a51a36] drop-shadow-[0_0_20px_rgba(139,32,53,0.15)]">SRI</span>
            <span className="text-[#a51a36] drop-shadow-[0_0_20px_rgba(139,32,53,0.15)]">RAM</span>
          </h1>
        </div>
      </div>

      {/* Grid container for Left, Center Image, Right Content */}
      <div className="relative z-[11] flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 items-end pb-8 lg:pb-0 px-6 lg:px-12 mt-auto">

        {/* Left Side: Description & CTA - Centered Vertically */}
        <div className="flex flex-col gap-6 lg:gap-8 max-lg:order-2 max-lg:items-center max-lg:text-center z-20 self-center max-lg:mt-8 lg:-mt-[5vh]">
          <p className="hero-sub-anim reveal-trigger text-[clamp(15px,1.2vw,17px)] leading-[1.8] text-[#F8F4F0]/80 font-light max-w-[300px]" style={{ transitionDelay: '0.7s' }}>
            Hey there! I'm a <strong className="text-white font-medium">Frontend Developer</strong> building fast, scalable, and clean applications in the global marketplace.
          </p>

          <div className="hero-actions-anim reveal-trigger" style={{ transitionDelay: '0.9s' }}>
            <a href="#contact" className="group inline-flex items-center gap-3 text-[#F8F4F0] font-mono text-[12px] tracking-[.3em] font-bold hover:text-[#C4526A] transition-colors uppercase">
              // HIRE ME
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>

        {/* Center Side: Image */}
        <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] flex justify-center items-end max-lg:order-1 max-lg:-mt-[15vh] z-10 pointer-events-none">
          {/* Arch styled image container */}
          <div className="absolute bottom-0 w-[min(100%,480px)] h-[110%] rounded-t-[500px] overflow-hidden border-t border-x border-[#8B2035]/20 shadow-[0_-20px_80px_rgba(139,32,53,0.1)] bg-[#050102]">
            <img
              ref={photoRef}
              src="/photo.png"
              alt="Sriram — Developer"
              className="hero-image-anim reveal-trigger w-full h-full object-cover object-top opacity-70 contrast-[1.1] grayscale-[20%] mix-blend-screen"
              style={{ transitionDelay: '0.3s' }}
            />
            {/* Bottom fade inside the arch to seamlessly blend with the background */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050102] via-[#050102]/80 to-transparent z-[12]"></div>

            {/* Soft inner glow around the arch edges */}
            <div className="absolute inset-0 rounded-t-[500px] shadow-[inset_0_0_40px_rgba(139,32,53,0.1)] z-[13]"></div>
          </div>
        </div>

        {/* Right Side: Skills/Services List - Centered Vertically */}
        <div
          ref={skillsRef}
          className="flex flex-col lg:text-right max-lg:order-3 max-lg:items-center z-20 self-center max-lg:mt-8 lg:-mt-[5vh] lg:min-w-[220px]"
        >
          {/* Label */}
          <p className="font-mono text-[10px] tracking-[.35em] uppercase text-[#6B1A2A] mb-5 max-lg:hidden">
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

      {/* Bottom Ticker bar representing the logos bar in the image - Brightened Text */}
      <div className="hero-ticker-anim reveal-trigger relative z-[10] w-full border-t border-[#6B1A2A]/20 py-5 bg-[#050102] overflow-hidden flex items-center" style={{ transitionDelay: '1.4s' }}>
        {/* Gradient fades for ticker edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050102] to-transparent z-[11] pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050102] to-transparent z-[11] pointer-events-none"></div>

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
            <div key={group} className="flex shrink-0 items-center gap-[6vw] px-[3vw]" style={{ transform: 'translate3d(0,0,0)' }}>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-5 h-5 rounded-sm bg-[#8B2035]/40 flex items-center justify-center text-[11px] text-[#F8F4F0] font-bold">▲</div> Angular</div>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-5 h-5 rounded-full border-2 border-[#C4526A]/60"></div> React</div>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-5 h-5 bg-[#C4526A]/40 rotate-45 border border-[#C4526A]/20"></div> TypeScript</div>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-6 h-3 bg-[#8B2035]/50 rounded-sm"></div> Tailwind</div>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-5 h-5 rounded-full border-2 border-dashed border-[#C4526A]/60"></div> Node.js</div>
              <div className="flex items-center gap-3 text-[#F8F4F0] font-display text-[16px] md:text-[18px] hover:text-[#C4526A] transition-colors"><div className="w-4 h-4 bg-[#C4526A]/50 shadow-[0_0_10px_rgba(196,82,106,0.3)]"></div> Figma</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
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
