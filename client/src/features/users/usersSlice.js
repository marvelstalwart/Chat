import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";
const initialState = {
    users: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const getUsers = createAsyncThunk("users/get", async(_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await usersService.getUsers(token)
    }
    catch(err) {
        const message = err.response && err.response.data && err.response.data.message||
        err.message ||err.toString()
        return thunkAPI.rejectWithValue(message)
    }


})

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

        
    }
    
})
export const {reset} = usersSlice.actions;
export default usersSlice.reducer;