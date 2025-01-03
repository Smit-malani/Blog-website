const userModel = require('../models/userModel')
const userServices = require('../services/userServices')
const bcrypt = require('bcrypt')
const { generateJwtToken } = require('../utils/generateJwtToken')


module.exports.registerUser = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body
        if(!name && !email && !password){
            return res.status(400).json({message : 'Please enter all details', success: false})
        }

        const existingUser = await userModel.findOne({email})        
        if(!(existingUser == null)){
            res.status(400).json({message: 'User Alredy Register With This Email'})
        }else{
            const newUser = await userServices.createUser(name, email, password)
            const jwtToken = await generateJwtToken({email: newUser.email, id: newUser._id})
            const userWithoutPassword = await userModel.findById(newUser._id).select('-password');
            res.status(201).json({user: {user:userWithoutPassword,token: jwtToken}, message: 'User registeret successfully', success: false})
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', success: false })
    }
}

module.exports.loginUser = async(req,res,next)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({message : 'Please enter all details', success: false})
        }
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            res.status(400).json({message: 'Please Enter currect Email Or Password', success: false})
        }else{
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            const jwtToken = await generateJwtToken({email: existingUser.email, id: existingUser._id})
            const userWithoutPassword = await userModel.findById(existingUser._id).select('-password');
            if(!isPasswordCorrect){
                res.status(401).json({message: 'Please Enter currect Email Or Password', success: false})
            }else{
                res.status(200).json({user:{user: userWithoutPassword, token: jwtToken}, message: 'logged In successfully', success: true})
            }
        }        
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', success: false })
    }
}

module.exports.getAllUsers = async(req, res, next)=>{
    try {
        const users = await userServices.getAllUsers()
        if(users.length === 0){
            return res.status(404).json({message: 'No users found', success: false})
        }
        else{
            res.status(200).json({user:users, message: 'User Found Successfully', success: true})        
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.getUserById= async(req, res, next)=>{
    try {
        const {id} = req.params
        const searchedUser = await userServices.getUserById(id)
        if(searchedUser.length === 0){
            return res.status(404).json({message: 'No Such User Found', success: false})
        }else{
            return res.status(200).json({user: searchedUser, message:'User Found Successfully', success: true})
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.ChangeUserDetails = async(req, res, next)=>{
    try {
        const {id} = req.params
        const {name,password,email} = req.body

        if(!name && !password && !email){
            return res.status(400).json({ message: 'At least one field must be provided to update', success: false })
        }
        const updatedUser = await userServices.updateUser(id,{name, password, email})
        if(!updatedUser){
            return res.status(404).json({ message: 'User not found', success: false })
        }
        return res.status(200).json({user: updatedUser,message:'User Updated Successfully', success: true})
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.deleteUser = async(req,res,next)=>{
    try {
        const {id} = req.params
        const result = await userServices.deleteUser(id)
        if(!result){
            return res.status(404).json({ message: 'User not found', success: false })
        }
        res.status(200).json({message: 'User deleted successfullty', success: true})
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}