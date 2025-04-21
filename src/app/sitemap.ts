import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://food-journal.khaodoes.dev/',
      lastModified: new Date(),
      priority: 1,
    },
  ]
}