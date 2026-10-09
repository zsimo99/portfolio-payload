'use client'

import React from 'react'

import type { Page } from '@/payload-types'

type SkillsBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'skillsBlock' }> | {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  categories?: Array<{
    title: string
    description?: string | null
    skills?: Array<{
      name: string
      proficiency?: ('Expert' | 'Advanced' | 'Intermediate' | 'Familiar') | null
      id?: string | null
    }> | null
    id?: string | null
  }> | null
  blockType?: 'skillsBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

// Maps proficiency levels to progress bar percentages & tag colors (Muted Pastels)
const proficiencyConfig: Record<
  string,
  { percentage: number; label: string; badgeClass: string }
> = {
  Expert: {
    percentage: 95,
    label: 'Expert',
    badgeClass:
      'bg-[#EDF3EC] text-[#346538] dark:bg-[rgba(237,243,236,0.1)] dark:text-[#86EFAC] border border-[#346538]/15',
  },
  Advanced: {
    percentage: 80,
    label: 'Advanced',
    badgeClass:
      'bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[rgba(225,243,254,0.1)] dark:text-[#7DD3FC] border border-[#1F6C9F]/15',
  },
  Intermediate: {
    percentage: 60,
    label: 'Intermediate',
    badgeClass:
      'bg-[#FBF3DB] text-[#956400] dark:bg-[rgba(251,243,219,0.1)] dark:text-[#FDE047] border border-[#956400]/15',
  },
  Familiar: {
    percentage: 40,
    label: 'Familiar',
    badgeClass:
      'bg-[#FDEBEC] text-[#9F2F2D] dark:bg-[rgba(253,235,236,0.1)] dark:text-[#FCA5A5] border border-[#9F2F2D]/15',
  },
}

export const SkillsBlockComponent: React.FC<SkillsBlockProps> = ({
  badge,
  categories,
  id,
  sectionId,
  subtitle,
  title,
}) => {
  const categoriesList = categories && Array.isArray(categories) ? categories : []

  return (
    <section
      id={sectionId || id || 'skills'}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-20"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
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

          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categories Bento Grid */}
        {categoriesList.length > 0 && (
          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoriesList.map((cat, i) => {
              const skills = cat.skills && Array.isArray(cat.skills) ? cat.skills : []

              return (
                <div
                  key={cat.id || i}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20"
                >
                  <div>
                    {/* Category Title */}
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground transition-colors">
                      {cat.title}
                    </h3>

                    {/* Category Description */}
                    {cat.description && (
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-[1.6]">
                        {cat.description}
                      </p>
                    )}

                    {/* Skills with Minimalist Progress Bars */}
                    <div className="mt-6 space-y-4">
                      {skills.map((skill, sIdx) => {
                        const prof = skill.proficiency || 'Advanced'
                        const config = proficiencyConfig[prof] || proficiencyConfig.Advanced

                        return (
                          <div key={skill.id || sIdx} className="flex flex-col gap-1.5">
                            {/* Skill Label & Level */}
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-foreground">
                                {skill.name}
                              </span>
                              <span
                                className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wider uppercase ${config.badgeClass}`}
                              >
                                {config.label}
                              </span>
                            </div>

                            {/* Utilitarian Monochrome Progress Bar */}
                            <div
                              role="progressbar"
                              aria-valuenow={config.percentage}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${skill.name} proficiency: ${config.label}`}
                              className="h-1 w-full overflow-hidden rounded-full bg-muted"
                            >
                              <div
                                style={{ width: `${config.percentage}%` }}
                                className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Skills count footer */}
                  <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span className="text-[11px]">{skills.length} core competencies</span>
                    <span className="text-[10px] tracking-wider uppercase">ACTIVE USE</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
