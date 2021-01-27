const db = require("../models");
const User = db.user;


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      console.log(req.body.email)
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            console.log(hash)
            const user = new User({
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
              .catch(error => res.status(400).json({ error }))
          })
          .catch(error => res.status(500).json({ error }))
      } else {
        return res.status(401).json({ error: 'email deja inscrit !' })
      }
    })
}

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'urilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorect !' })
          }
          console.log(user)
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'chaine_secrete',
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error: 'erreur 1' }))
    })
    .catch(error => res.status(500).json({ error: 'erreur 2' }))
}
