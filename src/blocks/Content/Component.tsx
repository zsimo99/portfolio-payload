import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<
  ContentBlockProps & { id?: string | null; sectionId?: string | null }
> = (props) => {
  const { columns, id, sectionId } = props

  const colsSpanClasses: Record<string, string> = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  return (
    <section id={sectionId || id || 'content'} className="container max-w-5xl py-8 md:py-12 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-12 items-start">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            const colSize = size || 'oneThird'
            const spanClass = colsSpanClasses[colSize] || 'lg:col-span-4'

            return (
              <div
                className={cn('flex flex-col', spanClass, {
                  'md:col-span-2': colSize === 'full',
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    className="prose-p:leading-relaxed prose-h2:font-serif prose-h2:text-3xl prose-h2:font-normal prose-h2:tracking-tight prose-h3:font-serif prose-h3:text-2xl prose-h3:font-normal"
                    data={richText}
                    enableGutter={false}
                  />
                )}

                {enableLink && (
                  <div className="mt-4">
                    <CMSLink {...link} />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}
