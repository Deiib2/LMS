const mongoose = require('mongoose')
const Item = require('../models/itemModel').item
const BorrowedItem = require('../models/itemModel').borrowedItem

const getAllItems = async (req, res) => {
    try{
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getCurrentlyBorrowedItems = async (req, res) => {
    const readerId = req.user._id
    console.log("readerId: ",readerId)
    console.log("req.user: ",req.user)
    try{
        const items = await BorrowedItem.find({readerId})
        console.log("items: ",items)
        let myitems = []
        for(let i=0; i<items.length; i++){
            const item =await Item.findById(items[i].itemId)
            myitems.push(item)
        }
        res.status(200).json(myitems)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getDueDate = async (req, res) => {
    const {itemId} = req.params
    if(!mongoose.Types.ObjectId.isValid(itemId)){
        return res.status(400).json({error: 'wrong id'})
    }
    try{
        const item = await BorrowedItem.findOne({itemId, readerId: req.user._id})
        const date = item.returnDate
        res.status(200).json(date)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const requestExtension = async (req, res) => {
    const {itemId, newDate} = req.body
    const readerId = req.user._id
    if(!mongoose.Types.ObjectId.isValid(itemId)){
        return res.status(400).json({error: 'wrong item id'})
    }
    if(!mongoose.Types.ObjectId.isValid(readerId)){
        return res.status(400).json({error: 'wrong reader id'})
    }
    try{
        const item = await BorrowedItem.findOneAndUpdate({itemId, readerId}, {extensionRequest: true, extensionDate: newDate})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllItems,
    getCurrentlyBorrowedItems,
    getDueDate,
    requestExtension
}