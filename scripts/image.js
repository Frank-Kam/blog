/**
 * Convert all images to avif format that under the src/images/banner and src/images/posts directory
 * And then upload to the R2 bucket.
 *
 * This script will also update the final image path in the markdown files.
 *
 * usage: node scripts/image.js [--force]
 *
 * Also see the global variables in the script.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { Operator } from 'opendal'

const CDN = 'https://images.godruoyi.com'
const NewFormat = '.avif'
const imageDir = ['src/images/banners', 'src/images/posts'].map(dir =>
    path.join(process.cwd(), dir),
)
const contentDir = path.join(process.cwd(), 'src/content/posts')
const force = process.argv.includes('--force')

// see https://docs.rs/opendal/latest/opendal/services/struct.S3.html#configuration
const s3Options = {
    access_key_id: process.env.S3_ACCESS_KEY,
    secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    endpoint: process.env.S3_ENDPOINT,
    root: 'gblog',
    region: 'auto',
    // sometimes OpenDAL will load the config from the ~/.aws/credentials file, set this to true to disable it.
    disable_config_load: 'true',
}

class Imager {
    operator = null

    images = []

    newImages = []

    async run() {
        await this.init()
        await this.excludeExistsImages()

        const images = await this.processAndUploadImages()
        await this.updateMarkdown(images)

        console.log('\n\n\n')
        console.log('All images have been processed and uploaded 🎉.')
    }

    async processAndUploadImages() {
        const images = []

        for (const image of this.newImages) {
            const buffer = await this.compressAndFormatImage(image)
            if (!buffer) {
                continue
            }

            const newPath = await this.uploadImage(image, buffer)
            if (newPath) {
                images.push({
                    old: image,
                    new: newPath,
                })
            }
        }

        return images
    }

    async updateMarkdown(images) {
        const files = await this.loadFiles(contentDir)

        for (const file of files) {
            const content = await fs.readFile(file, 'utf-8')
            let newContent = content

            for (const img of images) {
                // replace @images/banners/x.jpg to ${CDN}/images/banners/x.avif
                const oldImg = img.old.replace(/.*\/images\//, '@images/')
                const newImg = [CDN, s3Options.root, img.new].join('/')
                newContent = newContent.replace(new RegExp(oldImg, 'g'), newImg)
            }

            if (content !== newContent) {
                console.log('update markdown file:', file)
                await fs.writeFile(file, newContent)
            }
        }
    }

    async uploadImage(image, buffer) {
        const outputFilename = this.normalizeNewImagePath(image)

        try {
            await this.operator.write(outputFilename, buffer)

            console.log(`successfully uploaded image ${outputFilename}`)

            return outputFilename
        } catch (error) {
            console.error(`failed to upload image ${outputFilename}:`, error)
        }
    }

    async compressAndFormatImage(image) {
        const sharp = (await import('sharp')).default

        try {
            return await sharp(image).resize(1500, 750, {
                fit: 'cover',
                position: 'center',
            }).avif({
                quality: 80,
                effort: 4,
            }).toBuffer({ resolveWithObject: false })
        } catch (error) {
            console.error(`failed to compress and format image ${image}:`, error)
        }
    }

    /**
     * Exclude the images that already exists in the s3 bucket
     *
     * Exclusion is based on the file Avif format, that is, if the file name is `xxx.jpg`, then we will check if the `xxx.avif` exists in the s3 bucket.
     *
     * @returns {Promise<void>}
     */
    async excludeExistsImages() {
        if (force) {
            this.newImages = this.images
            return
        }

        for (const img of this.images) {
            const file = img.replace(/.*\/images\//, 'images/').replace(/\.\w+$/, NewFormat)

            const exists = await this.operator.isExist(file)

            console.log('Checking file exists:', file, exists)
            if (!exists) {
                this.newImages.push(img)
            }
        }
    }

    normalizeNewImagePath(path) {
        return path.replace(/.*\/images\//, 'images/').replace(/\.\w+$/, NewFormat)
    }

    async prepareLocalImages() {
        return (await Promise.all(imageDir.map(dir => this.loadFiles(dir)))).flat()
    }

    async loadFiles(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true })

        return entries.reduce(async (promise, dirent) => {
            const acc = await promise
            if (dirent.isDirectory()) {
                const subFiles = await this.loadFiles(`${dir}/${dirent.name}`)
                return [...acc, ...subFiles]
            } else if (dirent.isFile() && dirent.name.startsWith('.')) {
                return acc
            }

            return [...acc, path.join(dir, dirent.name)]
        }, Promise.resolve([]))
    }

    async init() {
        this.operator = new Operator('s3', s3Options)
        await this.operator.check()

        this.images = await this.prepareLocalImages(imageDir)
    }
}

const image = new Imager()
await image.run()
