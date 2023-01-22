import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import imageHelper from '../../helpers/imageHelper'
import { Stats } from 'fs'

const imageRouter = express.Router()

imageRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query['filename']
  const height = req.query['height']
    ? parseInt(req.query['height'] as string, 10)
    : null
  const width = req.query['width']
    ? parseInt(req.query['width'] as string, 10)
    : null

  // check if the query is correct
  if (!filename || !height || !width) {
    res
      .status(400)
      .send(
        'Please make sure url contains correct filename, height and width params'
      )
    return
  }

  // get the full path from the filename
  const pathToFullImage = `${path.resolve(
    __dirname,
    `../../../public/assets/fullImages/${filename}.jpg`
  )}`

  // thumb path in the ${filename}-${height}x${width} format to save different dimensions
  const pathToThumbImage = `${path.resolve(
    __dirname,
    `../../../public/assets/thumb/${filename}-${height}x${width}.jpg`
  )}`

  // Check if filename exists in full folder
  const fullImage: Stats | null = await fs.stat(pathToFullImage).catch(() => {
    res.status(404).send('Image does not exist')
    return null
  })

  if (!fullImage) {
    return
  }

  // Check if thumb was already created
  const existingThumb: Stats | null = await fs
    .stat(pathToThumbImage)
    .catch(() => {
      return null
    })

  if (existingThumb) {
    fs.readFile(pathToThumbImage)
      .then((thumbData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbData)
      })
      .catch(() => {
        res.status(500).send('Error occurred processing the image')
      })
  } else {
    // resize image
    imageHelper
      .imageResizer({
        pathToFullImage,
        pathToThumbImage,
        height,
        width,
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage)
      })
      .catch(() => {
        res.status(500).send('Error occurred processing the image')
      })
  }
})

export default imageRouter
