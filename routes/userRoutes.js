const express = require('express')

const router = express.Router()
const { getUsers, getUser, registerUser, loginUser, editUser, delUser, sendOTP, verifyOTP, profile} = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { roleMiddleware } = require('../middlewares/roleMiddleware')

router.get('/profile', authMiddleware, profile)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)

router.get('/', authMiddleware, roleMiddleware('admin'), getUsers)
router.get('/:id', authMiddleware, roleMiddleware('admin'), getUser)

router.put('/:id', authMiddleware, roleMiddleware('admin'), editUser)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), delUser)

module.exports = router