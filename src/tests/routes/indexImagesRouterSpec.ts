import request from 'supertest'
import app from '../../index'

describe('GET /api/indexImages', () => {
  it('returns response with 200', (done) => {
    request(app).get('/api/indexImages').expect(200, done)
  })
})
