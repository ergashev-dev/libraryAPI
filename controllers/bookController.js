const Book = require('../models/book')
const bookValidation = require('../validators/bookValidator')

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('user', 'name age')
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('user', 'name age')
        if (!book) {
            return res.status(400).json({
                message: `Kitob topilmadi!`
            })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.createBook = async (req, res) => {
    try {
        const validation = bookValidation.safeParse(req.body)
        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues.map(issue => issue.message)
            })
        }
        const newBook = await Book.create(validation.data)
        res.status(201).json({
            message: `Yangi kitob yaratildi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.editBook = async (req, res) => {
    try {
        const validation = bookValidation.safeParse(req.body)
        if (!validation.success) {
            return res.status({
                message: validation.error.issues.map(issue => issue.message)
            })
        }
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!book) {
            return res.status(404).json({
                message: `Kitob topilmadi`
            })
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}
exports.delBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)
        if (!book) {
            return res.status(404).json({
                message: `Kitob topilmadi`
            })
        }
        res.status(200).json({
            message: `Kitob o'chirildi!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Xatolik yuz berdi: ${error.message}`
        })
    }
}