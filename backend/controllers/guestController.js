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
        const items = await Item.find().or([{title: title}, {author: author}])
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllItems,
    search
}