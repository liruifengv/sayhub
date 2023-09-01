import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '../config'
import { getCollection } from 'astro:content'

export const GET = async () => {
  const blog = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      image: post.data.image,
      tags: post.data.tags,
      link: `/blog/${post.slug}/`,
    })),
  })
}
