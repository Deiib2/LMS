const mongoose = require('mongoose')

const readerSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currentBorrowedItem: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Item'
    },
    pastBorrowedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    returnDate: {
        type: Date,
        required: false
    },
}, {timestamps: true})

module.exports = mongoose.model('Reader', readerSchema)