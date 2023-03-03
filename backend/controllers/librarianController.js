const mongoose = require('mongoose')
const Librarian = require('../models/librarianModel')
const Item = require('../models/itemModel')
const User = require('../models/userModel')

const createNewItem = async (req, res) => {
    const {title, type, description, author} = req.body;
    try{
        const newItem = await Item.create({
            title,
            type,
            description,
            author
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
        res.status(400).json({error: error.message})
    }
}

const registerLibrarian = async (req, res) => {
    const {email, password, name} = req.body;
    try{
        const newLibrarian = await User.create({
            email,
            password
        })
        const newLib2 = await Librarian.create({
            _id: newLibrarian._id,
            name
        })
        res.status(200).json(newLibrarian)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createNewItem,
    getAllItems,
    registerLibrarian
}
