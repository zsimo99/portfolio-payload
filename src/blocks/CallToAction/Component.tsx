import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<
  CTABlockProps & { id?: string | null; sectionId?: string | null }
> = ({
  id,
  links,
  richText,
  sectionId,
}) => {
  return (
    <section id={sectionId || id || 'cta'} className="container max-w-5xl scroll-mt-20 my-16">
      <div className="overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-10 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            {richText && (
              <RichText
                className="prose-h2:font-serif prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-normal prose-h2:tracking-tight prose-p:text-base prose-p:text-muted-foreground prose-p:leading-relaxed mb-0"
                data={richText}
                enableGutter={false}
              />
            )}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              {links.map(({ link }, i) => {
                const appearance = link?.appearance || (i === 0 ? 'default' : 'outline')
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    {...link}
                    appearance={appearance}
                    className="min-w-32 text-center"
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
