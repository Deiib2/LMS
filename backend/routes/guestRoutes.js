const express = require('express')
const {
    getAllItems,
    search
    } = require('../controllers/guestController')

const router = express.Router()

router.get('/allItems', getAllItems)
router.post('/search', search)

module.exports = router