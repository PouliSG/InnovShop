const request = require('supertest')
const app = require('../../server')

describe('User Routes', () => {
  afterAll(async () => {
    await app.close()
  })

  test('GET /api/users should return all users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
  })
})
