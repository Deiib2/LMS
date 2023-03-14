const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
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
    // returnDate: {
    //     type: Date,
    //     required: false
    // }
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema)