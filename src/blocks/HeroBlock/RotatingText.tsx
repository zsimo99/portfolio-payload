'use client'

import React, { useEffect, useState } from 'react'

interface RotatingTextProps {
  words: string[]
  intervalMs?: number
  className?: string
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words,
  intervalMs = 3000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'entering'>('visible')

  const activeWords = Array.isArray(words) && words.length > 0 ? words : ['Creator']

  useEffect(() => {
    if (activeWords.length <= 1) return

    // Honor prefers-reduced-motion media query
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    let transitionTimer: ReturnType<typeof setTimeout> | undefined

    const intervalTimer = setInterval(() => {
      // 1. Accelerate out (exit upwards)
      setPhase('exiting')

      transitionTimer = setTimeout(() => {
        // Change word while hidden below
        setCurrentIndex((prev) => (prev + 1) % activeWords.length)
        setPhase('entering')

        // 2. Decelerate in (settle to natural baseline)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('visible')
          })
        })
      }, 220) // Snappy exit duration
    }, intervalMs)

    return () => {
      clearInterval(intervalTimer)
      if (transitionTimer) clearTimeout(transitionTimer)
    }
  }, [activeWords.length, intervalMs])

  const currentWord = activeWords[currentIndex] || activeWords[0]

  // Phase classes with natural easing curves (cubic-bezier)
  const getPhaseClasses = () => {
    switch (phase) {
      case 'exiting':
        return 'opacity-0 -translate-y-4 scale-[0.97] transition-all duration-200 ease-in filter blur-[1px]'
      case 'entering':
        return 'opacity-0 translate-y-4 scale-[1.03] transition-none filter blur-[1px]'
      case 'visible':
      default:
        return 'opacity-100 translate-y-0 scale-100 transition-all duration-300 ease-out filter blur-0'
    }
  }

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className="inline-flex relative overflow-hidden align-baseline whitespace-nowrap"
    >
      <span
        className={`inline-block transform-gpu will-change-transform ${getPhaseClasses()} ${
          className || ''
        }`}
      >
        {currentWord}
      </span>
    </span>
  )
}
