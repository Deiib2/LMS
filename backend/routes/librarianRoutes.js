const express = require('express')
const {
    createNewItem, 
    getAllItems,
    registerLibrarian,
    registerReader,
    getAllLibrarians,
    getAllReaders,
    setBorrowed,
    setReturned,
    getReader,
    getAllExtensionRequests,
    grantExtension,
    denyExtension,
    getItemById
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
router.get('/getReader/:readerId', getReader)
router.get('/getAllExtensionRequests', getAllExtensionRequests)
router.put('/grantExtension', grantExtension)
router.put('/denyExtension', denyExtension)
router.get('/getItem/:itemId', getItemById)

module.exports = router