const {z} = require('zod')

const bookValidator = z.object({
    name: z.string().min(2),
    author: z.string().min(2),
    page: z.number().min(10).max(2000),
    genre: z.string().min(5),
    isActive: z.boolean(),
    user: z.string().optional()
})

module.exports = bookValidator