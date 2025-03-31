import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import { SITE } from './src/config.ts'
import { remarkReadingTime } from './src/support/plugins.ts'
import { uploadAssetsToS3 } from './src/support/uploader.ts'

export default defineConfig({
    site: SITE.url,
    image: {
        // If you don't want to optimize images during the BUILD process please set the ASTRO_IMAGE_OPTIMIZE environment variable to false
        // Please note that the environment value here is `string` type on Cloudflare Pages,
        // So please delete the environment variable directly if you want to disable the image optimization service
        service: (!!import.meta.env.ASTRO_IMAGE_OPTIMIZE || !!process.env.ASTRO_IMAGE_OPTIMIZE) ? sharpImageService() : passthroughImageService(),
    },
    integrations: [
        partytown(),
        mdx(),
        sitemap(),
        tailwind(),
        react(),
        (await import('@playform/compress')).default({
            CSS: true,
            HTML: true,
            Image: false,
            JavaScript: true,
            SVG: true,
            Logger: 2,
        }),
        uploadAssetsToS3(),
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            theme: 'github-light',
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            wrap: false,
        },
    },
    devToolbar: {
        enabled: false,
    },
    prefetch: true,
    output: 'static',
    build: {
        // Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
        // see https://docs.astro.build/en/reference/configuration-reference/#buildassets
        assets: 'assets',
        // see https://docs.astro.build/en/reference/configuration-reference/#buildassetsprefix
        assetsPrefix: (!!import.meta.env.S3_ENABLE || !!process.env.S3_ENABLE) ? 'https://images.godruoyi.com/gblog' : '',
    },
})
