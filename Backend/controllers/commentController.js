const blogModel = require("../models/blogModel")
const commentModel = require("../models/commentModel")
const userModel = require("../models/userModel")
const commentServices = require("../services/commentServices")

module.exports.addComment = async(req,res,next)=>{
    try {
        const {id} = req.params
        const creater = req.user
        const {comment} = req.body

        const isBlog = await blogModel.findById(id)
        if(!comment){
            return res.status(400).json({message: 'Please enter comment'})
        }else{
            const isUser = await userModel.findById(creater)
            if(!isUser){
                return res.status(401).json({message: 'You are not unauthorized, please Sign-Up'})
            }
            else{
                const addComment = await commentServices.createComment(comment,id,creater)
                if(!addComment){
                    return res.status(404).json({message: 'comment Not Added', success: false})
                }else{
                    await blogModel.findByIdAndUpdate(id, {$push :{comment:addComment._id}})
                    return res.status(201).json({comment: addComment, message: 'comment Added successfuly', success: true})
                }
            }
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false })
    }   
}

module.exports.deleteComment = async(req,res,next)=>{
    try {
        const {id} = req.params
        const userId = req.user

        const comment = await commentModel.findById(id).populate({path: "blog", select: "creater"})
        if(!comment){
            return res.status(401).json({message: 'Comment Not Found'})
        }
        if(comment.user != userId && comment.blog.creater != userId){
            return res.status(401).json({message: 'You are not unauthorized, please Sign-Up'})
         }else{
            const deleteComment = await commentServices.deleteComment(id)    
            if(!deleteComment){
                return res.status(404).json({message: 'comment Not deleted', success: false})
            }else{
                await blogModel.findByIdAndUpdate(comment.blog._id, {$pull :{comment:comment.id}})
                return res.status(201).json({message: 'comment deleted successfuly', success: true})
            }
        }     
    } catch (err) {        
        return res.status(500).json({ message: 'Internal Server Error', success: false })
    }   
}