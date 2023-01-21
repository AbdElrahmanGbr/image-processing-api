import express, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import sizeOf from 'image-size'
import { Stats } from 'fs'
import imageHelper from '../../helpers/imageHelper'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'

const imagesRouter = express.Router()
const imagesDir = path.resolve(__dirname, '../../../public/assets/')

const checkImageSize = async (
  pathToThumbImage: string,
  width: number,
  height: number
) => {
  try {
    const oldThumb: Stats | null = await fs.stat(pathToThumbImage)
    const size: ISizeCalculationResult | null = oldThumb
      ? sizeOf(pathToThumbImage)
      : null
    return oldThumb && size && size.height === height && size.width === width
  } catch {
    return false
  }
}

imagesRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query['filename']
  const height = req.query['height']
    ? parseInt(req.query['height'] as string, 10)
    : null
  const width = req.query['width']
    ? parseInt(req.query['width'] as string, 10)
    : null

  if (!filename || !width || !height) {
    let errorMessage = ''
    if (!filename) {
      errorMessage += 'The Filename of the Image is missing! '
    }
    if (!width) {
      errorMessage += 'The Width of the Image is missing! '
    }
    if (!height) {
      errorMessage += 'The Height of the Image is missing! '
    }
    res.status(400).send(errorMessage)
    return
  }

  const pathToFullImage = `${imagesDir}/fullImages/${filename}.jpg`
  const pathToThumbImage = `${imagesDir}/thumb/${filename}-${height}x${width}.jpg.jpg`

  try {
    await fs.stat(pathToFullImage)
    const hasRequiredSize = await checkImageSize(
      pathToThumbImage,
      width,
      height
    )

    if (hasRequiredSize) {
      const thumbData = await fs.readFile(pathToThumbImage)
      res.status(200).contentType('jpg').send(thumbData)
    } else {
      const newResizedImage = await imageHelper.imageResizer({
        pathToFullImage,
        pathToThumbImage,
        height,
        width,
      })
      res.status(200).contentType('jpg').send(newResizedImage)
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      res.status(404).send('This Image Does not exist!')
    } else {
      res.status(500).send('Error With Creating the New Resized Image!')
    }
  }
})

export default imagesRouter
