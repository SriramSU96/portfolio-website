import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastY.current && y > 250)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(`#${id}`) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        id="nav"
        className={`
          fixed top-0 left-0 right-0 z-[500] flex items-center justify-between
          px-10 xl:px-20 transition-all duration-700
          ${scrolled
            ? 'py-4 bg-[#050102]/95 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'py-8 bg-transparent'
          }
          ${hidden ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        {/* Logo — clean wordmark */}
        <a
          href="#hero"
          onClick={e => smoothScroll(e, '#hero')}
          className="font-display font-black text-[19px] tracking-[-0.02em] text-white hover:text-[#C4526A] transition-colors duration-400 select-none"
        >
          Sriram
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(l => {
            const isActive = activeHref === l.href
            return (
              <li key={l.href} className="relative group">
                <a
                  href={l.href}
                  onClick={e => smoothScroll(e, l.href)}
                  className={`font-mono text-[11px] tracking-[.3em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-[#F8F4F0]/70 hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
                {/* Thin active indicator */}
                <span
                  className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#C4526A] shadow-[0_0_8px_#C4526A] transition-all duration-500 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-40'
                  }`}
                />
              </li>
            )
          })}
        </ul>

        {/* Resume CTA */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 border border-white/10 font-mono text-[9px] tracking-[.35em] uppercase text-[#F8F4F0]/60 hover:text-white hover:border-[#C4526A]/50 transition-all duration-400 rounded-[2px] relative overflow-hidden group"
        >
          <span className="relative z-10">Resume</span>
          <svg className="relative z-10 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
          <span className="absolute inset-0 bg-[#C4526A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </a>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-9 h-9 gap-[6px] relative z-[510]"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`w-5 h-px bg-white block transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-5 h-px bg-white block transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-px bg-white block transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[490] flex flex-col items-center justify-center bg-[#050102] transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Subtle background accent */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B2035]/5 rounded-full blur-[100px] pointer-events-none" />

        <ul className="flex flex-col items-center gap-10 relative z-10">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.href}
              className={`transition-all duration-500 ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: mobileOpen ? `${i * 70 + 80}ms` : '0ms' }}
            >
              <a
                href={l.href}
                onClick={e => smoothScroll(e, l.href)}
                className={`font-display font-black text-[clamp(36px,9vw,64px)] tracking-[-0.03em] transition-colors duration-300 ${
                  activeHref === l.href ? 'text-[#C4526A]' : 'text-white hover:text-white/60'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-16 relative z-10 font-mono text-[9px] tracking-[.4em] uppercase text-[#F8F4F0]/30 hover:text-[#C4526A] transition-all duration-400 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: mobileOpen ? '380ms' : '0ms' }}
        >
          Resume ↗
        </a>
      </div>
    </>
  )
}
