const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.createUser= async (name,email,password)=>{
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = userModel.create({
        name,
        email,
        password : hashedPassword
    })

    return user;
}

module.exports.getAllUsers = ()=>{
    const users = userModel.find().populate("blogs")
    return users
}

module.exports.getUserById = (id)=>{
    const searchedUser = userModel.findById(id)
    return searchedUser
} 

module.exports.updateUser = (id,updates)=>{

    const updatedUser = userModel.findByIdAndUpdate(id,{$set:updates},{new:true, runValidators: true})    
    return updatedUser
}

module.exports.deleteUser = (id)=>{
    
    const deletedUser = userModel.findByIdAndDelete(id)
    return  deletedUser 
}
