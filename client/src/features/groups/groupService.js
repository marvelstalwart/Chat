import axios from "axios"
const getGroupsURL = "http://localhost:5000/api/groups/get"
const createGroupURL = "http://localhost:5000/api/groups/create"
const getGroupMsgsURL = "http://localhost:5000/api/groups/messages/get"
const getMembersURL ="http://localhost:5000/api/groups/members/get"
const setAdminURL = "http://localhost:5000/api/groups/admins/add"
const removeAdminURL = "http://localhost:5000/api/groups/admins/remove"
const leaveGroupURL = "http://localhost:5000/api/groups/leave"
const removeMemberURL = "http://localhost:5000/api/groups/members/remove"
const addMembersURL = "http://localhost:5000/api/groups/members/add"
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
const getMembers = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(getMembersURL, payload, config )
    return response.data
}

const getMessages = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(getGroupMsgsURL, payload, config )
    return response.data
}



const setAdmin= async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(setAdminURL, payload, config )
    return response.data

}
const removeAdmin= async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(removeAdminURL, payload, config )
    return response.data

}
const removeMember= async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(removeMemberURL, payload, config )
    return response.data

}

const leaveGroup = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(leaveGroupURL, payload, config )
    return response.data
}

const addMembers = async(payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
       
    }
    const response = await axios.post(addMembersURL, payload, config )
    return response.data
}

const groupService = {
    getGroups,
    createGroup,
    getMessages,

    getMembers,
    setAdmin,
    removeAdmin,
    removeMember,
    leaveGroup,
    addMembers
}

export default groupService