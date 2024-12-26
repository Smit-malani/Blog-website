const userModel = require('../models/userModel')
const blogServices = require('../services/blogServices')

module.exports.getBlog = async(req,res,next)=>{
    try {
        const blogs = await blogServices.getAllBlogs()
        if(blogs.length === 0){
            return res.status(404).json({message: 'No Blog found', success: false})
        }else{
            res.status(200).json({blogs, message: 'Blogs Found Successfully',success: true}) 
        }
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.getBlogById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const searchedBlog = await blogServices.getBlogById(id)
        if(!searchedBlog){
            return res.status(404).json({message: 'No Such Blog found', success: false})
        }else{
            res.status(200).json({searchedBlog, message: 'Blogs Found Successfully',success: true})
        }
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.createBlog =  async(req,res,next)=>{
    try {
        const {title,description,draft,creater} = req.body
        if(!title && !description && !draft){
            return res.status(400).json({message : 'Please enter all details',success: false})
        }
        const isUSer = await blogServices.isUser(creater)
        if(!isUSer){
            return res.status(401).json({message: 'You are not unauthorized, please Sign-Up'})
        }else{
            const blog = await blogServices.createBlog(title,description,draft,creater)
            if(blog.length === 0){
                return res.status(404).json({message: 'Blog Not Created', success: false})
            }else{
                await userModel.findByIdAndUpdate(creater,{$push : {blogs: blog._id}})
                return res.status(201).json({blog,message: 'Blog created successfully', success: true})
            }
        }
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.updateBlog = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {title,description} = req.body
        if(!title && !description){
            return res.status(400).json({ message: 'At least one field must be provided to update', success: false })
        }

        const updatedBlog = await blogServices.updateBlog(id,{title,description})
        if(!updatedBlog){
            return res.status(404).json({ message: 'Blog not found', success: false })
        }else{
            return res.status(200).json({updatedBlog,message:'Blog Updated Successfully', success: true})
        }
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports.deleteBlog = async(req,res,next)=>{
    try {
        const {id} = req.params
        const result = await blogServices.deleteBlog(id)
        if(!result){
            return res.status(404).json({ message: 'Blog not found', success: false })
        }
        res.status(200).json({message: 'Blog deleted successfullty', success: true})
    } catch (err) {
        console.error(err) 
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}