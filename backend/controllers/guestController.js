const { default: mongoose } = require('mongoose')

const Item = require('../models/itemModel').item

// const getAllItems = async (req, res) => {
//     try{
//         const items = await Item.find()
//         res.status(200).json(items)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }
const getAllItems = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter or default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit from query parameter or default to 10

    try {
        const totalItems = await Item.countDocuments(); // Get the total count of items
        const totalPages = Math.ceil(totalItems / limit); // Calculate the total number of pages
        const skip = (page - 1) * limit; // Calculate the number of items to skip

        const items = await Item.find().skip(skip).limit(limit); // Fetch items based on skip and limit

        res.status(200).json({
            items,
            page,
            totalPages,
            totalItems
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const search = async (req, res) => {
    const { title, author } = req.body;
    const page = parseInt(req.query.page) || 1; // Get the page number from query parameter or default to 1
    const limit = parseInt(req.query.limit) || 10; // Get the limit from query parameter or default to 10

    try {
        const countPromise = Item.countDocuments().or([{ title: { $regex: new RegExp(title, 'i') } }, { author: { $regex: new RegExp(author, 'i') } }]);

        const skip = (page - 1) * limit; // Calculate the number of items to skip

        const itemsPromise = Item.find()
            .or([{ title: { $regex: new RegExp(title, 'i') } }, { author: { $regex: new RegExp(author, 'i') } }])
            .skip(skip)
            .limit(limit);

        const [items, totalItems] = await Promise.all([itemsPromise, countPromise]);

        const totalPages = Math.ceil(totalItems / limit); // Calculate the total number of pages

        res.status(200).json({
            items,
            page,
            totalPages,
            totalItems
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
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