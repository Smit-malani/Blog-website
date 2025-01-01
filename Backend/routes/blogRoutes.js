const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const commentController = require('../controllers/commentController')
const { verifyUser } = require('../middlewares/auth')
const upload = require('../utils/multer')

router.get('/blogs', blogController.getBlog)

router.get('/blog/:blogId', blogController.getBlogById)

router.post('/blog',verifyUser, upload.single("image"), blogController.createBlog)

router.patch('/blog/:id', verifyUser, blogController.updateBlog)

router.delete('/blog/:id', verifyUser, blogController.deleteBlog)

router.post('/blog/like/:id', verifyUser, blogController.likeBlog)

router.post('/blog/comment/:id', verifyUser, commentController.addComment)

router.delete('/blog/comment/:id', verifyUser, commentController.deleteComment)

router.patch('/blog/comment/:id', verifyUser, commentController.editComment)

router.post('/blog/comment/like/:id', verifyUser, commentController.likeComment)






module.exports = router