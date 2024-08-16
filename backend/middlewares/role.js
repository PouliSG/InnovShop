// Fonction pour vérifier le rôle de l'utilisateur
const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next()
    } else {
      res.status(403).json({ message: 'Forbidden' })
    }
  }
}

module.exports = checkRole
