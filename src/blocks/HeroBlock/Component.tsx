'use client'

import React from 'react'

import type { Media as MediaType, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RotatingText } from './RotatingText'

type HeroBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'heroBlock' }> | {
  title?: string | null
  rotatingWords?: Array<{ text: string; id?: string | null }> | null
  subtitle?: string | null
  image?: string | MediaType | null
  backgroundImage?: string | MediaType | null
  links?: Array<{
    link: any
    id?: string | null
  }> | null
  blockType?: 'heroBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  backgroundImage,
  id,
  image,
  links,
  rotatingWords,
  sectionId,
  subtitle,
  title = 'Crafting Digital Experiences as a',
}) => {
  const wordsList =
    Array.isArray(rotatingWords) && rotatingWords.length > 0
      ? rotatingWords.map((item) => item.text).filter(Boolean)
      : ['Full-Stack Developer', 'UI/UX Designer', 'Creative Technologist']

  const hasImage = Boolean(image && typeof image === 'object' && 'url' in image)
  const hasBg = Boolean(backgroundImage && typeof backgroundImage === 'object' && 'url' in backgroundImage)

  // Default fallback links if none configured yet
  const actionLinks = Array.isArray(links) && links.length > 0 ? links : [
    {
      link: {
        type: 'custom',
        url: '/posts',
        label: 'View Work',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        url: '/contact',
        label: 'Get in Touch',
        appearance: 'outline',
      },
    },
  ]

  return (
    <section
      id={sectionId || id || 'hero'}
      className="relative isolate flex w-full items-center justify-center overflow-hidden py-20 sm:py-28 lg:py-36 scroll-mt-20"
    >
      {/* 1. Backdrop Layer: Full-bleed background image if configured */}
      {hasBg ? (
        <div className="absolute inset-0 -z-20 h-full w-full">
          <Media
            className="h-full w-full"
            fill
            imgClassName="h-full w-full object-cover object-center"
            priority
            resource={backgroundImage}
          />
        </div>
      ) : null}

      {/* 2. Optical Contrast & Subtle Warm Ambient Spot */}
      {hasBg ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-background/85 backdrop-blur-[2px] transition-colors"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-96 w-96 rounded-full bg-foreground/3 blur-3xl"
        />
      )}

      {/* 3. Main Grid Layout */}
      <div className="container max-w-5xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Semantic Hierarchy, Typography, Action Buttons */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Headline with editorial contrast */}
            <h1 className="text-3xl font-medium tracking-[-0.035em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12]">
              {title}{' '}
              <span className="font-serif italic font-normal text-foreground">
                <RotatingText
                  className="text-foreground"
                  intervalMs={3000}
                  words={wordsList}
                />
              </span>
            </h1>

            {/* Subtitle - limited line length (< 65ch) for readability */}
            {subtitle && (
              <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-[1.6]">
                {subtitle}
              </p>
            )}

            {/* CTA Group with tactile buttons */}
            {actionLinks.length > 0 && (
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                {actionLinks.map(({ link }, i) => {
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

          {/* Right Column: Featured Visual Frame with Faux-OS Chrome (Desktop/Large screens only) */}
          <div className="hidden lg:flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Bento Card with Faux-OS window chrome */}
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20">
                {/* Window top bar */}
                <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3.5 py-2.5">
                  <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                    workspace.preview
                  </span>
                </div>

                <div className="p-2 sm:p-2.5">
                  {hasImage ? (
                    <Media
                      className="aspect-5/4 w-full overflow-hidden rounded-lg object-cover bg-muted"
                      imgClassName="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out hover:scale-[1.01]"
                      priority
                      resource={image}
                    />
                  ) : (
                    <div className="aspect-5/4 flex w-full flex-col items-center justify-center rounded-lg bg-muted/30 p-8 text-center border border-border/50">
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
                      <p className="text-xs font-semibold text-foreground">Featured Project Visual</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Selected Architecture &amp; Case Studies
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
