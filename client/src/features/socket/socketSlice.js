import {createSlice, getDefaultMiddleware} from "@reduxjs/toolkit"

const initialState = {
    stream: null,
    calling: false,
    receivingCall: false,
    callerSignal: null,
    callAccepted: false,
    callEnded: false,
    me: "",
    caller: "",
    name: "" ,
    callerPhoto:"", 
    callScreen: false,
    myVideo: null,
    userVideo:  null

  }


export const socketSlice  = createSlice({
    name: "socket",
    initialState,
   
    reducers: {
        incomingCall: (state, action)=> {
            state.callVideo= true
            state.receivingCall = true
            state.caller = action.payload.caller
            state.callerPhoto= action.payload.callerPhoto
            state.callerSignal = action.payload.callerSignal
            state.name = action.payload.name
       
            
        },
        showCallScreen: (state)=> {
            state.callScreen = true
        },
        setCalling: (state)=> {
            state.calling = true
        },
        endCall: (state)=> {
            state.callVideo = false
            state.calling = false
            state.callScreen = false
            state.receivingCall = false
            state.callEnded = true
            state.callAccepted =false
            
        },
        setStream: (state, action)=> {
           console.log("This is the action payload"+action.payload)
            state.stream = action.payload
        },

        acceptCall: (state)=> {
           state.callAccepted = true
            state.receivingCall = false
        },
        
        answer: (state)=> {
            state.callAccepted = true
            state.receivingCall = false
            state.callScreen = true
        }



    }

})

export const {incomingCall, setCalling, showCallScreen, endCall, setStream, acceptCall, answer} = socketSlice.actions
export default socketSlice.reducer
