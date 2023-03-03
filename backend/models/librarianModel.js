const mongoose = require('mongoose')

const librarianSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Librarian', librarianSchema)