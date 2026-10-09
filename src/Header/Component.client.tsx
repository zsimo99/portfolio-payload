'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-200"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={`max-w-5xl mx-auto rounded-xl border border-border bg-background/90 backdrop-blur-md transition-all duration-200 ${
          scrolled ? 'shadow-[0_2px_8px_rgba(0,0,0,0.03)]' : ''
        }`}
      >
        <div className="flex items-center justify-between h-13 sm:h-14 px-4 sm:px-5">
          {/* Left: Nav links on desktop */}
          <div className="hidden md:flex items-center gap-1">
            <HeaderNav data={data} />
          </div>

          {/* Mobile menu trigger on the left */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Right: Logo and theme controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>
            <Link
              href="/"
              className="group flex items-center transition-opacity hover:opacity-85"
            >
              <Logo
                customMedia={data?.logo}
                logoText={data?.logoText}
                loading="eager"
                priority="high"
              />
            </Link>
          </div>
        </div>

        {/* Mobile dropdown sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border px-4 py-3 rounded-b-xl bg-background/95 backdrop-blur-md">
            <HeaderNav
              data={data}
              isMobile
              onItemClick={() => setMobileMenuOpen(false)}
            />
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between px-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Theme</span>
              <ThemeSelector />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
