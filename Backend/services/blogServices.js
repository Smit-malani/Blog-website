const blogModel = require('../models/blogModel')

module.exports.getAllBlogs = ()=>{
    const blogs = blogModel.find()
    return blogs
}

module.exports.getBlogById = (id)=>{
    const blog = blogModel.findById(id)
    return blog
}

module.exports.createBlog = (title,description,draft)=>{
    const blog = blogModel.create({
        title,
        description,
        draft
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