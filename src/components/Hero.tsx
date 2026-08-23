import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const Hero = ({ appReady }: { appReady: boolean }) => {
  const heroRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)

  // Entrance animation
  useEffect(() => {
    if (!appReady || !heroRef.current) return

    const image = heroRef.current.querySelector<HTMLElement>('.hero-image-anim')
    const eyebrow = heroRef.current.querySelector<HTMLElement>('.hero-eyebrow-anim')
    const name = heroRef.current.querySelector<HTMLElement>('.hero-name-anim')
    const role = heroRef.current.querySelector<HTMLElement>('.hero-role-anim')
    const bottomLeft = heroRef.current.querySelector<HTMLElement>('.hero-bl-anim')
    const bottomRight = heroRef.current.querySelector<HTMLElement>('.hero-br-anim')

    gsap.set([image, eyebrow, name, role, bottomLeft, bottomRight], { opacity: 0, y: 24 })
    gsap.set(image, { y: 0, scale: 1.06 })

    const tl = gsap.timeline()
      .to(image, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, 0)
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
      .to(name, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 0.45)
      .to(role, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.65)
      .to(bottomLeft, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.85)
      .to(bottomRight, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.95)

    return () => { tl.kill() }
  }, [appReady])

  // Subtle parallax on the portrait
  useEffect(() => {
    const onScroll = () => {
      if (photoRef.current) {
        photoRef.current.style.transform = `scale(${1 + window.scrollY * 0.0003}) translateY(${window.scrollY * 0.06}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[100svh] w-full overflow-hidden bg-[#2C0910] flex flex-col">

      {/* Portrait photo — right-hand portion, not full-bleed, so the crop stays natural */}
      <div className="absolute inset-y-0 right-0 z-0 w-full sm:w-[78%] lg:w-[58%] xl:w-[52%]">
        <img
          ref={photoRef}
          src="/photo.png"
          alt="Sriram — Frontend Developer"
          className="hero-image-anim w-full h-full object-cover object-[center_18%]"
        />
        {/* Left edge wash so the name/text stays legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C0910] via-[#2C0910]/55 sm:via-[#2C0910]/35 to-transparent" />
        {/* Bottom fade for the lower caption */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#170509] via-[#170509]/35 to-transparent" />
      </div>

      {/* Solid maroon backdrop behind/left of the photo */}
      <div className="absolute inset-0 z-[-1] bg-[#2C0910]" />

      {/* Fade under the navbar */}
      <div className="absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[#170509]/85 to-transparent pointer-events-none" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      ></div>

      {/* Main name block */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-28 max-w-[640px]">
        <p className="hero-eyebrow-anim font-display italic text-[22px] sm:text-[28px] text-white/80 mb-1">I'm</p>
        <h1 className="hero-name-anim font-display font-black text-[clamp(48px,9vw,120px)] leading-[0.95] text-white tracking-tight uppercase">
          Sriram
        </h1>
        <p className="hero-role-anim font-mono text-[12px] sm:text-[13px] tracking-[.4em] uppercase text-[#C4526A] mt-4">
          Frontend Developer
        </p>
      </div>

      {/* Bottom-left description + CTA */}
      <div className="hero-bl-anim relative z-10 px-6 sm:px-10 lg:px-20 pb-10 lg:pb-14 max-w-[300px] sm:max-w-[340px]">
        <p className="text-[13.5px] leading-relaxed text-white/70">
          Focused on clean code and building fast, scalable applications across platforms.
        </p>
        <a
          href="#contact"
          className="group mt-5 inline-flex items-center gap-2 whitespace-nowrap text-[12px] tracking-[.2em] uppercase text-white/90 hover:text-[#C4526A] transition-colors duration-300"
        >
          <span className="text-[#C4526A] font-mono">//</span>
          Let's Work Together
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>

      {/* Bottom-right description */}
      <div className="hero-br-anim hidden md:block absolute z-10 right-6 lg:right-20 bottom-10 lg:bottom-14 max-w-[280px] text-right">
        <p className="text-[13.5px] leading-relaxed text-white/70">
          Frontend developer who builds fast, scalable interfaces — with a growing focus on full-stack &amp; AI-driven applications.
        </p>
      </div>
    </section>
  )
}
