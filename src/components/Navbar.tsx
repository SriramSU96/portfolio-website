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
    setActiveHref(href)
    setMobileOpen(false)

    const scrollToTarget = () => {
      const target = document.querySelector<HTMLElement>(href)
      if (!target) return
      const offset = href === '#contact' ? 24 : -80

      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(target, { offset })
        return
      }

      const top = target.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    requestAnimationFrame(() => requestAnimationFrame(scrollToTarget))
  }

  return (
    <>
      <nav
        id="nav"
        className={`
          fixed top-0 left-0 right-0 z-[500] flex items-center justify-between
          px-4 sm:px-6 md:px-10 xl:px-20 max-w-full overflow-hidden transition-all duration-700
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
                  className={`text-[12px] tracking-[.15em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-white font-semibold' : 'text-[#F8F4F0]/80 hover:text-white'
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
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-[12px] tracking-[.15em] uppercase text-[#F8F4F0]/90 hover:text-white hover:border-[#C4526A]/50 transition-all duration-400 rounded-[2px] relative overflow-hidden group"
        >
          <span className="relative z-10 font-medium">Resume</span>
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
        className={`fixed inset-0 z-[510] overflow-x-hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-[320px] flex-col bg-[#09060b]/95 border-l border-white/10 px-6 py-5 transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            paddingBottom: 'calc(env(safe-area-inset-bottom, 1rem) + 1.25rem)',
            paddingTop: 'calc(env(safe-area-inset-top, 0.75rem) + 1rem)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <a
              href="#hero"
              onClick={e => smoothScroll(e, '#hero')}
              className="font-display font-black text-[18px] tracking-[-0.02em] text-white hover:text-[#C4526A] transition-colors duration-300"
            >
              Sriram
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white hover:border-[#C4526A]/40 hover:text-[#C4526A] transition-colors duration-300"
            >
              <span className="text-xl">×</span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-6 text-left">
              {NAV_LINKS.map((l, i) => (
                <li
                  key={l.href}
                  className={`transition-all duration-500 ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
                  style={{ transitionDelay: mobileOpen ? `${i * 70 + 80}ms` : '0ms' }}
                >
                  <a
                    href={l.href}
                    onClick={e => smoothScroll(e, l.href)}
                    className={`font-display font-black text-[24px] tracking-[-0.02em] leading-none transition-colors duration-300 ${
                      activeHref === l.href ? 'text-[#C4526A]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-white/10">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-[13px] tracking-[.2em] uppercase text-[#F8F4F0]/80 hover:bg-[#C4526A]/10 hover:text-[#C4526A] transition-all duration-300"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
