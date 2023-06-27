const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Librarian = require('../models/librarianModel')
const Item = require('../models/itemModel').item
const BorrowedItem = require('../models/itemModel').borrowedItem
const User = require('../models/userModel')
const Reader = require('../models/readerModel')

const createNewItem = async (req, res) => {
    const {title, type, imageUrl, description, author, totalCopies} = req.body;
    try{
        const newItem = await Item.create({
            title,
            type,
            imageUrl,
            description,
            author,
            totalCopies
        })
        res.status(200).json(newItem)
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error)
    }
}

const getAllItems = async (req, res) => {
    try{
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const registerLibrarian = async (req, res) => {
    const {email, password, name} = req.body;
    const type = 'librarian'
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(password, salt)
            const newLibrarian = await User.create({email, password: hash, type})
            const newLib2 = await Librarian.create({_id: newLibrarian._id, name})
            res.status(200).json(newLibrarian)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const registerReader = async (req, res) => {
    const {email, password, name} = req.body;
    const type = 'reader'
    try{
        let userr = await User.findOne({email})
        if(userr) {
            return res.status(400).json({error: 'User already exists'})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(password, salt)
            const newReader = await User.create({email, password: hash, type})
            const newReader2 = await Reader.create({_id: newReader._id, name})
            res.status(200).json(newReader)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllLibrarians = async (req, res) => {
    try{
        const librarians = await Librarian.find()
        res.status(200).json(librarians)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const getAllReaders = async (req, res) => {
    try{
        const readers = await Reader.find()
        res.status(200).json(readers)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const setBorrowed = async (req, res) => {
    const {readerId, itemId, returnDate} = req.body;
    if(!mongoose.Types.ObjectId.isValid(readerId)) 
        return res.status(401).json({error: 'Invalid Reader ID'})
    if(!mongoose.Types.ObjectId.isValid(itemId))
        return res.status(401).json({error: 'Invalid Item ID'})
    try{
        const item = await Item.findById(itemId)
        const reader = await Reader.findById(readerId)
        console.log(item)
        if(item.borrowedCopies+1 === item.totalCopies)
            return res.status(401).json({error: 'Only 1 more copy available, Cannot be lent'})
        if(item.borrowedBy.includes(readerId,0))
            return res.status(401).json({error: 'User is currently borrowing this item'})
        const item2 = await Item.findByIdAndUpdate(itemId, {borrowedCopies: item.borrowedCopies+1, $push:{borrowedBy: readerId}})
        const item3 = await BorrowedItem.create({itemId, readerId, returnDate})
        res.status(200).json({item3})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const setReturned = async (req, res) => {
    const {readerId, itemId} = req.body;
    try{
        const item = await Item.findByIdAndUpdate(itemId, {$inc: {borrowedCopies: -1}, $pull: {borrowedBy: readerId}})
        const borrowedItem = await BorrowedItem.findOneAndDelete({itemId, readerId})
        if(!borrowedItem)
            res.status(404).json({error: 'reader is not curently borrowing this item'})
        console.log(borrowedItem)
        const reader = await Reader.findByIdAndUpdate(readerId, {$push: {pastBorrowedItems: itemId}})
        res.status(200).json({item, reader})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getReader = async (req, res) => {
    const {readerId} = req.params;
    try{
        const reader = await Reader.findById(readerId)
        if(!reader)
            res.status(404).json({error: 'reader not found'})
        res.status(200).json(reader)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllExtensionRequests = async (req, res) => {
    try{
        const extensionRequests = await BorrowedItem.find({extensionRequest: true})
        if(!extensionRequests)
            res.status(404).json({error: 'No extension requests found'})
        res.status(200).json(extensionRequests)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const grantExtension = async (req, res) => {
    const {borrowedId, newDate} = req.body
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(borrowedId))
        return res.status(401).json({error: 'Invalid borrowed item ID'})
    try{
        const extensionRequest = await BorrowedItem.findByIdAndUpdate(borrowedId, {returnDate: newDate, extensionRequest: false, extensionDate: null})
        if(!extensionRequest)
            res.status(404).json({error: 'Extension request not found'})
        res.status(200).json(extensionRequest)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const denyExtension = async (req, res) => {
    const {borrowedId} = req.body
    if(!mongoose.Types.ObjectId.isValid(borrowedId))
        return res.status(401).json({error: 'Invalid borrowed item ID'})
    try{
        const extensionRequest = await BorrowedItem.findByIdAndUpdate(borrowedId, {extensionRequest: false, extensionDate: null})
        if(!extensionRequest)
            res.status(404).json({error: 'Extension request not found'})
        res.status(200).json(extensionRequest)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getItemById = async (req, res) => {
    const {itemId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(itemId))
        return res.status(401).json({error: 'Invalid item ID'})
    try{
        const item = await Item.findById(itemId)
        console.log(item)
        if(!item)
            res.status(404).json({error: 'Item not found'})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getUserEmail = async (req, res) => {
    const {userId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(userId))
        return res.status(401).json({error: 'Invalid user ID'})
    try{
        const user = await User.findOne({_id: userId})
        if(!user)
            res.status(404).json({error: 'User not found'})
        res.status(200).json(user.email)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getReaderByEmail = async (req, res) => {
    const {email} = req.params;
    try{
        const reader = await User.findOne({email: email})
        if(!reader)
            res.status(404).json({error: 'Reader not found'})
        res.status(200).json(reader)
    } catch (error) {
        res.status(400).json({error: 'There was an error'})
    }
}

module.exports = {
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
    getItemById,
    getUserEmail,
    getReaderByEmail
}
