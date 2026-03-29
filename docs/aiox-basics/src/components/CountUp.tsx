import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({ end, suffix = '', duration = 1.5, className = '' }: CountUpProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 40
    const increment = end / steps
    const interval = (duration * 1000) / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref} className={className}>{count}{suffix}</span>
}
