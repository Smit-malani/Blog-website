const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const { verifyUser } = require('../middlewares/auth')

router.get('/blogs', blogController.getBlog)

router.get('/blog/:id', blogController.getBlogById)

router.post('/blog',verifyUser, blogController.createBlog)

router.patch('/blog/:id', verifyUser, blogController.updateBlog)

router.delete('/blog/:id', verifyUser, blogController.deleteBlog)

router.post('/blog/like/:id', verifyUser, blogController.likeBlog)


module.exports = router