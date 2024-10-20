const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const User = require('../models/User')

// Inscription d'un nouvel utilisateur
const registerUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    gender = null,
    birthdate = null,
  } = req.body

  try {
    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "L'utilisateur existe déjà" })
    }

    // Création d'un nouvel utilisateur
    user = new User({
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
      signup_date: Date.now(),
    })

    // Hashage du mot de passe avant de l'enregistrer
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Enregistrement de l'utilisateur dans la base de données
    await user.save()

    // Génération du token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Ajout du rôle dans le token
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Expiration du token après 24 heures
      (err, token) => {
        if (err) throw err
        res.status(201).json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Recherche de l'utilisateur par email
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants incorrects' })
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants incorrects' })
    }

    // Mise à jour du statut de connexion
    user.last_login_date = Date.now()
    await user.save()

    // Génération du token JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Ajout du rôle dans le token
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Expiration du token après 24 heures
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

// Mot de passe oublié
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Générer un token de réinitialisation de mot de passe
    const token = crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 * 24 // 24 heures

    await user.save()

    // Envoi de l'e-mail de réinitialisation
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // })

    const mailOptions = {
      to: user.email,
      from: 'do-not-reply@innovshop.com',
      subject: 'InnovShop: Réinitialisation de votre mot de passe',
      text: `Vous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
      Veuillez cliquer sur le lien suivant ou le copier-coller dans votre navigateur pour terminer le processus:\n\n
      http://innovshop.vercel.app/reset-password/${token}\n\n
      Si vous n'avez pas effectué cette demande, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`,
    }

    // await transporter.sendMail(mailOptions)
    console.log('Email sent:', mailOptions)

    res.status(200).json({ message: 'Email sent' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Réinitialisation du mot de passe
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({
        message:
          'Le token de réinitialisation du mot de pass est invalide ou a expiré',
      })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({ message: 'Le mot de passe a été réinitialisé' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erreur serveur')
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
}
