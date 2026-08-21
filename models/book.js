const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    page: Number,
    isActive: Boolean,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Book', bookSchema)