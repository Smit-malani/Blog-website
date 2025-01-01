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
    blogId: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type : String,
        required : true
    },
    imageId: {
        type : String,
        required : true
    },
    draft: {
        type : Boolean,
        default : false
    },
    creater: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},{
    timestamps: true
})

const blogModel = mongoose.model('blog',blogSchema)

module.exports = blogModel