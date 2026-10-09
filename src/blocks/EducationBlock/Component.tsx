'use client'

import React, { useState } from 'react'
import {
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import type { Page } from '@/payload-types'

type EducationBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'educationBlock' }> | {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  education?: Array<{
    degree: string
    institution: string
    period: string
    location?: string | null
    grade?: string | null
    description?: string | null
    highlights?: Array<{ item: string; id?: string | null }> | null
    id?: string | null
  }> | null
  certifications?: Array<{
    name: string
    issuer: string
    issueDate: string
    credentialId?: string | null
    credentialUrl?: string | null
    skills?: Array<{ skill: string; id?: string | null }> | null
    id?: string | null
  }> | null
  blockType?: 'educationBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

type TabType = 'all' | 'education' | 'certifications'

export const EducationBlockComponent: React.FC<EducationBlockProps> = ({
  badge,
  certifications,
  education,
  id,
  sectionId,
  subtitle,
  title,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  const educationList = education && Array.isArray(education) ? education : []
  const certList = certifications && Array.isArray(certifications) ? certifications : []

  const showEducation = activeTab === 'all' || activeTab === 'education'
  const showCertifications = activeTab === 'all' || activeTab === 'certifications'

  return (
    <section
      id={sectionId || id || 'education'}
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

        {/* Filter Navigation Tabs */}
        {(educationList.length > 0 || certList.length > 0) && (
          <div className="mt-10 sm:mt-12 flex items-center justify-center">
            <div className="inline-flex rounded-md border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>All</span>
                <span className="font-mono text-[10px]">
                  ({educationList.length + certList.length})
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Degrees</span>
                <span className="font-mono text-[10px]">({educationList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('certifications')}
                className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'certifications'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Award className="size-3.5" />
                <span>Certificates</span>
                <span className="font-mono text-[10px]">({certList.length})</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 sm:mt-16 space-y-14">
          {/* Section 1: Formal Degrees */}
          {showEducation && educationList.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    Formal Education
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Academic qualifications and degrees
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {educationList.map((item, idx) => {
                  const highlights = item.highlights && Array.isArray(item.highlights) ? item.highlights : []

                  return (
                    <article
                      key={item.id || idx}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20"
                    >
                      {/* Top metadata line */}
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2.5">
                          <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#E1F3FE] text-[#1F6C9F] dark:bg-[rgba(225,243,254,0.1)] dark:text-[#7DD3FC] border border-[#1F6C9F]/15 px-2 py-0.5 font-mono text-[10px] font-medium">
                            <Calendar className="size-3" />
                            {item.period}
                          </span>

                          {item.grade && (
                            <span className="inline-flex items-center gap-1 rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                              {item.grade}
                            </span>
                          )}
                        </div>

                        {/* Degree & School */}
                        <h4 className="mt-3 font-serif text-base sm:text-lg font-medium tracking-tight text-foreground">
                          {item.degree}
                        </h4>

                        <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-muted-foreground font-medium">
                          <span className="text-foreground">{item.institution}</span>
                          {item.location && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="size-3" />
                              {item.location}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="mt-3 text-xs sm:text-sm leading-[1.6] text-muted-foreground">
                            {item.description}
                          </p>
                        )}

                        {/* Highlights list */}
                        {highlights.length > 0 && (
                          <div className="mt-4 space-y-1.5 border-t border-border pt-3">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                              Honors
                            </span>
                            <ul className="space-y-1">
                              {highlights.map((h, hIdx) => (
                                <li
                                  key={h.id || hIdx}
                                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                >
                                  <span className="mt-1 size-1.5 rounded-full bg-foreground shrink-0" />
                                  <span>{h.item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {/* Section 2: Certifications */}
          {showCertifications && certList.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-foreground">
                  <Award className="size-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    Licenses & Certifications
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Industry-verified credentials, specialized certifications, and technical mastery
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certList.map((cert, cIdx) => {
                  const skills = cert.skills && Array.isArray(cert.skills) ? cert.skills : []
                  const hasLink = Boolean(cert.credentialUrl && cert.credentialUrl.trim())

                  return (
                    <article
                      key={cert.id || cIdx}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-foreground/20"
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex size-7 items-center justify-center rounded border border-border bg-card text-foreground">
                            <ShieldCheck className="size-3.5" />
                          </div>

                          <span className="rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {cert.issueDate}
                          </span>
                        </div>

                        {/* Cert title and Issuer */}
                        <h4 className="mt-4 font-serif text-base font-medium tracking-tight text-foreground leading-snug transition-colors group-hover:text-foreground">
                          {cert.name}
                        </h4>

                        <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                          {cert.issuer}
                        </p>

                        {/* Credential ID */}
                        {cert.credentialId && (
                          <div className="mt-3 inline-block rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            ID: {cert.credentialId}
                          </div>
                        )}

                        {/* Competency pills */}
                        {skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {skills.map((s, sIdx) => (
                              <span
                                key={s.id || sIdx}
                                className="rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                              >
                                {s.skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Verification Link button if provided */}
                      {hasLink && (
                        <div className="mt-6 pt-4 border-t border-border">
                          <a
                            href={cert.credentialUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
