const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  // Obtenir le jeton du header
  const token = req.header('Authorization') || req.header('x-auth-token')

  // Vérifier s'il n'y a pas de jeton
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // Vérifier le jeton
  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(
      token.split(' ')[1] || token,
      process.env.JWT_SECRET
    )
    const user = await User.findById(decoded.user.id).select('-password') // Fetch user details, excluding the password

    if (!user) {
      return res.status(401).json({ msg: 'User not found' })
    }

    // Attach full user object to req, including the role
    req.user = user
    next()
  } catch (err) {
    console.error('Auth Middleware Error: ', err)
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
