const userModel = require('../models/userModel')
const userServices = require('../services/userServices')

module.exports.registerUser = async(req,res,next)=>{
    try {
        const {name,email,password} = req.body
        if(!name && !email && !password){
            return res.status(400).json({message : 'Please enter all details',success: false})
        }

        const existingUser = await userModel.findOne({email})        
        if(!(existingUser == null)){
            res.status(400).json({message: 'User Alredy Register With This Email'})
        }else{
            const user = await userServices.createUser(
                name,
                email,
                password
            )
            res.status(201).json({user})
        }
    } catch (err) {
        console.error(err)
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
            res.status(200).json({users, message: 'User Found Successfully',success: true})        
        }
    } catch (err) {
        console.error(err) 
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
            return res.status(200).json({searchedUser, message:'User Found Successfully', success: true})
        }
    } catch (err) {
        console.error(err) 
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
        return res.status(200).json({updatedUser,message:'User Updated Successfully', success: true})
    } catch (err) {
        console.error(err) 
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
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}