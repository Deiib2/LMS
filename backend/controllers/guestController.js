const { default: mongoose } = require('mongoose')

const Item = require('../models/itemModel').item

const getAllItems = async (req, res) => {
    try{
        console.log('here')
        const items = await Item.find()
        console.log(items)
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const search = async (req, res) => {
    const {title, author} = req.body
    try{
        const items = await Item.find().or([{title: {$regex: title}}, {author: {$regex: author}}])
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getItemById = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(401).json({error: 'Invalid ID'})
    try{
        const item = await Item.findById(id)
        if(!item) {
            return res.status(404).json({error: 'Item not found'})
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllItems,
    search,
    getItemById
}