const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')

// Register user
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
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
      gender,
      birthdate,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

    await user.save()

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'InnovShop: Réinitialisation de votre mot de passe',
      text: `Vous recevez cet e-mail car vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
      Veuillez cliquer sur le lien suivant ou le copier-coller dans votre navigateur pour terminer le processus:\n\n
      http://${req.headers.host}/reset/${token}\n\n
      Si vous n'avez pas effectué cette demande, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'Email sent' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Password reset token is invalid or has expired' })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(req.body.password, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({ message: 'Password has been reset' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
}
