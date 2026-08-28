const express = require('express')
const router = express.Router()
const { getBooks, getBook, createBook, editBook, delBook } = require('../controllers/bookController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { roleMiddleware } = require('../middlewares/roleMiddleware')

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', createBook)
router.put('/:id', editBook)
router.delete('/:id', delBook)

module.exports = router