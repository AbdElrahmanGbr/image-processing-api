import express from 'express'
import logger from '../../helpers/logger'
import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'

const imagesRouter = express.Router()
imagesRouter.use(logger)

imagesRouter.get('/', async (req, res) => {
  const filename = req.query.filename
  const width = req.query.width ? parseInt(req.query.width as string, 10) : null
  const height = req.query.height
    ? parseInt(req.query.height as string, 10)
    : null

  // Running Validation On The Query
  if (!filename) {
    res.status(400).send('The Filename of the Image is missing!')
    return
  } else if (!width) {
    res.status(400).send('The Width of the Image is missing!')
  } else if (!height) {
    res.status(400).send('The Height of the Image is missing!')
  }

  // Declaring path's for full/thumb images
  const pathToFullImage = `${path.resolve(
    __dirname,
    `../../../public/assets/fullImages/${filename}.jpg`
  )}`

  const pathToThumbImage = `${path.resolve(
    __dirname,
    `../../../public/assets/thumb/${filename}.jpg`
  )}`

  await fs.stat(pathToFullImage).catch((e) => res.status(404).send(e)) // Checking for existence
  await fs.stat(pathToThumbImage).catch((e) => res.status(404).send(e)) // Checking for existence
  const data = await fs.readFile(pathToFullImage)

  // Resizing the Image
  sharp(data)
    .resize(width, height)
    .toFile(pathToThumbImage, async () => {
      await fs.stat(pathToThumbImage).catch((e) => res.status(500).send(e))
      const thumbData = await fs.readFile(pathToThumbImage)

      // Adding Headers
      res.status(200).contentType('jpg').send(thumbData)
    })
})

export default imagesRouter
