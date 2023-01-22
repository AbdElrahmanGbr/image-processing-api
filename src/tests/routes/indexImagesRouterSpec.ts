import request from 'supertest'
import app from '../../index'

describe('GET /api/indexImages', (): void => {
  it('responds with 200', (done): void => {
    request(app).get('/api/indexImages').expect(200, done)
  })
})
