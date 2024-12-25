const userModel = require('../models/userModel')

module.exports.createUser= (name,email,password)=>{
    const user = userModel.create({
        name,
        email,
        password
    })
    return user;
}

module.exports.getAllUsers = ()=>{
    const users = userModel.find()
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