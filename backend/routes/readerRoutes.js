const express = require('express')
const {
    getAllItems,
    getCurrentlyBorrowedItems,
    getDueDate,
    requestExtension
    } = require('../controllers/readerController')

const requireAuthReader = require('../middleware/requireAuthReader')

const router = express.Router()

router.use(requireAuthReader)

router.get('/allItems', getAllItems)
router.get('/currentBorrowedItems', getCurrentlyBorrowedItems)
router.get('/getDueDate/:itemId', getDueDate)
router.post('/requestExtension', requestExtension)

module.exports = router