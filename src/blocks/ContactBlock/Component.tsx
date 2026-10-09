'use client'

import React, { useState } from 'react'
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { FormBuilderRenderer } from '@/blocks/Form/Component'
import type { Page } from '@/payload-types'

type ContactBlockProps = (Extract<NonNullable<Page['layout']>[number], { blockType: 'contactBlock' }> | {
  badge?: string | null
  title?: string | null
  subtitle?: string | null
  availabilityStatus?: string | null
  responseTime?: string | null
  email?: string | null
  phone?: string | null
  location?: string | null
  scheduleMeetingUrl?: string | null
  scheduleMeetingLabel?: string | null
  servicesList?: Array<{ label: string; id?: string | null }> | null
  socialLinks?: Array<{
    platform: string
    url: string
    id?: string | null
  }> | null
  form?: FormType | string | null
  blockType?: 'contactBlock'
  sectionId?: string | null
}) & {
  id?: string | null
  sectionId?: string | null
}

// Helper to render platform icon
const renderPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase()
  if (p.includes('github')) return <Github className="size-4" />
  if (p.includes('linkedin')) return <Linkedin className="size-4" />
  return <ArrowUpRight className="size-4" />
}

export const ContactBlockComponent: React.FC<ContactBlockProps> = ({
  availabilityStatus,
  badge,
  email,
  form,
  id,
  location,
  phone,
  responseTime,
  scheduleMeetingLabel,
  scheduleMeetingUrl,
  sectionId,
  servicesList,
  socialLinks,
  subtitle,
  title,
}) => {
  const [copied, setCopied] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleCopyEmail = () => {
    if (!email) return
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleServiceClick = (serviceLabel: string) => {
    setSelectedService((prev) => (prev === serviceLabel ? '' : serviceLabel))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate sending with realistic feedback
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Fallback: If user has a mailto client, open pre-filled email
    const subjectLine = selectedService
      ? `[${selectedService}] Project Inquiry from ${formData.name}`
      : formData.subject || `Project Inquiry from ${formData.name}`

    const mailtoUrl = `mailto:${email || 'hello@developer.com'}?subject=${encodeURIComponent(
      subjectLine,
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${selectedService || 'General'}\n\nMessage:\n${formData.message}`,
    )}`

    window.location.href = mailtoUrl

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const services = servicesList && Array.isArray(servicesList) ? servicesList : []
  const socials = socialLinks && Array.isArray(socialLinks) ? socialLinks : []
  const hasMeeting = Boolean(scheduleMeetingUrl && scheduleMeetingUrl.trim())

  return (
    <section
      id={sectionId || id || 'contact'}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-20"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-sm bg-[#EDF3EC] text-[#346538] dark:bg-[rgba(237,243,236,0.1)] dark:text-[#86EFAC] border border-[#346538]/15 dark:border-[#86EFAC]/20 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider">
              <span>{badge}</span>
            </span>
          )}

          {title && (
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.12]">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Two-Column Minimalist Layout */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Direct Connect & Credentials (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Live Status Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:border-foreground/20">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Availability
                </span>
                {responseTime && (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <Clock className="size-3" />
                    <span>{responseTime}</span>
                  </span>
                )}
              </div>

              {availabilityStatus && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#346538] dark:bg-[#86EFAC]" />
                  <p className="text-sm font-semibold text-foreground">
                    {availabilityStatus}
                  </p>
                </div>
              )}
            </div>

            {/* Direct Contact Methods */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3.5 transition-all hover:border-foreground/20">
              <h3 className="text-sm font-bold text-foreground">
                Direct Channels
              </h3>

              {/* Email Box with One-Click Copy */}
              {email && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 rounded-md border border-border bg-muted/30 p-2.5">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-muted text-foreground">
                      <Mail className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Email</div>
                      <a
                        href={`mailto:${email}`}
                        className="truncate block text-xs font-semibold text-foreground hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1 rounded-sm border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-[#346538]" />
                        <span className="text-[#346538] font-semibold text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-muted-foreground" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Phone if provided */}
              {phone && (
                <div className="flex items-center gap-2.5 rounded-md border border-border bg-muted/30 p-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-muted text-foreground">
                    <Phone className="size-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Phone</div>
                    <a
                      href={`tel:${phone}`}
                      className="text-xs font-semibold text-foreground hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="flex items-center gap-2.5 rounded-md border border-border bg-muted/30 p-2.5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-muted text-foreground">
                    <MapPin className="size-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">Location</div>
                    <div className="text-xs font-medium text-foreground">
                      {location}
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Discovery Call CTA */}
              {hasMeeting && (
                <a
                  href={scheduleMeetingUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-transparent p-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Calendar className="size-3.5" />
                  <span>{scheduleMeetingLabel || 'Book a 15-min Discovery Call'}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </div>

            {/* Social Channels */}
            {socials.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:border-foreground/20">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  Online Profiles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {socials.map((social, sIdx) => (
                    <a
                      key={social.id || sIdx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {renderPlatformIcon(social.platform)}
                      <span>{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Form (Custom Form Builder or Default Quick Inquiry) (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:border-foreground/20">
              {form && typeof form === 'object' && 'fields' in form && Array.isArray((form as FormType).fields) ? (
                <div>
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground">
                      {(form as FormType).title || 'Send a Message'}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      Complete the form below and I'll respond directly.
                    </p>
                  </div>
                  <div className="mt-6">
                    <FormBuilderRenderer form={form as FormType} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-border pb-4">
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground">
                      Send a Message
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                      Drop a message and I'll respond directly.
                    </p>
                  </div>

                  {/* Service Type Selection Pills */}
                  {services.length > 0 && (
                    <div className="mt-5">
                      <label className="block text-xs font-medium text-muted-foreground mb-2">
                        Inquiry Topic
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {services.map((svc, svcIdx) => {
                          const isSelected = selectedService === svc.label
                          return (
                            <button
                              key={svc.id || svcIdx}
                              type="button"
                              onClick={() => handleServiceClick(svc.label)}
                              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-foreground text-background'
                                  : 'border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              {svc.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Inquiry Form */}
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1">
                          Your Name <span className="text-muted-foreground">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
                          Your Email <span className="text-muted-foreground">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-medium text-foreground mb-1">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="Project scope or questions"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1">
                        Message <span className="text-muted-foreground">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Tell me about your goals, timeline, or requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-colors resize-y min-h-24"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="size-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isSubmitted && (
                      <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-xs text-foreground">
                        Thank you! Your message inquiry has been drafted to send directly.
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
