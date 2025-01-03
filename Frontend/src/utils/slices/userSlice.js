import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "userSlice",
    initialState: JSON.parse(localStorage.getItem('user')) || {token: null},
    reducers: {
        login(state, action){
            localStorage.setItem("user",JSON.stringify(action.payload))
            return action.payload
        },
        logout(state, action){

        }
    }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer