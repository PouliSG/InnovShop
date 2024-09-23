const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function (req, res, next) {
  // Obtenir le jeton du header
  var token = req.header('Authorization') || req.header('x-auth-token')

  // Vérifier s'il n'y a pas de jeton
  if (!token) {
    return res.status(401).json({ msg: 'Aucun jeton, autorisation refusée' })
  }

  // Vérifier le jeton
  try {
    // Décoder le jeton pour obtenir l'ID de l'utilisateur
    token = token.split(' ')[1] || token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user.id).select('-password') // Récupérer les détails de l'utilisateur, en excluant le mot de passe

    if (!user) {
      return res.status(401).json({ msg: 'Utilisateur non trouvé' })
    }

    // Attacher l'objet utilisateur complet à la requête, y compris le rôle
    req.user = user
    next()
  } catch (err) {
    console.error("Erreur du middleware d'authentification : ", err)
    res.status(401).json({ msg: "Le jeton n'est pas valide" })
  }
}
