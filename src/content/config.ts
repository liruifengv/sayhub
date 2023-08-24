import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    category: z.string(),
  }),
})

const about = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
})

export const collections = { blog, about }
