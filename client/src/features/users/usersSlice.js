import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";
import socketIO from 'socket.io-client'
const initialState = {
    users: null,
    user: null,
    onlineUsers: [],
    userLoading: false,
    userError: false,
    userSuccess: false,
    message: '',
    messages: null,
    selectedUser:null,
    
}


export const socket = socketIO.connect('http://localhost:5000')

export const getUsers = createAsyncThunk("users/get", async(payload, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await usersService.getUsers(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)||
        err.message ||err.toString()
        return thunkAPI.rejectWithValue(message)
    }


})

export const getUser = createAsyncThunk("user/get", async(payload, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await usersService.getUser(payload, token)
    }
    catch(err){
       const message= (err.response && err.response.data && err.response.data.message)||
        err.message || err.toString()
        return thunkAPI.rejectWithValue(message)

    }

} )

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        reset: (state) => {
            state.users=null
            state.userLoading= false
            state.userError= false
            state.userSuccess= false
             state.message= ''
        },
        resetChat: (state)=> {
            state.selectedUser =null
        },
        changeChat: (state, action)=> {
            state.selectedUser= action.payload
            
        },
        updateOnlineUsers:(state, action)=> {
            state.onlineUsers=action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state)=> {
            state.userLoading= true

        }) 
        .addCase(getUsers.fulfilled, (state, action)=> {
            state.userLoading= false
            state.userSuccess = true
            state.users = action.payload
        })

        .addCase(getUsers.rejected, (state, action)=> {
            state.userLoading = false
            state.userError= true
            state.message = action.payload
        })
        .addCase(getUser.pending, (state)=> {
            state.userLoading= true

        }) 
        .addCase(getUser.fulfilled, (state, action)=> {
            state.userLoading= false
            state.userSuccess = true
            state.user = action.payload
        })

        .addCase(getUser.rejected, (state, action)=> {
            state.userLoading = false
            state.userError= true
            state.message = action.payload
        })

        
    }
    
})
export const { changeChat, resetChat, updateOnlineUsers} = usersSlice.actions;
export default usersSlice.reducer;