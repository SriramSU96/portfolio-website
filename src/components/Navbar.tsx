import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastY.current && y > 200)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav id="nav"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-7 transition-all duration-500 max-md:px-6 max-md:py-5 ${scrolled ? 'bg-[#080305]/85 backdrop-blur-3xl py-[18px] border-b border-[#6B1A2A]/25' : ''
          } ${hidden ? 'translate-y-[-100%]' : 'translate-y-0'}`}
      >
        {/* Logo */}
        <a href="#hero" onClick={e => smoothScroll(e, '#hero')}
          className="nav-logo font-display font-black text-[22px] tracking-tight text-white">
          Sri<em className="text-[#6B1A2A] italic not-italic">ram</em>
        </a>

        {/* Desktop links */}
        <ul className="nav-links flex items-center gap-11 max-md:hidden">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => smoothScroll(e, l.href)}
                className="font-mono text-[10px] tracking-[.3em] uppercase text-[#9A8880] transition-colors duration-300 hover:text-[#C4526A]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#" className="nav-cta px-7 py-2.5 border border-[#6B1A2A] rounded-[1px] font-mono text-[10px] tracking-[.3em] uppercase text-[#C4526A] transition-all duration-400 relative overflow-hidden group max-md:hidden">
          <span className="relative z-10 group-hover:text-white">Resume ↗</span>
          <div className="absolute inset-0 bg-[#6B1A2A] translate-x-[-100%] transition-transform duration-400 ease-in-out group-hover:translate-x-0" />
        </a>

        {/* Hamburger */}
        <button className="hamburger hidden max-md:flex flex-col gap-[5px] p-1 bg-none border-none cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu">
          <span className="hb-line w-6 h-[1px] bg-white transition-all duration-300" />
          <span className="hb-line w-6 h-[1px] bg-white transition-all duration-300" />
          <span className="hb-line w-6 h-[1px] bg-white transition-all duration-300" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu"
        className={`fixed inset-0 z-[490] flex flex-col items-center justify-center gap-9 bg-[#080305]/97 transition-all duration-300 ${mobileOpen ? 'flex' : 'hidden'
          }`}
      >
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href}
            onClick={e => smoothScroll(e, l.href)}
            className="mm-link font-display text-4xl font-bold text-white hover:text-[#C4526A]"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
