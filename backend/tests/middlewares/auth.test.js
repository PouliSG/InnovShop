const jwt = require('jsonwebtoken')
const auth = require('../../middlewares/auth')

describe('Auth Middleware', () => {
  test('Should authenticate user', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token'),
    }
    const res = {}
    const next = jest.fn()

    jwt.verify = jest.fn().mockReturnValue({ user: { id: 'user123' } })

    auth(req, res, next)
    expect(req.user).toBeDefined()
    expect(next).toHaveBeenCalled()
  })
})
