const express = require('express')
const router = express.Router()
const { getBooks, getBook, createBook, editBook, delBook } = require('../controllers/bookController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { roleMiddleware } = require('../middlewares/roleMiddleware')

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', authMiddleware, roleMiddleware('admin'), createBook)
router.put('/:id',authMiddleware, roleMiddleware('admin'), editBook)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), delBook)

module.exports = router