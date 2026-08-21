const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
}
})

module.exports = mongoose.model('User', userSchema)