const express = require('express');
const connectDB = require('./DB/db.js');
const app = express();
const userRoutes = require('./routes/userRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')
const cors = require('cors');

connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1',userRoutes)
app.use('/api/v1',blogRoutes)


module.exports = app