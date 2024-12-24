const express = require('express');
const connectDB = require('./DB/db.js');
const app = express();
const userRoutes = require('./routes/userRoutes.js')
const cors = require('cors');

connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//blogs routes
const blogs = []
app.get('/blogs', (req, res) => {
    try {
        if(blogs.length === 0 ){
            return res.status(400).json({message: 'No Blogs', success: false})
        }else{
            let publicBlogs = blogs.filter(blog => blog.draft === false)
            return res.status(200).send({publicBlogs})
        }      
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})

app.get('/blogs/:id', (req, res) => {
    try {
        const {id} = req.params
        let filteredBlog = blogs.filter(blog => blog.id == id)
        if(filteredBlog.length === 0){
            return res.status(400).json({message: 'No Blogs for this Auther', success: false})
        }else{
            return res.status(200).send({filteredBlog})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})

app.post('/blogs', (req, res) => {
    try {
        blogs.push({...req.body , id: blogs.length + 1})
        return res.status(201).json({message : 'Blog created successfully'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})

app.patch('/blogs/:id', (req, res) => {
    try {
        const {id} = req.params
        const  index = blogs.findIndex(blog => blog.id == id)
        blogs[index] = {...blogs[index], ...req.body}
        return res.status(200).json({message: 'Blog updated successfully'}) 
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})

app.delete('/blogs/:id', (req, res) => {
    try {
        const {id} = req.params
        const  index = blogs.findIndex(blog => blog.id == id) 
        blogs.splice(index, 1)
        return res.status(200).json({message: 'Blog deleted successfully'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
   
})

app.use('/users',userRoutes)

//users routes
// app.post('/user',async(req,res)=>{
//     try {
//         const {name, email, password} = req.body
//         if(!name && !email && !password ){
//             return res.status(400).json({message : 'Please enter all details',success: false})
//         }else{
//             const newUser = await userModel.create({
//                 name,
//                 email,
//                 password
//             })
//             return res.status(201).json({message: 'user created successfully', success:true,newUser})
//         }    
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: 'Internal Server Error', success: false });
//     }
// })


// app.get('/user',(req,res)=>{
//     try {
//         if(users.length === 0){
//             return res.status(400).json({message: 'No Users', success: false})
//         }else{
//             return res.status(200).json({users,message: 'users fetch successfully'})
//         }  
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ message: 'Internal Server Error', success: false });
//     }
// })

// app.get('/user/:id',(req,res)=>{
//     try {
//         const {id} = req.params
//         const searchedUser = users.filter(user => user.id == id)
//         if(searchedUser.length === 0 ){
//             return res.status(404).json({message: 'No Such User Found', success: false})
//         }else{
//             return res.status(200).json({searchedUser, message: 'Searched user'})
//         }
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ message: 'Internal Server Error', success: false });
//     }
// })

app.patch('/user/:id',(req,res)=>{
    try {
        const index = users.findIndex(user => user.id == req.params.id)
        users[index] = {...users[index], ...req.body}
        return res.status(200).json({message: 'User updated successfully'}) 
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})
   
app.delete('/user/:id',(req,res)=>{
    try {
        const index = users.findIndex(user => user.id == req.params.id)
        users.splice(index, 1)
        return res.status(200).json({message: 'User deleted successfully'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error', success: false });
    }
})

module.exports = app