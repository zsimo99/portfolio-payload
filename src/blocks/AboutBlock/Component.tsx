'use client'

import React from 'react'

import type { Media as MediaType, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type AboutBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'aboutBlock' }> | {
  badge?: string | null
  title?: string | null
  paragraphs?: any
  media?: string | MediaType | null
  caption?: string | null
  links?: Array<{
    link: any
    id?: string | null
  }> | null
  blockType?: 'aboutBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

export const AboutBlockComponent: React.FC<AboutBlockProps> = ({
  badge,
  caption,
  id,
  links,
  media,
  paragraphs,
  sectionId,
  title,
}) => {
  const hasMedia = Boolean(media && typeof media === 'object' && 'url' in media)
  const isVideo = typeof media === 'object' && media?.mimeType?.includes('video')

  return (
    <section
      id={sectionId || id || 'about'}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-20"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Image or Video Showcase Frame */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="group overflow-hidden rounded-xl border border-border bg-card p-2 sm:p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20">
                {hasMedia ? (
                  <div className="relative lg:aspect-5/4 w-full overflow-hidden rounded-lg bg-muted">
                    <Media
                      className="h-full w-full overflow-hidden rounded-lg object-cover"
                      imgClassName="h-full w-full object-cover rounded-lg transition-transform duration-500 ease-out hover:scale-[1.01]"
                      videoClassName="h-full w-full object-cover rounded-lg"
                      resource={media}
                    />
                  </div>
                ) : (
                  /* Fallback placeholder state */
                  <div className="aspect-4/5 sm:aspect-square lg:aspect-4/5 flex w-full flex-col items-center justify-center rounded-lg bg-muted/30 p-8 text-center border border-border/50">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground">
                      <svg
                        aria-hidden="true"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-foreground">Visual Asset</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Upload an image or video under Pages &gt; About
                    </p>
                  </div>
                )}
              </div>

              {caption && (
                <p className="mt-2.5 text-center text-xs text-muted-foreground font-mono">
                  {caption}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Eyebrow, Title, Paragraphs, Links */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {badge && (
              <span className="mb-4 inline-flex items-center rounded-sm bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[rgba(225,243,254,0.1)] dark:text-[#7DD3FC] border border-[#1F6C9F]/15 dark:border-[#7DD3FC]/20 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider">
                {badge}
              </span>
            )}

            {title && (
              <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.15]">
                {title}
              </h2>
            )}

            {paragraphs && (
              <div className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-[1.6]">
                <RichText
                  className="prose-p:leading-[1.6] prose-p:text-muted-foreground prose-p:text-base sm:prose-p:text-lg prose-strong:text-foreground prose-headings:text-foreground max-w-none"
                  data={paragraphs}
                  enableGutter={false}
                />
              </div>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {links.map(({ link }, i) => {
                  const appearance = link?.appearance || (i === 0 ? 'default' : 'outline')

                  return (
                    <CMSLink
                      key={link?.id || i}
                      size="default"
                      {...link}
                      appearance={appearance}
                      className="text-center"
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
