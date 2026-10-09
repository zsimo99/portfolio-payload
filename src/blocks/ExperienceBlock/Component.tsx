'use client'

import React from 'react'

import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'

type ExperienceBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'experienceBlock' }> | {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  items?: Array<{
    role: string
    company: string
    period: string
    location?: string | null
    description?: any
    technologies?: Array<{ name: string; id?: string | null }> | null
    id?: string | null
  }> | null
  blockType?: 'experienceBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

export const ExperienceBlockComponent: React.FC<ExperienceBlockProps> = ({
  badge,
  id,
  items,
  sectionId,
  subtitle,
  title,
}) => {
  const timelineItems = items && Array.isArray(items) ? items : []

  return (
    <section
      id={sectionId || id || 'experience'}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-20"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <span className="mb-4 inline-flex items-center rounded-sm bg-[#FBF3DB] text-[#956400] dark:bg-[rgba(251,243,219,0.1)] dark:text-[#FDE047] border border-[#956400]/15 dark:border-[#FDE047]/20 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider">
              {badge}
            </span>
          )}

          {title && (
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.15]">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Timeline Container */}
        {timelineItems.length > 0 && (
          <div className="relative mt-16 sm:mt-20">
            {/* Center Vertical Timeline Rule */}
            <div
              aria-hidden="true"
              className="absolute left-6 top-0 bottom-0 w-px -translate-x-1/2 bg-border md:left-1/2"
            />

            <div className="space-y-10 md:space-y-14">
              {timelineItems.map((item, index) => {
                const isLeft = index % 2 === 0
                const techList = item.technologies && Array.isArray(item.technologies) ? item.technologies : []

                return (
                  <div
                    key={item.id || index}
                    className="relative flex flex-col md:flex-row md:items-center"
                  >
                    {/* Horizontal Connector Line from Card to Timeline Dot */}
                    <div
                      aria-hidden="true"
                      className="absolute left-6 top-6 h-px w-8 bg-border md:hidden"
                    />

                    {isLeft ? (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute right-1/2 top-1/2 h-px w-10 bg-border"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="hidden md:block absolute left-1/2 top-1/2 h-px w-10 bg-border"
                      />
                    )}

                    {/* Center Node Dot */}
                    <div
                      aria-hidden="true"
                      className="absolute left-6 top-6 z-10 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:left-1/2 md:top-1/2"
                    >
                      <span className="size-2 rounded-full bg-foreground border border-background ring-1 ring-border" />
                    </div>

                    {/* Timeline Item Content Card */}
                    <div
                      className={`w-full pl-14 md:w-1/2 md:pl-0 ${
                        isLeft
                          ? 'md:pr-10 md:text-right'
                          : 'md:ml-auto md:pl-10 md:text-left'
                      }`}
                    >
                      <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20">
                        {/* Period & Location Eyebrow */}
                        <div
                          className={`flex flex-wrap items-center gap-2 text-xs font-medium ${
                            isLeft ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span className="rounded-sm bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[rgba(225,243,254,0.1)] dark:text-[#7DD3FC] border border-[#1F6C9F]/15 px-2 py-0.5 font-mono text-[10px] font-medium">
                            {item.period}
                          </span>
                          {item.location && (
                            <span className="text-muted-foreground text-xs">• {item.location}</span>
                          )}
                        </div>

                        {/* Role & Company */}
                        <h3 className="mt-3 font-serif text-lg font-medium tracking-tight text-foreground transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
                          {item.company}
                        </p>

                        {/* RichText Description */}
                        {item.description && (
                          <div
                            className={`mt-4 text-sm text-muted-foreground leading-[1.6] ${
                              isLeft ? 'md:text-right' : 'md:text-left'
                            }`}
                          >
                            <RichText
                              className="prose-p:text-sm prose-p:leading-[1.6] prose-p:text-muted-foreground max-w-none"
                              data={item.description}
                              enableGutter={false}
                            />
                          </div>
                        )}

                        {/* Technology Tag Pills */}
                        {techList.length > 0 && (
                          <div
                            className={`mt-5 flex flex-wrap gap-1.5 ${
                              isLeft ? 'md:justify-end' : 'md:justify-start'
                            }`}
                          >
                            {techList.map((tech, tIdx) => (
                              <span
                                key={tech.id || tIdx}
                                className="inline-block rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
