import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    portfolioLenis?: Lenis
  }
}

export const useLenis = (stopped: boolean) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    window.portfolioLenis = lenis

    if (stopped) {
      lenis.stop()
    } else {
      lenis.start()
    }

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      if (window.portfolioLenis === lenis) {
        delete window.portfolioLenis
      }
      lenis.destroy()
    }
  }, [stopped])
}
