import axios from "axios";
const USERS_URL="https://yarn-6st0.onrender.com/api/users"
const USER_URL ="https://yarn-6st0.onrender.com/api/users/getUser"
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

    const response = await axios.post(USER_URL, payload, config)
    return response.data
}
const usersService = {
    getUsers,
    getUser
}

export default usersService;