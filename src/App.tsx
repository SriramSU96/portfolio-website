import { useState, useEffect } from 'react'
import { useLenis } from './hooks/useLenis'
import { Preloader } from './components/Preloader'

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CardStackOverlay } from './components/CardStackOverlay'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Highlights } from './components/Highlights'
import { CurrentlyWorkingOn } from './components/CurrentlyWorkingOn'
import { CoreStrengths } from './components/CoreStrengths'
import { CareerGoal } from './components/CareerGoal'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

const SESSION_KEY = 'sr-preloader-shown'

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => !sessionStorage.getItem(SESSION_KEY))
  const [appReady, setAppReady] = useState(() => !!sessionStorage.getItem(SESSION_KEY))
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  // Init Lenis smooth scroll
  useLenis(showPreloader)

  const handlePreloaderDone = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setShowPreloader(false)
    setAppReady(true)
  }

  // Scroll-reveal observer
  useEffect(() => {
    if (!appReady) return
    let io: IntersectionObserver | null = null
    const timer = setTimeout(() => {
      io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          } else {
            e.target.classList.remove('visible')
          }
        }),
        { threshold: 0.01, rootMargin: '0px 0px -5% 0px' }
      )
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-word, .reveal-step, .reveal-trigger').forEach(el => io?.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      io?.disconnect()
    }
  }, [appReady])

  return (
    <div className="noise-layer relative">


      {showPreloader && <Preloader onComplete={handlePreloaderDone} />}

      <div style={{
        opacity: appReady ? 1 : 0, visibility: appReady ? 'visible' : 'hidden',
        transition: 'opacity .6s ease'
      }}>
        <Navbar />
        <main>
          <CardStackOverlay 
            page1={<Hero appReady={appReady} />} 
            page2={
              <div className="w-full h-full overflow-y-auto">
                <About />
                <Skills />
              </div>
            } 
          />
          <Projects />
          <Highlights />
          <CurrentlyWorkingOn />
          <CoreStrengths />
          <CareerGoal />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
