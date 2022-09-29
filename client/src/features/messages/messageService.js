 import axios from "axios"
const addMessageURI = "http://localhost:5000/api/messages/new"
const getChatURL = "http://localhost:5000/api/messages/chat"
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

const messageService = {
    newMessage,
    getChat
}


export default messageService