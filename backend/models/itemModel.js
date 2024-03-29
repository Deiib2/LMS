const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    totalCopies: {
        type: Number,
        required: true,
    },
    borrowedCopies: {
        type: Number,
        required: true,
        default: 0
    },
    borrowedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: false
    }],
}, {timestamps: true})

const borrowedItemSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    extensionRequest: {
        type: Boolean,
        default: false
    },
    extensionDate: {
        type: Date,
        required: false
    },
}, {timestamps: true})

const item = mongoose.model('Item', itemSchema)
const borrowedItem = mongoose.model('BorrowedItem', borrowedItemSchema)
module.exports = {item, borrowedItem}