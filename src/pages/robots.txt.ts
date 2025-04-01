// https://docs.astro.build/en/guides/integrations-guide/sitemap/#usage
import type { APIRoute } from 'astro'

const robotsTxt = `
User-agent: Googlebot
Disallow: /friends*
Disallow: /posts/school-sec*
Allow: /
Crawl-delay: 10

User-agent: Yandex
Disallow: /friends*
Disallow: /posts/school-sec*Allow: /
Crawl-delay: 2

User-agent: archive.org_bot
Disallow: /friends*
Disallow: /posts/school-sec*
Allow: /
Crawl-delay: 2

User-agent: *
Allow: /
Disallow: /friends*
Disallow: /posts/school-sec*
Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}`.trim()

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    })
}
