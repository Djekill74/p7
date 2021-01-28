const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const responseCrtl = require('../controllers/response')

router.post('/', auth, responseCrtl.createResponse)
router.delete('/:id', auth, responseCrtl.deleteResponse)
router.get('/:forumId', auth, responseCrtl.getAllResponse)

module.exports = router