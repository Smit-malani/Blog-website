const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment:{
        type: String
    }
    ,blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const commentModel = mongoose.model('comment', commentSchema)

module.exports = commentModel