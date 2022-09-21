import axios from "axios";
const USERS_URL="http://localhost:5000/api/users"


const getUsers = async(token)=> {
    
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
             const response = await axios.get(USERS_URL, config)
        return response.data
}
const usersService = {
    getUsers
}

export default usersService;