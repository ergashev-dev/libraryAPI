const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log(`MongoDB muvaffaqqiyatli ulandi!`)
    } catch (error) {
        console.log(`MongoDB ulashda xatolik: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB