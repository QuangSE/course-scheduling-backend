const express = require('express')
const authenticationController = require('../controllers/authenticationController')

const router = express.Router()

router.post('/create-session', authenticationController.createSession)
router.get('/session', authenticationController.getSession)
router.post('/delete-session', authenticationController.deleteSession)

module.exports = router
