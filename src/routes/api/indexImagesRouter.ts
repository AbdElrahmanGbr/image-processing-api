import express, { Response, Request } from 'express'
import fs from 'fs/promises'
import path from 'path'

const indexImagesRouter = express.Router()

indexImagesRouter.get(
  '/',
  async (_req: Request, res: Response): Promise<void> => {
    const folderPathFullImage = `${path.resolve(
      __dirname,
      '../../../assets/full'
    )}`

    const files: string[] | null = await fs
      .readdir(folderPathFullImage)
      .catch(() => {
        res.status(500).send('Error occurred reading the images')
        return null
      })

    if (!files) {
      return
    }

    let htmlResponse = `
<center>
        <h1>Available images</h1>
    `

    files.forEach((file: string): void => {
      htmlResponse = htmlResponse + `<li>${file}</li>`
    })

    res.status(200).send(`${htmlResponse}</ul></center>`)
  }
)

export default indexImagesRouter
