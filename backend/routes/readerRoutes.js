const express = require('express')
const {
    getAllItems
    } = require('../controllers/readerController')

const router = express.Router()

router.get('/allItems', getAllItems)

module.exports = router