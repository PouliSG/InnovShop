const request = require('supertest')
const app = require('../server')

describe('Server', () => {
  test('GET / should return a welcome message', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toContain('Welcome to InnovShop API')
  })
})
