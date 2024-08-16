const request = require('supertest')
const app = require('../../server')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../../models/User')
let mongoServer

describe('User Controller', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
    await app.close()
  })

  test('Should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('token')
  })

  test('Should login a user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'john.doe@example.com',
      password: 'password123',
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })
})
