const Item = require('../models/itemModel')

const getAllItems = async (req, res) => {
    try{
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllItems
}