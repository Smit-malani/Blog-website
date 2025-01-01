const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const blogServices = require('../services/blogServices')
const { deleteImageCloud } = require('../utils/deleteImage')
const { uploadImage } = require('../utils/uploadImage')
const fs = require('fs')
const ShortUniqueId = require('short-unique-id')
const {randomUUID} = new ShortUniqueId({ length: 10 });

module.exports.getBlog = async(req,res,next)=>{
    try {
        const blogs = await blogServices.getAllBlogs()
        if(blogs.length === 0){
            return res.status(404).json({message: 'No Blog found', success: false})
        }else{
            res.status(200).json({blog: blogs, message: 'Blogs Found Successfully',success: true}) 
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.getBlogById = async(req,res,next)=>{
    try {
        const {blogId} = req.params        
        const searchedBlog = await blogServices.getBlogById(blogId)
    
        if(!searchedBlog){
            return res.status(404).json({message: 'No Such Blog found', success: false})
        }else{
            res.status(200).json({blog: searchedBlog, message: 'Blogs Found Successfully',success: true})
        }
    } catch (err) {    
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.createBlog =  async(req,res,next)=>{
    try {
        const creater = req.user         
        const {title,description,draft} = req.body
        const image = req.file     
        
        if(!title && !description && !draft){
            return res.status(400).json({message : 'Please enter all details',success: false})
        }
        const isUSer = await blogServices.isUser(creater)        
        if(!isUSer){
            return res.status(401).json({message: 'You are not unauthorized, please Sign-Up'})
        }else{
            const blogId = title.toLowerCase().split(" ").join("-")+ "-" + randomUUID()
            console.log(blogId)
            const {secure_url, public_id} = await  uploadImage(image.path) 
            fs.unlinkSync(image.path)
            const blog = await blogServices.createBlog(title,description,draft,creater, secure_url, public_id,blogId)
            if(blog.length === 0){
                return res.status(404).json({message: 'Blog Not Created', success: false})
            }else{
                await userModel.findByIdAndUpdate(creater,{$push : {blogs: blog._id}})
                return res.status(201).json({blog: blog, message: 'Blog created successfully', success: true})
            }
        }
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.updateBlog = async(req,res,next)=>{
    try {
        const {id} = req.params
        const creater = req.user
        const {title,description, draft} = req.body
        if(!title && !description){
            return res.status(400).json({ message: 'At least one field must be provided to update', success: false })
        }
        const isBlog = await blogModel.findById(id)
        if(isBlog == null){
            return res.status(404).json({ message: 'Blog not found', success: false })
        }
        if(!(creater == isBlog.creater)){
            return res.status(401).json({message: 'you are not authorized for this action', success: false})
        }else{
            const updatedBlog = await blogServices.updateBlog(id,{title,description, draft})
            if(!updatedBlog){
                return res.status(404).json({ message: 'Blog not found', success: false })
            }else{
                return res.status(200).json({blog: updatedBlog, message:'Blog Updated Successfully', success: true})
            }
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.deleteBlog = async(req,res,next)=>{
    try {
        const {id} = req.params
        const creater = req.user
        const isBlog = await blogModel.findById(id)
        if(isBlog == null){
            return res.status(404).json({ message: 'Blog not found', success: false })
        }
        
        if(!(creater == isBlog.creater)){
            return res.status(401).json({message: 'you are not authorized for this action', success: false})
        }else{

            await deleteImageCloud(isBlog.imageId)
            const result = await blogServices.deleteBlog(id)
            await userModel.findByIdAndUpdate(creater,{$pull : {blogs : id}})
            if(!result){
                return res.status(404).json({ message: 'Blog not deleted', success: false })
            }
            res.status(200).json({message: 'Blog deleted successfullty', success: true})
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.likeBlog = async(req, res, next)=>{
    try {
        const {id} = req.params
        const creater = req.user

        const blog = await blogModel.findById(id)
        if(blog == null){
            return res.status(404).json({ message: 'Blog not found', success: false })
        }
        if(blog.likes.includes(creater)){
            await blogModel.findByIdAndUpdate(id,{$pull: {likes: creater}})
            return res.status(200).json({message: 'Blog Unliked successfuly', success: true})
        }else{
            await blogModel.findByIdAndUpdate(id,{$push: {likes: creater}})
            return res.status(200).json({message: 'Blog Liked successfuly', success: true})
        }



    } catch (err) {
        
    }
}