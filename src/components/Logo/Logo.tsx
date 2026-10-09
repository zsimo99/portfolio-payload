import clsx from 'clsx'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  customMedia?: (string | null) | MediaType
  logoText?: string | null
}

export const Logo: React.FC<Props> = (props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    customMedia,
    logoText,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  if (customMedia && typeof customMedia === 'object' && customMedia.url) {
    return (
      <div className={clsx('flex items-center gap-3', className)}>
        <div className="relative h-9 max-h-9 flex items-center">
          <Media
            resource={customMedia}
            imgClassName="h-9 w-auto max-w-[160px] object-contain rounded-md"
            priority={priority === 'high'}
            loading={loading}
          />
        </div>
        {logoText && (
          <span className="font-semibold text-base sm:text-lg tracking-tight text-foreground">
            {logoText}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      <div className="size-6 rounded-sm bg-foreground text-background flex items-center justify-center font-mono font-semibold text-xs select-none">
        P
      </div>
      <span className="font-medium text-sm sm:text-base tracking-tight text-foreground">
        {logoText || 'Portfolio'}
      </span>
    </div>
  )
}
