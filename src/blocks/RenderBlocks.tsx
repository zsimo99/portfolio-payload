import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutBlockComponent } from '@/blocks/AboutBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContactBlockComponent } from '@/blocks/ContactBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { EducationBlockComponent } from '@/blocks/EducationBlock/Component'
import { ExperienceBlockComponent } from '@/blocks/ExperienceBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProjectsBlockComponent } from '@/blocks/ProjectsBlock/Component'
import { SkillsBlockComponent } from '@/blocks/SkillsBlock/Component'

const blockComponents = {
  aboutBlock: AboutBlockComponent,
  archive: ArchiveBlock,
  contactBlock: ContactBlockComponent,
  content: ContentBlock,
  cta: CallToActionBlock,
  educationBlock: EducationBlockComponent,
  experienceBlock: ExperienceBlockComponent,
  formBlock: FormBlock,
  heroBlock: HeroBlockComponent,
  mediaBlock: MediaBlock,
  projectsBlock: ProjectsBlockComponent,
  skillsBlock: SkillsBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType] as React.ComponentType<any>

            if (Block) {
              const rawSectionId =
                'sectionId' in block && typeof block.sectionId === 'string' && block.sectionId.trim()
                  ? block.sectionId.trim()
                  : undefined

              return (
                <div key={index}>
                  <Block
                    {...block}
                    disableInnerContainer
                    id={rawSectionId || undefined}
                    sectionId={rawSectionId || undefined}
                  />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
