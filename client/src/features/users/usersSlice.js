import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";
import socketIO from 'socket.io-client'
const initialState = {
    users: null,
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
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
            state.isLoading= false
            state.isError= false
            state.isSuccess= true
           state.message= ''
        },
        resetChat: (state)=> {
            state.selectedUser =null
        },
        changeChat: (state, action)=> {
            state.selectedUser= action.payload
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state)=> {
            state.isLoading= true

        }) 
        .addCase(getUsers.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.users = action.payload
        })

        .addCase(getUsers.rejected, (state, action)=> {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })
        .addCase(getUser.pending, (state)=> {
            state.isLoading= true

        }) 
        .addCase(getUser.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.user = action.payload
        })

        .addCase(getUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isError= true
            state.message = action.payload
        })

        
    }
    
})
export const { changeChat, resetChat} = usersSlice.actions;
export default usersSlice.reducer;