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

module.exports.updateUser = (id,data)=>{
    const updatedUser = userModel.findByIdAndUpdate(id,data)
    return updatedUser
}