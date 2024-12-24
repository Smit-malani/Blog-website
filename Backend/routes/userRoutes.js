const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register',userController.registerUser)

router.get('/all',userController.getAllUsers)

router.get('/:id',userController.getUserById)

router.patch('/details/:id',userController.ChangeUserDetails)

module.exports = router