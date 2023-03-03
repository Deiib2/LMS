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
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema)