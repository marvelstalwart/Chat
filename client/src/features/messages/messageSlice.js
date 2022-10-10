import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
    chat: null,
    chats:null,
    from: "",
    to: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    response:""
   
    
}


export const newMessage = createAsyncThunk("message/new", async (payload, thunkAPI)=> {
    try {
        const {token}  = thunkAPI.getState().auth.user
        return await messageService.newMessage(payload, token)

    }
     catch (err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
     }
  


})

export const getChat= createAsyncThunk("chat/get", async(payload, thunkAPI)=> {
   
    try {
        const {token } = thunkAPI.getState().auth.user
        
        return await messageService.getChat(payload, token)
    }
    catch(err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message ||err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getChats = createAsyncThunk("chats/get", async(_, thunkAPI)=> {
        try {
            const {token} = thunkAPI.getState().auth.user
            
            const id = thunkAPI.getState().auth.user
            
            return await messageService.getChats(id, token)
        }
        catch(err){
            const message = (err.response && err.response.data && err.response.data.message)||err.message || err.toString()
                return thunkAPI.rejectWithValue(message)
        }

})

export const messageSlice = createSlice({
name:"messsages",
initialState,
reducers: {
        reset: (state)=> {
            state.message= ""
            state.to=""
            state.from=""
            state.response=""
            state.isLoading=""
            state.isError = ""
            state.isSuccess=""
        },
        setId: (state, action)=> {
            state.chat= action.payload
        },
        addMessage: (state, action)=> {
            state.chat = action.payload
        }


},
extraReducers: (builder)=> {
    builder.addCase(newMessage.pending, (state)=> {
        state.isLoading = true
        
    })
    .addCase(newMessage.fulfilled, (state,action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.response = action.payload
    })
    .addCase(newMessage.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.response = action.payload
    })
    .addCase(getChat.pending, (state)=> {
        state.isLoading = true

    })
    .addCase(getChat.fulfilled, (state,action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.chat= action.payload
       
    })
    .addCase(getChat.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.response = action.payload

    })
    .addCase(getChats.pending, (state)=> {
        state.isLoading = true

    })
    .addCase(getChats.fulfilled, (state,action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.chats= action.payload
       
    })
    .addCase(getChats.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.response = action.payload

    })

    
}

    
})
export const {reset, setId, addMessage} = messageSlice.actions;
export default messageSlice.reducer;