import path from 'path'
import imageHelper from './imageHelper'

const getPath = (filename: string) => {
  return {
    pathToFullImage: path.resolve(
      __dirname,
      `../../public/assets/fullImages/${filename}.jpg`
    ),
    pathToThumbImage: path.resolve(
      __dirname,
      `../../public/assets/thumb/${filename}.jpg`
    ),
  }
}

describe('ImageResizer Function', (): void => {
  const testCases = [
    {
      filename: 'fjord',
      width: 200,
      height: 200,
    },
    {
      filename: 'santamonica',
      width: 300,
      height: 300,
    },
  ]
  testCases.forEach(({ filename, width, height }) => {
    it(`Resizes the image ${filename} successfully`, async () => {
      const { pathToFullImage, pathToThumbImage } = getPath(filename)
      const imageBuffer: Buffer = await imageHelper.imageResizer({
        height,
        width,
        pathToFullImage,
        pathToThumbImage,
      })
      expect(Buffer.isBuffer(imageBuffer)).toBe(true)
    })

    it(`Rejects promise if something went wrong with ${filename}`, async (): Promise<void> => {
      const { pathToThumbImage } = getPath(filename)
      await expectAsync(
        imageHelper.imageResizer({
          height,
          width,
          pathToFullImage: '',
          pathToThumbImage,
        })
      ).toBeRejected()
    })
  })
})
