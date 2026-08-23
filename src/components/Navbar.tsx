import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActiveHref(href)
    setMobileOpen(false)
    const scrollToTarget = () => {
      const target = document.querySelector<HTMLElement>(href)
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    requestAnimationFrame(() => requestAnimationFrame(scrollToTarget))
  }

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-[500] px-6 sm:px-10 lg:px-16 pt-6 pb-4 transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="w-32">
            <a
              href="#hero"
              onClick={e => smoothScroll(e, '#hero')}
              className="font-serif italic font-bold text-2xl tracking-tight text-white flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12L20 4L12 20L10 14L4 12Z" fill="white" />
              </svg>
              Sriram
            </a>
          </div>

          {/* Desktop links - Glassmorphic Pill */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1.5">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => smoothScroll(e, l.href)}
                    className={`px-5 py-2 text-[14px] rounded-full transition-all duration-300 ${
                      activeHref === l.href ? 'bg-white/10 text-white font-medium' : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's Talk / Resume CTA */}
          <div className="w-32 flex justify-end">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center bg-white text-black px-6 py-2.5 text-[14px] font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
            >
              Resume
            </a>
            
            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setMobileOpen(v => !v)}
            >
              <span className={`w-6 h-[2px] bg-white block transition-all ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`w-6 h-[2px] bg-white block transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-white block transition-all ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[510] ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 inset-y-0 w-64 bg-[#3B0B13] p-8 flex flex-col transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setMobileOpen(false)} className="self-end text-white text-3xl mb-12">&times;</button>
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={e => smoothScroll(e, l.href)} className="text-white text-2xl font-serif italic">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-12 text-center bg-white text-black py-3 rounded-full font-semibold">
            Resume
          </a>
        </div>
      </div>
    </>
  )
}
