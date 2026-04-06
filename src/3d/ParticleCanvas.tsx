import { useRef, useEffect } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; opacity: number
  color: string
  tw: number; twS: number
}

export const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, particles: Particle[] = [], raf = 0

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const count = W < 768 ? 55 : 110
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - .5) * .45,
        vy: (Math.random() - .5) * .45,
        r: Math.random() * 1.8 + .3,
        opacity: Math.random() * .55 + .15,
        color: Math.random() > .55 ? '#6B1A2A' : '#C4526A',
        tw: Math.random() * Math.PI * 2,
        twS: Math.random() * .016 + .004,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 145) {
            const alpha = (1 - dist / 145) * .22
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(107,26,42,${alpha})`
            ctx.lineWidth = .5
            ctx.stroke()
          }
        }
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.tw += p.twS
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const osc = p.opacity * (.5 + .5 * Math.abs(Math.sin(p.tw)))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = osc
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
