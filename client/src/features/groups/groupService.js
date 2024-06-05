import axios from "axios"
const getGroupsURL = "https://chat-crmw.onrender.com/api/groups/get"
const createGroupURL = "https://chat-crmw.onrender.com/api/groups/create"
const getGroupMsgsURL = "https://chat-crmw.onrender.com/api/groups/messages/get"
const getMembersURL ="https://chat-crmw.onrender.com/api/groups/members/get"
const setAdminURL = "https://chat-crmw.onrender.com/api/groups/admins/add"
const removeAdminURL = "https://chat-crmw.onrender.com/api/groups/admins/remove"
const leaveGroupURL = "https://chat-crmw.onrender.com/api/groups/leave"
const removeMemberURL = "https://chat-crmw.onrender.com/api/groups/members/remove"
const addMembersURL = "https://chat-crmw.onrender.com/api/groups/members/add"
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