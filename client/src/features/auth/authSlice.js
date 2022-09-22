import authService from "./authService"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: user? user:null, 
    message: '',
    avatars: null
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

export const setAvatar = createAsyncThunk("auth/setAvatar", async(payload, thunkAPI)=> {
              
        try {
            const avatar = thunkAPI.getState().auth.avatars

            const data = {
                id : thunkAPI.getState().auth.user._id,
                avatar: avatar[payload]
            }

            const token = thunkAPI.getState().auth.user.token

            return await authService.setAvatar(data, token)
        }
        catch(err) {
            const message = err.response && err.response.data && err.response.data.message || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }


} )

export const getAvatars = createAsyncThunk("auth/getAvatars", async(_,thunkAPI)=> {

    try {
        return await authService.getAvatars()
    }
    catch(err) {
        const message = err.response && err.response.data && err.response.data.message || err.message ||err.toString()
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

        .addCase(setAvatar.pending, (state)=> {
            state.isLoading= true

        })
        .addCase(setAvatar.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(setAvatar.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message= action.payload
        })
        .addCase(getAvatars.pending, (state)=> {
            state.isLoading=true
            
        })
        .addCase(getAvatars.fulfilled, (state, action)=> {
            state.isLoading = false
            
            state.avatars = action.payload

        })
        .addCase(getAvatars.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message= action.payload

        })
    }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;