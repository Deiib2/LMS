const express = require('express')
const {
    getAllItems,
    search,
    getItemById
    } = require('../controllers/guestController')

const router = express.Router()

router.get('/allItems', getAllItems)
router.post('/search', search)
router.get('/items/:id', getItemById)


module.exports = router