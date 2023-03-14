const express = require('express')
const {
    signIn
    } = require('../controllers/authController')

const router = express.Router()

router.post('/signIn', signIn)

module.exports = router