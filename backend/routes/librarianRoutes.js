const express = require('express')
const {createNewItem, 
         getAllItems,
         registerLibrarian
    } = require('../controllers/librarianController')

const router = express.Router()

router.post('/newItem', createNewItem)
router.get('/allItems', getAllItems)
router.post('/register', registerLibrarian)

module.exports = router