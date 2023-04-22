const express = require('express')
const {
    getAllItems,
    getCurrentlyBorrowedItems,
    getDueDate
    } = require('../controllers/readerController')

const requireAuthReader = require('../middleware/requireAuthReader')

const router = express.Router()

router.use(requireAuthReader)

router.get('/allItems', getAllItems)
router.get('/currentBorrowedItems', getCurrentlyBorrowedItems)
router.get('/getDueDate/:itemId', getDueDate)

module.exports = router