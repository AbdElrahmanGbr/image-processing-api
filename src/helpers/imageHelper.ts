import fs from 'fs/promises'
import sharp from 'sharp'

interface ResizedImageProps {
  width: number
  height: number
  pathToFullImage: string
  pathToThumbImage: string
}

const imageResizer = async ({
  pathToFullImage,
  pathToThumbImage,
  height,
  width,
}: ResizedImageProps): Promise<Buffer> => {
  try {
    const data: Buffer | null = await fs.readFile(pathToFullImage)
    const imageBuffer: Buffer | null = await sharp(data)
      .resize(width, height)
      .toBuffer()
    await fs.writeFile(pathToThumbImage, imageBuffer)
    return imageBuffer
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export default { imageResizer }
