import { createSlice } from "@reduxjs/toolkit"

const selectedblogSlice = createSlice({
    name: "selectedblogSlice",
    initialState: JSON.parse(localStorage.getItem('selectedBlog')) || {},
    reducers: {
        addSelectedBlog(state, action){
            localStorage.setItem("selectedBlog",JSON.stringify(action.payload))
            return action.payload
        },
        removeSelectedBlog(state, action){
            localStorage.removeItem('selectedBlog')
            return {}
        }
    }
})

export const {addSelectedBlog, removeSelectedBlog} = selectedblogSlice.actions
export default selectedblogSlice.reducer