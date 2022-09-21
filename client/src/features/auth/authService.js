import axios from "axios"

const REGURL = "http://localhost:5000/api/users/register";
const LOGINURL = "http://localhost:5000/api/users/login";
const register = async (payload)=> {
    const response = await axios.post(REGURL, payload)
    return response.data
}
const login = async (payload)=> {

    const response = await axios.post(LOGINURL, payload)
    return response.data
}

const authService = {
    register,
    login
}
export default authService;