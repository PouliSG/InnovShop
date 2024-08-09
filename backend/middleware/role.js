const checkRole = (roles) => {
  return (req, res, next) => {
    console.log('current user: ', req.user)
    console.log(`allowed roles: ${roles} - user role: ${req.user.role}`)
    if (roles.includes(req.user.role)) {
      next()
    } else {
      res.status(403).json({ message: 'Forbidden' })
    }
  }
}

module.exports = checkRole
