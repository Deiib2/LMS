const express = require('express')
const {
    registerAdmin,
    registerLibrarian
    } = require('../controllers/adminController')

const router = express.Router()

router.post('/registerAdmin', registerAdmin)
router.post('/registerLibrarian', registerLibrarian)

module.exports = router