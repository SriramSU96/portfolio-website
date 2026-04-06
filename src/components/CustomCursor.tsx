import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const idleTimer = useRef<any>(null)

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return

    // QuickTo setters for ultra-smooth GPU performance (x, y instead of left, top)
    const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.15, ease: 'power3.out' })
    const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.15, ease: 'power3.out' })
    
    // Tightened duration for snappier follows across the screen width
    const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'expo.out' })
    const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'expo.out' })

    const onMove = (e: MouseEvent) => {
      // Show on move
      setIsHidden(false)
      
      // Update GPU-accelerated positions
      xDotTo(e.clientX)
      yDotTo(e.clientY)
      xRingTo(e.clientX)
      yRingTo(e.clientY)

      // Idle timer logic
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        setIsHidden(true)
      }, 2000)
    }

    const onHoverEnter = () => setIsHovering(true)
    const onHoverLeave = () => setIsHovering(false)

    // Global listeners for mouse move
    window.addEventListener('mousemove', onMove)

    // Delegate hover listeners to all interactive elements
    const updateHoverElements = () => {
      const elements = document.querySelectorAll('a, button, .contact-card, .project-card, input, textarea')
      elements.forEach(el => {
        el.addEventListener('mouseenter', onHoverEnter)
        el.addEventListener('mouseleave', onHoverLeave)
      })
    }

    // Initial setup and observer for dynamic content
    updateHoverElements()
    const observer = new MutationObserver(updateHoverElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <>
      <div
        id="c-dot"
        ref={dotRef}
        className={`fixed left-0 top-0 w-2 h-2 rounded-full pointer-events-none z-[99999] bg-[#C4526A] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isHovering ? 'scale-[0.5] bg-[#F8F4F0]' : 'scale-100'}`}
        style={{ mixBlendMode: 'difference', filter: 'drop-shadow(0 0 5px rgba(196,82,106,0.5))' }}
      />
      <div
        id="c-ring"
        ref={ringRef}
        className={`fixed left-0 top-0 w-10 h-10 rounded-full border border-[rgba(196,82,106,.4)] pointer-events-none z-[99998] translate-x-[-50%] translate-y-[-50%] transition-all duration-500 ease-out ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isHovering ? 'scale-[1.8] border-[#C4526A] bg-white/5' : 'scale-100'}`}
      />
    </>
  )
}
