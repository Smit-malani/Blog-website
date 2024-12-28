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
    },
    creater : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
},{
    timestamps: true
})

const blogModel = mongoose.model('blog',blogSchema)

module.exports = blogModel