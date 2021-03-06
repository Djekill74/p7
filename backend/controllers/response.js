const db = require("../models");
const Response = db.response;
const Forum = db.forum;
const User = db.user;


exports.createResponse = (req, res, next) => {
  const responseObject = req.body
  User.findOne({
    where: { id: req.body.userId }
  })
    .then(
      Forum.findOne({
        where: { id: req.body.forumId }
      })
        .then(response => {
          response = new Response({
            ...responseObject
          })
          response.save()
            .then(() => res.status(201).json({ message: 'sujet enregistré' }))
            .catch(error => res.status(400).json({ error: 'erreur serveur' }))
        })
        .catch(error => res.status(400).json({ error: 'Sujet non trouvé' }))
    )
    .catch(error => res.status(400).json({ error: 'user not found !' }))
}


exports.deleteResponse = (req, res, next) => {
  Response.destroy({
    where: {
      id: req.params.id
    } 
  })  
    .then(() => res.status(200).json({ message: 'reponse viré' }))
    .catch(error => res.status(404).json({ error: 'reponse non supprimé' }))
}


exports.getAllResponse = (req, res, next) => {
  Response.findAll({
    where: { forumId: req.params.forumId },
    include: [{
        model: User
      }, {
        model: Forum,
        include: User
      }]
  })
    .then(
      (response) => { res.status(200).json(response) }
    )
    .catch(error => res.status(404).json({ error: error }))
}
