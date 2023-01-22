import path from 'path'
import imageHelper from '../../helpers/imageHelper'

const pathToFullImage = path.resolve(
  __dirname,
  '../../../assets/full/fjord.jpg'
)
const pathToThumbImage = path.resolve(
  __dirname,
  '../../../assets/thumb/fjord.jpg'
)

describe('The imageResizer function', (): void => {
  it('returns a buffer after successfully resizing an image', async () => {
    const imageBuffer: Buffer = await imageHelper.imageResizer({
      height: 100,
      width: 150,
      pathToFullImage,
      pathToThumbImage,
    })
    expect(imageBuffer).toBeInstanceOf(Buffer)
  })

  it('rejects promise if something went wrong', async (): Promise<void> => {
    await expectAsync(
      imageHelper.imageResizer({
        height: 100,
        width: 150,
        pathToFullImage: '',
        pathToThumbImage,
      })
    ).toBeRejected()
  })
})
