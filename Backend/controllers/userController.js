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
        const data = req.body        
        const updatedUser = await userServices.updateUser(id,data)
        console.log(updatedUser);
        
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}