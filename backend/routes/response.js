const express = require('express')
const router = express.Router()
//const auth = require('../middleware/auth')

const responseCrtl = require('../controllers/response')

router.post('/', responseCrtl.createResponse)
router.delete('/:id', responseCrtl.deleteResponse)

module.exports = router