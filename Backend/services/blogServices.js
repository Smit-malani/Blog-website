const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')

module.exports.getAllBlogs = ()=>{
    const blogs = blogModel.find({draft : false}).populate({path: "creater", select : "-password"}).populate({path: "likes", select: "name email"})
    return blogs
}

module.exports.getBlogById = (blogId)=>{
    const blog = blogModel.findOne({blogId}).populate({path: "comment", populate: {path: "user", select: "name email"}}).populate({path: "creater", select: "name email"})        
    return blog
}

module.exports.createBlog = (title, description, draft, creater, secure_url, public_id, blogId)=>{
    const blog = blogModel.create({
        title,
        description,
        draft,
        creater,
        image: secure_url,
        imageId: public_id,
        blogId
    })   
    
    return blog
}

module.exports.updateBlog = (id,updates)=>{
    const updatedBlog = blogModel.findByIdAndUpdate(id,{$set:updates},{new:true, runValidators: true})
    return updatedBlog
}

module.exports.deleteBlog = (id)=>{
    const deletedBlog = blogModel.findByIdAndDelete(id)
    return deletedBlog
}

module.exports.isUser = (creater)=>{
    const isUser = userModel.findById(creater)
    return isUser
}