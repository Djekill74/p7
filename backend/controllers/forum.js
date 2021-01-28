const { forum } = require("../models");
const db = require("../models");
const Forum = db.forum;
const User = db.user;
const Response = db.response;



exports.createSubjet = (req, res, next) => {  
  const subjectObject = req.body 
  User.findOne({
    where: { id: req.body.userId }
  })
    .then(subject => {
      subject = new Forum({
        ...subjectObject,
        createdAt: new Date()
      })
      subject.save()
        .then(() => res.status(201).json({ message: 'sujet enregistré' }))
        .catch(error => res.status(400).json({ error: 'erreur serveur' }))
    })
    .catch(error => res.status(404).json({ error: 'user not found' }))
}


exports.getOneSubject = (req, res, next) => {
  Forum.findOne({
    where: { id: req.params.id },
    include: User
  })
    .then((subject) => {
      Response.count({
        where: { forumId: req.params.id }
      })
        .then((count) => {
          console.log("compteur" + count)
        })
        .catch(error => res.status(404).json({ error: error }))
      res.status(200).json(subject)
    })
    .catch(error => res.status(404).json({ error: error }))
}


exports.getAllSubject = (req, res, next) => {
  Forum.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}


exports.deleteSubject = (req, res, next) => {
  console.log(req.params.id)
  Forum.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: 'sujet viré' }))
    .catch(error => res.status(404).json({ error: 'sujet non supprimé' }))
}
