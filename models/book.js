const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    page: Number,
    genre: String,
    isActive: Boolean,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Book', bookSchema)