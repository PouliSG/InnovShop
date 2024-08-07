const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Obtenir le jeton du header
  const token = req.header('x-auth-token')

  // Vérifier s'il n'y a pas de jeton
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // Vérifier le jeton
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
