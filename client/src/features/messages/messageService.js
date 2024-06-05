 import axios from "axios"
const addMessageURI = "https://chat-278i.onrender.com/api/messages/new"
const getChatURL = "https://chat-278i.onrender.com/api/messages/chat"
const getChatsURL = "https://chat-278i.onrender.com/api/messages/getchats"
const getGroupChatsURL = "https://chat-278i.onrender.com/api/groups/messages/get"
const sendGroupMsgURL = "https://chat-278i.onrender.com/api/groups/messages/new"
const  newMessage = async (payload, token)=> {

   const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
   
}

const  response = await axios.post(addMessageURI, payload,config)

return response.data



}

const getChat = async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
  
        
    const response = await axios.post(getChatURL, payload, config)
    
     return response.data
}


const getChats = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const user= {
        currentUserId: payload._id
    }
  

    const response = await axios.post(getChatsURL,user, config)
    return response.data

}

const getGroupChats = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(getGroupChatsURL, payload, config )
    return response.data
}

const sendGroupChat = async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(sendGroupMsgURL, payload, config )
    return response.data

}


const messageService = {
    newMessage,
    getChat,
    getChats,
    getGroupChats,
    sendGroupChat
}


export default messageService