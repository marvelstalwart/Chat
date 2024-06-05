import axios from "axios"
import { Buffer } from "buffer";

const REGURL = "https://chat-278i.onrender.com/api/users/register";
const LOGINURL = "https://chat-278i.onrender.com/api/users/login";
const AVATARURL = "https://chat-278i.onrender.com/api/users/setAvatar";
const UPDATE_URL = "https://chat-278i.onrender.com/api/users/update"

const register = async (payload)=> {
    const response = await axios.post(REGURL, payload)
    return response.data
}
const login = async (payload)=> {

    const response = await axios.post(LOGINURL, payload)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}
const logout = ()=> {
    return localStorage.removeItem('user')
}

const updateUser = async (payload, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(UPDATE_URL, payload, config)
    return response.data
}


const setAvatar = async(payload, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(config)


        const response = await axios.post(AVATARURL, payload, config)
            
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            
            return response.data


}

const authService = {
    register,
    login,
    logout,
    setAvatar,
    
    updateUser
}
export default authService;