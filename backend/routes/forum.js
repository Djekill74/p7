const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const forumCrtl = require('../controllers/forum')

router.get('/', auth, forumCrtl.getAllSubject)
router.get('/:id', auth, forumCrtl.getOneSubject)
router.post('/', auth, forumCrtl.createSubjet)// ne fonctionne pas avec auth
router.delete('/:id', auth, forumCrtl.deleteSubject)// ne fonctionne pas avec auth

module.exports = router