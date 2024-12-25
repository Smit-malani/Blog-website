const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register',userController.registerUser)

router.get('/users',userController.getAllUsers)

router.get('/users/:id',userController.getUserById)

router.patch('/users/details/:id',userController.ChangeUserDetails)

router.delete('/delete/:id',userController.deleteUser)

module.exports = router