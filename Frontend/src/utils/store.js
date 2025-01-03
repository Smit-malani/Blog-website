import {configureStore} from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import selectedBlogSlice from './slices/selectedBlogSlice'

const store  = configureStore({
    reducer : {
        user: userSlice,  
        currentBlog: selectedBlogSlice      
    }
})

export default store 