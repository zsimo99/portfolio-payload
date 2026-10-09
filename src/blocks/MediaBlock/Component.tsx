import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  sectionId?: string | null
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    disableInnerContainer,
    enableGutter = true,
    id,
    imgClassName,
    media,
    sectionId,
    staticImage,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <figure
      id={sectionId || id || 'media'}
      className={cn(
        'mx-auto w-full scroll-mt-20',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <div className="overflow-hidden rounded-xl border border-border bg-card p-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200">
          <Media
            className="w-full overflow-hidden rounded-lg"
            imgClassName={cn('w-full h-auto object-cover rounded-lg', imgClassName)}
            resource={media}
            src={staticImage}
          />
        </div>
      )}
      {caption && (
        <figcaption
          className={cn(
            'mt-3 text-center font-mono text-xs text-muted-foreground',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </figcaption>
      )}
    </figure>
  )
}
