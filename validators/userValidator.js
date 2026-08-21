const {z} = require('zod')

const registerUser = z.object({
    name: z.string().min(3).max(20),
    age: z.number().min(1).max(100),
    email: z.email(),
    password: z.string().min(6).max(32)
})

const loginUser = z.object({
    email: z.email(),
    password: z.string().min(6).max(32)
})
module.exports = {registerUser, loginUser}