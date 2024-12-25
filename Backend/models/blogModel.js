const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type : String,
        trim : true,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    draft : {
        type : Boolean,
        default : false
    }
},{
    timestamps: true
})

const blogModel = mongoose.model('blog',blogSchema)

module.exports = blogModel