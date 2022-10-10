import axios from "axios";
const USERS_URL="http://localhost:5000/api/users"
const USER_URL ="http://localhost:5000/api/users/getUser"
const getUsers = async(payload, token)=> {
    
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
             const response = await axios.post(USERS_URL, payload, config)
        return response.data
}

const getUser = async (payload, token)=> {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(USER_URL, payload, token)
    return response.data
}
const usersService = {
    getUsers,
    getUser
}

export default usersService;