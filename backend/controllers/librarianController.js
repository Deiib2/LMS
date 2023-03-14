const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Librarian = require('../models/librarianModel')
const Item = require('../models/itemModel')
const User = require('../models/userModel')
const Reader = require('../models/readerModel')

const createNewItem = async (req, res) => {
    const {title, type, description, author, totalCopies} = req.body;
    try{
        const newItem = await Item.create({
            title,
            type,
            description,
            author,
            totalCopies
        })
        res.status(200).json(newItem)
    } catch (error) {
        res.status(400).json({error: error.message})
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
        if(item.borrowedCopies+1 === item.totalCopies)
            return res.status(401).json({error: 'Only 1 more copy available, Cannot be lent'})
        console.log(reader.currentBorrowedItem)
        if(reader.currentBorrowedItem !== null && reader.currentBorrowedItem !== undefined)
            return res.status(401).json({error: 'Reader cannot borrow more than 1 item at a time'})
        const item2 = await Item.findByIdAndUpdate(itemId, {borrowedCopies: item.borrowedCopies+1, $push:{borrowedBy: readerId}})
        const reader2 = await Reader.findByIdAndUpdate(readerId, {currentBorrowedItem: itemId, returnDate})
        res.status(200).json({item2, reader2})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const setReturned = async (req, res) => {
    const {readerId, itemId} = req.body;
    try{
        const item = await Item.findByIdAndUpdate(itemId, {$inc: {borrowedCopies: -1}, $pull: {borrowedBy: readerId}})
        const reader = await Reader.findByIdAndUpdate(readerId, {$push: {pastBorrowedItems: itemId},currentBorrowedItem: null, returnDate: null})
        res.status(200).json({item, reader})
    } catch (error) {
        res.status(400).json({error: error.message})
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
    setReturned
}
