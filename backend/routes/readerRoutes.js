const express = require('express')
const {
    getAllItems,
    getCurrentlyBorrowedItems
    } = require('../controllers/readerController')

const requireAuthReader = require('../middleware/requireAuthReader')

const router = express.Router()

router.use(requireAuthReader)

router.get('/allItems', getAllItems)
router.get('/currentBorrowedItems', getCurrentlyBorrowedItems)

module.exports = router