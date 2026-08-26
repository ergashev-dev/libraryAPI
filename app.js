require('dotenv').config()
const express = require('express')
const cors = require('cors') // 1. CORS paketini chaqiramiz
const app = express()
const PORT = process.env.PORT || 8000
const connectDB = require('./config/db')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')

// 2. CORS middleware'ni ulash (Har doim routes'dan yuqorida turishi kerak)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontendingiz manzillari
  credentials: true
}))

app.use(express.json())

app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi!`))
})