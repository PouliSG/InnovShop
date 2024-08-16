const mongoose = require('mongoose')
const connectDB = require('../../config/db')

describe('Database Connection', () => {
  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })

  test('Should connect to MongoDB', async () => {
    const connect = jest.spyOn(mongoose, 'connect')
    await connectDB()
    expect(connect).toHaveBeenCalled()
  })
})
