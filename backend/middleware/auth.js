const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]   
    const decodeToken = jwt.verify(token, 'chaine_secrete')
    const userId = decodeToken.userId
    const userIdJwt = userId
    console.log(decodeToken)
    console.log(token)
    console.log('userIdDecode'+userId)
    console.log('userIdReq'+req.body.userId)
    if (req.body.userId && req.body.userId !== userId) {
      console.log('user non trouvé')
      throw 'userId non valable'
    } else {
      console.log('jwt passé')
      
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error | 'requete non authentifié' })
  }
}