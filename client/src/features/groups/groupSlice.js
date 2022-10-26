import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
    groups: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    response: null,
    selectedGroup: null,
    chats: null,
    

}

export const getGroups = createAsyncThunk("groups/get", async (_, thunkAPI)=> {
    try {
        const {token } = thunkAPI.getState().auth.user
        const {_id} = thunkAPI.getState().auth.user
        let payload = {
            userId: _id
        }
        return await groupService.getGroups(payload, token)

    }
    catch (err){
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)

    }

})
export const createGroup = createAsyncThunk("groups/new", async(payload, thunkAPI)=> {
    try {
        const {token } = thunkAPI.getState().auth.user
        return await groupService.createGroup(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMessages = createAsyncThunk("groups/messages", async(payload, thunkAPI)=> {
    try {
        
        const {token } = thunkAPI.getState().auth.user
        return await groupService.getMessages(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const sendMsg = createAsyncThunk("groups/sendMsg", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.sendMsg(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})
export const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
            reset: (state)=> {
                state.groups= null
                state.isLoading = false
                state.isSuccess = false
                state.isError = false
                state.response = null
                state.selectedGroup =null
            },
            changeGroup : (state, action)=>{
                state.selectedGroup = action.payload
            },
            resetGroup: (state)=> {
             state.selectedGroup = null   
            },
            addChat: (state, action)=> {
                state.chats = action.payload
            }

    },
    extraReducers: (builder)=> {
        builder.addCase(getGroups.pending, (state)=> {
            state.isLoading = true
            state.isSuccess =false
        })
        .addCase(getGroups.fulfilled, (state, action)=> {
            state.groups = action.payload
            state.isLoading= false
            state.isSuccess = true
        })
        .addCase(getGroups.rejected, (state,action)=> {
            state.isError = true
            state.isLoading = false
            state.response = action.payload
        })
        .addCase(createGroup.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(createGroup.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(createGroup.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(getMessages.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(getMessages.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.chats = action.payload
            
        })
        .addCase(getMessages.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(sendMsg.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(sendMsg.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(sendMsg.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
    }
})
export const {reset, changeGroup, resetGroup, addChat} = groupSlice.actions
export default groupSlice.reducer