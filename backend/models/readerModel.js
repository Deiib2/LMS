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
    currentBorrowedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    pastBorrowedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
}, {timestamps: true})

module.exports = mongoose.model('Reader', readerSchema)