import axios from "axios"
const getGroupsURL = "http://localhost:5000/api/groups/get"
const createGroupURL = "http://localhost:5000/api/groups/create"

const getGroups = async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    
     
    const response = await axios.post(getGroupsURL, payload, config)
    return response.data

}
const createGroup = async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(createGroupURL, payload, config )
    return response.data
    
}
const groupService = {
    getGroups,
    createGroup
}

export default groupService