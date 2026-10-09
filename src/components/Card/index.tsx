'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-foreground/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      {metaImage && typeof metaImage !== 'string' ? (
        <div className="relative aspect-16/10 w-full overflow-hidden bg-muted/30 border-b border-border">
          <Media
            className="h-full w-full"
            imgClassName="h-full w-full object-cover grayscale-[20%] contrast-[0.98] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
            resource={metaImage}
            size="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-16/10 w-full bg-muted/20 border-b border-border" />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {showCategories && hasCategories && (
          <div className="mb-3 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const categoryTitle = category?.title || 'General'
                return (
                  <span
                    className="inline-block rounded px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight bg-secondary text-secondary-foreground"
                    key={index}
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="font-serif text-lg sm:text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
            <Link href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {sanitizedDescription && (
          <p className="mt-2.5 line-clamp-2 text-sm text-muted-foreground leading-relaxed font-sans">
            {sanitizedDescription}
          </p>
        )}
      </div>
    </article>
  )
}
