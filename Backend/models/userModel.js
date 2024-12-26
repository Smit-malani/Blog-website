const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        minlenght: [3, 'name at leat have three characters']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long']
    },
    password:{
        type: String,
        required: true
    },
    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'blog'
        }
    ]
})

const userModel = mongoose.model('user',userSchema)

module.exports =  userModel