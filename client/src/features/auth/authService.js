import axios from "axios"
import { Buffer } from "buffer";
const REGURL = "http://localhost:5000/api/users/register";
const LOGINURL = "http://localhost:5000/api/users/login";
const AVATARURL = "http://localhost:5000/api/users/setAvatar";
const AVATARAPI = "https://api.multiavatar.com/45678945"
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

const setAvatar = async(payload, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        const response = await axios.post(AVATARURL, payload, config)
            return response.data


}
const getAvatars = async ()=> {
    const data = [];
    for (let i=0; i<4; i++) {
        const image = await axios.get(`${AVATARAPI}/${Math.round(Math.random()*1000)}`)
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"))
    }
    return data

}
const authService = {
    register,
    login,
    setAvatar,
    getAvatars
}
export default authService;