import authService from "./authService"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    user: user? user:null, 
    message: '',
    updatedUser: '',
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
export const logout = createAsyncThunk("auth/logout", async(_, thunkAPI)=> {

        try {
            return authService.logout()
        }
        catch(err){
            const message = (err.response && err.response.data && err.response.data.message)||err.message
            return thunkAPI.rejectWithValue(message)
        }
})

export const setAvatar = createAsyncThunk("auth/setAvatar", async(payload, thunkAPI)=> {
              
        try {
           
            const data = {
                id : thunkAPI.getState().auth.user._id,
                avatar: payload
            }

            const token = thunkAPI.getState().auth.user.token

            return await authService.setAvatar(data, token)
        }
        catch(err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }


} )

export const updateUser = createAsyncThunk("auth/updateUser", async(payload, thunkAPI)=> {
        try {
            const token = thunkAPI.getState().auth.user.token
       
                return await authService.updateUser(payload, token)

        }
        catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
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

        
        .addCase(logout.pending, (state)=> {
            state.isLoading=true
        })
        .addCase(logout.fulfilled, (state, action)=> {
            
            state.user = null
            

        })
        .addCase(logout.rejected,(state, action)=> {
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
            console.log(action.payload)
            state.user  =action.payload
            
        })
        .addCase(setAvatar.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message= action.payload
        })
        .addCase(updateUser.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            
            state.user = action.payload
        })
        .addCase(updateUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
       
    }
})


export const {reset} = authSlice.actions;
export default authSlice.reducer;