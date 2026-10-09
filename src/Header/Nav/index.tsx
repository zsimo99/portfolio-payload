'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Search } from 'lucide-react'

export const HeaderNav: React.FC<{
  data: HeaderType
  isMobile?: boolean
  onItemClick?: () => void
}> = ({ data, isMobile = false, onItemClick }) => {
  const navItems = data?.navItems || []

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-1 w-full pt-1">
        {navItems.map(({ link }, i) => (
          <div key={i} onClick={onItemClick} className="w-full">
            <CMSLink
              {...link}
              appearance="link"
              className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
            />
          </div>
        ))}
        <Link
          href="/search"
          onClick={onItemClick}
          className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
        </Link>
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ link }, i) => (
        <CMSLink
          key={i}
          {...link}
          appearance="link"
          className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-150"
        />
      ))}
      <Link
        href="/search"
        aria-label="Search"
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-150"
      >
        <Search className="w-3.5 h-3.5" />
      </Link>
    </nav>
  )
}
