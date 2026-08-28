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

router.get('/', getUsers)
router.get('/:id', getUser)

router.put('/:id', editUser)
router.delete('/:id', delUser)

module.exports = router