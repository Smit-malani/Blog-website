const commentModel = require('../models/commentModel')

module.exports.createComment = (comment,id,creater)=>{
    const addComment = commentModel.create({
        comment,
        blog: id,
        user: creater
    })
    return addComment
}

module.exports.deleteComment = (id)=>{
    const deleteComment = commentModel.findByIdAndDelete(id)
    return deleteComment
}

module.exports.editComment = (id, updateComment)=>{
    const editedComment = commentModel.findByIdAndUpdate(id, {comment: updateComment}, {new:true, runValidators: true})
    return editedComment
}