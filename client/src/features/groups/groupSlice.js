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
    group: null,

    

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
export const getMembers = createAsyncThunk ("groups/members", async(payload, thunkAPI)=>{
    try {
        const {token } = thunkAPI.getState().auth.user
        return await groupService.getMembers(payload, token)
    }
    catch(err) {
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


export const setAdmin = createAsyncThunk("groups/admins/add", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.setAdmin(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const removeAdmin = createAsyncThunk("groups/admins/remove", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.removeAdmin(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})
export const addMembers = createAsyncThunk("groups/members/add", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.addMembers(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})
export const removeMember = createAsyncThunk("groups/members/remove", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.removeMember(payload, token)
    }
    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
        return thunkAPI.rejectWithValue(message)
    }

})
export const leaveGroup = createAsyncThunk("groups/leave", async(payload, thunkAPI)=> {
    try {
       
        const {token } = thunkAPI.getState().auth.user
        return await groupService.leaveGroup(payload, token)
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
            updateGroups: (state, action)=> {
                state.groups= action.payload
            },
            addChat: (state, action)=> {
                state.chats = action.payload
                console.log(action.payload)
                console.log(state.chats)
                
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
        .addCase(getMembers.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(getMembers.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.group = action.payload
        })
        .addCase(getMembers.rejected, (state, action)=> {
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
        
        .addCase(setAdmin.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(setAdmin.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(setAdmin.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(removeAdmin.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(removeAdmin.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(removeAdmin.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(addMembers.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(addMembers.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(addMembers.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(removeMember.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(removeMember.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(removeMember.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
        .addCase(leaveGroup.pending,(state)=> {
            state.isLoading =true
        })
        .addCase(leaveGroup.fulfilled, (state, action)=> {
            state.isLoading =false
            state.isSuccess = true
            state.response = action.payload
        })
        .addCase(leaveGroup.rejected, (state, action)=> {
            state.isError = true
            state.isLoading= false
            state.response = action.payload
        })
    }
})
export const {reset, changeGroup, resetGroup, addChat, updateGroups} = groupSlice.actions
export default groupSlice.reducer