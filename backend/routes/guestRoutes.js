const express = require('express')
const {
    getAllItems
    } = require('../controllers/guestController')

const router = express.Router()

router.get('/allItems', getAllItems)

module.exports = router