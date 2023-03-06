const express = require('express')
const {
    createNewItem, 
    getAllItems,
    registerLibrarian,
    registerReader,
    getAllLibrarians,
    getAllReaders,
    setBorrowed,
    setReturned
    } = require('../controllers/librarianController')

const router = express.Router()

router.post('/newItem', createNewItem)
router.get('/allItems', getAllItems)
router.post('/registerLibrarian', registerLibrarian)
router.post('/registerReader', registerReader)
router.get('/allLibrarians', getAllLibrarians)
router.get('/allReaders', getAllReaders)
router.put('/setBorrowed', setBorrowed)
router.put('/setReturned', setReturned)

module.exports = router