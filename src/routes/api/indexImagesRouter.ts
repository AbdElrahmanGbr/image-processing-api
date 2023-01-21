import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'

const indexImagesRouter = express.Router()
indexImagesRouter.get(
  '/',
  async (_req: Request, res: Response): Promise<void> => {
    const pathToFullImage = `${path.resolve(
      __dirname,
      '../../../public/assets/fullImages'
    )}`
    const images: string[] | null = await fs
      .readdir(pathToFullImage)
      .catch(() => {
        res.status(500).send('Error occurred while reading Full Images')
        return null
      })
    if (!images) {
      return
    }

    let printOnHTML = `
    <center>
    <h1>All images</h1>
    <strong>All Images found in /api/images</strong>
    <ul>
`
    images.forEach((image: string): void => {
      printOnHTML =
        printOnHTML + `<li style="list-style-type: none">${image}</li>`
    })
    res.status(200).send(`${printOnHTML}</ul></center>`)
  }
)

export default indexImagesRouter
