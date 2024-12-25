const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/blogs',blogController.getBlog)

router.get('/blog/:id',blogController.getBlogById)

router.post('/blog',blogController.createBlog)

router.patch('/blog/:id',blogController.updateBlog)

router.delete('/blog/:id',blogController.deleteBlog)

module.exports = router