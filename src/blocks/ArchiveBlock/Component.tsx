import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
    sectionId?: string | null
  }
> = async (props) => {
  const { categories, id, introContent, limit: limitFromProps, populateBy, sectionId, selectedDocs } = props

  const limit = limitFromProps || 6

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <section className="py-8 md:py-12 scroll-mt-20" id={sectionId || id || 'archive'}>
      {introContent && (
        <div className="container mb-8 md:mb-12">
          <div className="max-w-3xl">
            <RichText
              className="prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:font-bold prose-h2:tracking-tight prose-p:text-muted-foreground prose-p:text-lg"
              data={introContent}
              enableGutter={false}
            />
          </div>
        </div>
      )}
      <CollectionArchive posts={posts} />
    </section>
  )
}
