<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseOpacity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number
let mouseX = -1000
let mouseY = -1000
const particleCount = 120
const connectionDistance = 150
const mouseInfluenceRadius = 180

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
}

const createParticles = () => {
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.2,
      baseOpacity: Math.random() * 0.4 + 0.2
    })
  }
}

const drawParticle = (particle: Particle) => {
  if (!ctx) return

  const distToMouse = Math.hypot(particle.x - mouseX, particle.y - mouseY)
  let currentOpacity = particle.baseOpacity

  if (distToMouse < mouseInfluenceRadius) {
    const influence = 1 - distToMouse / mouseInfluenceRadius
    currentOpacity = particle.baseOpacity + influence * 0.4
  }

  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

  const gradient = ctx.createRadialGradient(
    particle.x, particle.y, 0,
    particle.x, particle.y, particle.size
  )
  gradient.addColorStop(0, `rgba(100, 200, 255, ${currentOpacity})`)
  gradient.addColorStop(1, `rgba(100, 200, 255, 0)`)

  ctx.fillStyle = gradient
  ctx.fill()
}

const drawConnections = () => {
  if (!ctx) return

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        const opacity = (1 - distance / connectionDistance) * 0.3
        ctx.beginPath()
        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

const updateParticles = () => {
  particles.forEach(particle => {
    particle.x += particle.vx
    particle.y += particle.vy

    // Mouse repulsion
    const distToMouse = Math.hypot(particle.x - mouseX, particle.y - mouseY)
    if (distToMouse < mouseInfluenceRadius) {
      const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX)
      const force = (1 - distToMouse / mouseInfluenceRadius) * 2
      particle.vx += Math.cos(angle) * force * 0.1
      particle.vy += Math.sin(angle) * force * 0.1
    }

    // Damping
    particle.vx *= 0.98
    particle.vy *= 0.98

    // Boundary check
    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

    particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
    particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))
  })
}

const animate = () => {
  if (!ctx) return

  ctx.fillStyle = 'rgba(10, 15, 30, 0.1)'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  updateParticles()
  drawConnections()
  particles.forEach(drawParticle)

  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  initCanvas()
  createParticles()
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const handleMouseLeave = () => {
  gsap.to({ x: mouseX, y: mouseY }, {
    x: -1000,
    y: -1000,
    duration: 0.5,
    onUpdate: function() {
      mouseX = this.targets()[0].x
      mouseY = this.targets()[0].y
    }
  })
}

onMounted(() => {
  initCanvas()
  createParticles()
  animate()

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(135deg, #0a0f1e 0%, #1a1f3a 50%, #0f1428 100%);
}
</style>
