import request from 'supertest'
import app from '../../index'
import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

describe('GET /api/images', () => {
  const buildUrl = (
    filename: string,
    height: number,
    width: number | undefined
  ) => `/api/images?filename=${filename}&height=${height}&width=${width}`
  const filePath = (filename: string, height: number, width: number) =>
    path.resolve(
      __dirname,
      `../../../public/assets/thumb/${filename}-${height}x${width}.jpg`
    )

  it('returns with response 400 if called with no props', async () => {
    const response = await request(app).get('/api/images')
    expect(response.status).toEqual(400)
  })

  it('returns with response 400 if called with a missing prop', async () => {
    // @ts-ignore
    const response = await request(app).get(buildUrl('lorem', 200))
    expect(response.status).toEqual(400)
  })

  it('returns with response 404 if called correctly but image does not exist', async () => {
    const response = await request(app).get(buildUrl('test', 100, 100))
    expect(response.status).toEqual(404)
  })

  it('returns with response if called correctly and image exist', async () => {
    const response = await request(app).get(buildUrl('fjord', 100, 100))
    expect(response.status).toEqual(200)
  })

  it('Resized Full Image Into Thumb', async () => {
    await request(app).get(buildUrl('fjord', 100, 100))
    const fileExists = await fs.promises.stat(filePath('fjord', 100, 100))
    expect(fileExists).not.toBeNull()
  })

  it('Resized Full Image Into Thumb With Valid height & width', async () => {
    await request(app).get(buildUrl('fjord', 100, 150))
    const size = await sizeOf(filePath('fjord', 100, 150))
    expect(size).toEqual({ height: 100, width: 150 })
  })
})
