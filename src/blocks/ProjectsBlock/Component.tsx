'use client'

import React, { useMemo, useRef, useState } from 'react'

import type { Media as MediaType, Page } from '@/payload-types'
import { Media } from '@/components/Media'

import { ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type ProjectsBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'projectsBlock' }> | {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  projects?: Array<{
    title: string
    category: string
    description: string
    image?: string | MediaType | null
    technologies?: Array<{ name: string; id?: string | null }> | null
    demoUrl?: string | null
    githubUrl?: string | null
    id?: string | null
  }> | null
  blockType?: 'projectsBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

// GitHub icon SVG component
const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

export const ProjectsBlockComponent: React.FC<ProjectsBlockProps> = ({
  badge,
  id,
  projects,
  sectionId,
  subtitle,
  title,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const pinWrapperRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const projectsList = projects && Array.isArray(projects) ? projects : []

  // Extract unique categories from projects list
  const categories = useMemo(() => {
    const set = new Set<string>()
    projectsList.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim())
      }
    })
    return ['All', ...Array.from(set)]
  }, [projectsList])

  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsList
    return projectsList.filter(
      (p) => p.category?.trim().toLowerCase() === activeCategory.toLowerCase(),
    )
  }, [projectsList, activeCategory])

  // GSAP horizontal scroll setup with ScrollTrigger
  useGSAP(
    () => {
      const track = trackRef.current
      const pinWrapper = pinWrapperRef.current

      if (!track || !pinWrapper) return

      // Reset transform when category changes
      gsap.set(track, { clearProps: 'all' })

      // If only 1 project or none, do NOT pin or scroll horizontally
      if (filteredProjects.length <= 1) {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === pinWrapper) t.kill(true)
        })
        ScrollTrigger.refresh()
        return
      }

      const totalPanels = filteredProjects.length
      // Move exactly to the last slide
      const targetPercent = -((totalPanels - 1) / totalPanels) * 100

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'projects-pin',
          trigger: pinWrapper,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalPanels - 1)}`,
          invalidateOnRefresh: true,
        },
      })

      // Initial delay on first slide
      tl.to({}, { duration: 0.15 })
      tl.to(track, {
        xPercent: targetPercent,
        ease: 'none',
        duration: 1,
      })

      // Timeout ensures Next.js/React finishes re-rendering DOM nodes before recalculating pins
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)

      return () => {
        clearTimeout(timer)
        tl.scrollTrigger?.kill(true)
        tl.kill()
        ScrollTrigger.getById('projects-pin')?.kill(true)
        gsap.set(track, { clearProps: 'all' })
      }
    },
    { dependencies: [filteredProjects.length, activeCategory], scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id={sectionId || id || 'projects'}
      className="relative overflow-hidden scroll-mt-0"
    >
      {/* Horizontal Scroll Fullscreen Pinned Area */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Top Header Bar inside pinned viewport */}
        <div className="w-full pt-8 sm:pt-10 pb-4 px-6 sm:px-12 z-20 shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {badge && (
                <span className="mb-2 inline-flex items-center rounded-sm bg-[#EDF3EC] text-[#346538] dark:bg-[rgba(237,243,236,0.1)] dark:text-[#86EFAC] border border-[#346538]/15 dark:border-[#86EFAC]/20 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider">
                  {badge}
                </span>
              )}

              {title && (
                <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
                  {title}
                </h2>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground sm:text-base max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Filter Chips Bar */}
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
                {categories.map((category) => {
                  const isActive = activeCategory === category

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border bg-card/60 backdrop-blur-xs text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Scroll Track - Full Viewport Width & Height per Project */}
        <div
          ref={trackRef}
          className={`flex flex-1 flex-nowrap items-stretch h-full overflow-x-auto md:overflow-x-visible scrollbar-none ${
            filteredProjects.length > 1 ? 'w-max' : 'w-full'
          }`}
        >
          {filteredProjects.map((project, index) => {
            const hasImage = Boolean(project.image && typeof project.image === 'object' && 'url' in project.image)
            const techList = project.technologies && Array.isArray(project.technologies) ? project.technologies : []
            const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim())
            const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim())
            const hasActions = hasDemo || hasGithub

            return (
              <div
                key={project.id || index}
                className="w-screen h-full shrink-0 flex items-center justify-center p-4 sm:p-8 lg:p-12 box-border"
              >
                <article className="group relative w-full max-w-6xl h-full max-h-[calc(100vh-170px)] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-all duration-300">
                  {/* Image Showcase Column */}
                  <div className="relative w-full md:w-3/5 h-64 md:h-full bg-muted border-b md:border-b-0 md:border-r border-border overflow-hidden">
                    {hasImage ? (
                      <Media
                        className="h-full w-full overflow-hidden"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        resource={project.image}
                      />
                    ) : (
                      /* Minimalist placeholder */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-muted/30 p-8 text-center">
                        <div className="flex size-14 items-center justify-center rounded-xl border border-border bg-card text-foreground">
                          <svg
                            aria-hidden="true"
                            className="size-7"
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
                        <span className="mt-3 text-xs font-mono text-muted-foreground">project.preview</span>
                      </div>
                    )}

                    {/* Category Pill Tag Overlay */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-sm bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[rgba(225,243,254,0.12)] dark:text-[#7DD3FC] border border-[#1F6C9F]/15 dark:border-[#7DD3FC]/25 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Slide counter indicator */}
                    <div className="absolute right-4 bottom-4">
                      <span className="rounded-md bg-background/80 backdrop-blur-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Project Details Column */}
                  <div className="w-full md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                        <span>PROJECT 0{index + 1}</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground leading-[1.2]">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-[1.7]">
                        {project.description}
                      </p>

                      {/* Technology Pills */}
                      {techList.length > 0 && (
                        <div className="mt-6">
                          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2.5">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {techList.map((tech, tIdx) => (
                              <span
                                key={tech.id || tIdx}
                                className="inline-block rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs text-foreground/80"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Links */}
                    {hasActions && (
                      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3">
                        {hasDemo && (
                          <a
                            href={project.demoUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.98]"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="size-3.5" />
                          </a>
                        )}

                        {hasGithub && (
                          <a
                            href={project.githubUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors active:scale-[0.98]"
                          >
                            <GitHubIcon className="size-3.5" />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
