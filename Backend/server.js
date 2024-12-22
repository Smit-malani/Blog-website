const express = require('express');
const app = express();
app.use(express.json());


const blogs = []

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/blogs', (req, res) => {
    let publicBlogs = blogs.filter(blog => blog.draft === false)
    res.status(200).send({publicBlogs})
})

app.get('/blogs/:id', (req, res) => {
    let filteredBlog = blogs.filter(blog => blog.id == req.params.id)
    
    res.status(200).send({filteredBlog})
})

app.post('/blogs', (req, res) => {
    blogs.push({...req.body , id: blogs.length + 1})
    res.status(201).json({message : 'Blog created successfully'})
})

app.patch('/blogs/:id', (req, res) => {
    const {id} = req.params

    const  index = blogs.findIndex(blog => blog.id == id)
    blogs[index] = {...blogs[index], ...req.body}
    res.status(200).json({message: 'Blog updated successfully'}) 
})

app.delete('/blogs/:id', (req, res) => {
    const {id} = req.params

    const  index = blogs.findIndex(blog => blog.id == id)   
    blogs.splice(index, 1)
    res.status(200).json({message: 'Blog deleted successfully'})
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});