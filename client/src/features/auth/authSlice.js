import authService from "./authService"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: user? user:null, 
    message: ''
}

export const register = createAsyncThunk('auth/register',async (payload, thunkAPI)=> {
        try {
            return await authService.register(payload)
        }
        catch (err){
            const message = (err.response && err.response.data && err.response.data.message)||err.message ||err.toString()
            return thunkAPI.rejectWithValue(message)
        }



}
)
export const login = createAsyncThunk('auth/login', async(payload, thunkAPI)=> {

    try {return await authService.login(payload)}
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)||err.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        reset: (state)=> {
            state.isError= false
            state.isSuccess= false
            state.isLoading= false
            state.user= null 
            state.message= ''
        }
    },

    extraReducers: (builder)=> {
        builder.addCase(register.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(register.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(login.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;