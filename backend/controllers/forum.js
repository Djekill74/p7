const { forum } = require("../models");
const db = require("../models");
const Forum = db.forum;
const User = db.user;
//const Op = db.Sequelize.Op;


exports.createSubjet = (req, res, next) => {
  console.log(req.body)
  const subjectObject = req.body
  //suppresion de JSON.parse et forum
  //  delete subjectObject._id
  console.log(req.body.userId)
  User.findOne({
    where: { id: req.body.userId }
  })
    .then(subject => {
      subject = new Forum({
        ...subjectObject,
        idUsers: req.body.userId,
        createdAt: new Date()
      })
      subject.save()
        .then(() => res.status(201).json({ message: 'sujet enregistré' }))
        .catch(error => res.status(400).json({ error: 'erreur serveur' }))
    }
    )
    .catch(error => res.status(404).json({ error: 'user not found' }))
}


exports.getOneSubject = (req, res, next) => {  
  console.log('params'+req.params.id)
  Forum.findOne({
    where : { id: req.params.id }    
  })
    .then(
      (subject) => { res.status(200).json(subject) }
    )
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
  console.log(req.body.id)
        Forum.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(() => res.status(200).json({ message: 'sujet viré' }))
          .catch(error => res.status(404).json({ error: 'sujet non supprimé' }))   
}
