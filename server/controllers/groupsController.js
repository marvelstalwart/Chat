const mongoose = require("mongoose")
const groupModel = require( "../models/groupModel");
const messageModel = require("../models/messageModel")
const ObjectId = mongoose.Types.ObjectId;


module.exports.createGroup = async(req, res)=> {
    let {name, creator, members} = req.body
    members.push(creator)
    if (name && creator && members) {
        
        let newGroup = new groupModel({
            name,
            creator,
            members:members,
            admins: creator
            
            
            
            
        })
        
        newGroup.save().then((message)=> {
            res.status(201).json(`Successfully created the group ${message}`)
        })
        .catch(err=> res.status(400).json({message: err.message, members: members}))
    }
    else {
        res.status(400).json ({message: "some fields are empty"})
    }
    
}

//Send new Group Message with Member Rights
module.exports.addGroupMessage = async (req, res)=> {
    const {groupId, from, message, userId} = req.body
    if (groupId && from && message && userId) { 
    const isMember = await groupModel.find({
        _id: groupId,
        members: userId
    })
    if (isMember && isMember.length) {
        
            let newMessage = new messageModel ({
                
                groupId : groupId,
                sender: from,
                message, 
                
        })
        
        newMessage.save()
        .then((message)=> {
            res.status(201).json(`Successfully created ${message}`)
        }) 
        .catch((err)=>{
            res.status(404).json({message: `An error occured ${err.message}`})
        })
    
        

    }
    else {
        res.status(401).json({message: "You are not a member of this group"})
    }
}
else {
    res.status(400).json("Empty fields")
}

}

//Get Group Messages with Member Rights 
module.exports.messages = async (req,res)=> {
    const {groupId, userId} = req.body
    if (groupId && groupId){
        const isMember = await groupModel.find({
            _id: groupId,
            members: userId
        })  
        if (isMember && isMember.length){
                let messages = await messageModel.find({
                    groupId: groupId
                })
                
                messages = await messageModel.populate(messages, {path: "sender", select: "nickname avatarImage"})
                messages = messages.map((msg)=> {
                    return {
                        fromSelf: msg.sender._id.toString() === userId,
                        message: msg.message,
                        details: msg.sender
                    }
                })
                res.status(200).json(messages)
                
            }
        else {
            res.status(401).json({message: "Not a member"})
        }

    }
    else {
        res.status(400).json({message: "Empty fields"})
    }


}

//Get User Groups and respective Messages
module.exports.getGroups = async (req,res)=> {
    const { userId} = req.body
    if (userId) {

        let groups = await  groupModel.find({
            members: userId
        }) 
        if (groups && groups.length){
           
            
        const projectedGroupMsgs = await Promise.all(groups.map( async (group)=>  {
            
            let messages= await messageModel.find({
                groupId: group._id
            })
                if (messages && messages.length) {

                    return await messageModel.aggregate([
                       {$match: {groupId: ObjectId(group._id)}},
                       {$sort: {
                           "timeStamp": -1
                       }},
                       {
                           $group: {
                               _id: "$groupId",
       
                               "name": {
                                  "$first": `${group.name}`
                               },
                               "lastMessage": {
                                   "$last": "$message"
                               },
                               "messages": {
                                   "$push" : "$message"
                               },
                               "groupId": {
                                   "$first": "$groupId"
                               }
                           }
                       }
                   ])
                }
                else {
                    return await groupModel.aggregate([
                        {$match: {_id: ObjectId(group._id)}},
                        {
                            "$project": {
                                _id: 1,
                                name: 1,
                                
                             
        
                            }
                        },
                    ])
                }
            
           
       
                
            

        }))
    
        return res.status(200).json(projectedGroupMsgs)
       
    }
    else {
        res.status(404).json({message: "User does not belong to any group"})
    }
       
    }
    
    else {
        res.status(400).json({message: "Empty fields"})
    }

}
//Update Group with Admin rights
module.exports.updateGroup = async(req,res)=> {
    const {userId, name, groupId} = req.body
    if (userId && name, groupId) {
        const isAdmin = await groupModel.find({_id: groupId,
        admins: userId
    })

    if (isAdmin && isAdmin.length) {
        groupModel.findByIdAndUpdate(groupId, {name})
        .then((result)=> res.status(200).json(`Successfully Updated ${result}`))
           .catch((err)=> res.status(400).json({message: err.message}))

    }
    else {
        res.status(401).json("Unauthorized")
    }
       
    }
   
   
         else {
            res.status(400).json("Empty fields")
         }

}
//Add a new Admin with Creator Rights
module.exports.addAdmins = async(req,res)=> {
    const {groupId, admins, userId} = req.body
    if (userId && groupId && admins) {
        const isCreator = await groupModel.find({_id: groupId,
            creator: userId
        })
        if (isCreator && isCreator.length) {
                groupModel.updateOne({_id: groupId}, {
                    $push: {admins}
                }).then((result)=> res.status(200).json(result))
                .catch(err=> res.status(404).json({message: err.message}))
        }
        else {
            res.status(401).json("Unauthorized")
        }
        

    }
    else {
        res.status(400).json({message: "Empty Fields"})
    }
    
    
}
//Get Members with Membership rights
module.exports.getMembers = async (req,res)=> {
    const {userId, groupId} = req.body 
    if (userId && groupId) {
        const isMember = await groupModel.find({
            members: userId
        })

        if (isMember && isMember.length) {
           
             groupModel.aggregate([
                    
                    {$match: {_id: ObjectId(groupId)} },

                    {
                        $project: {
                            _id: 0,
                            members: 1,
                            admins:1,
                            creator: 1
                            
                        }
                    }

                       


                ]).then((result)=> {

                groupModel.populate(result, {path: "members", select: "nickname avatarImage about"})
                .then(([members])=> {
                    res.status(200).json(members)
                    
                })
                })
                

        }
        else {
            res.status(401).json({message: "Not authorized"})
        }
    }
    else {
        res.status(400).json({message: "Bad request"})
    }
}

//Add new members with Admin rights
module.exports.addMembers = async(req, res)=> {
    const {groupId, members, userId} = req.body
    if (userId && groupId && members ) {
        const isAdmin = await groupModel.find({
            _id: groupId,
            admins: userId
        })
        if (isAdmin && isAdmin.length) {
            groupModel.updateOne({_id: groupId}, {
                $push:  {members}
            })
            .then((result)=> res.status(200).json(`Successfully Updated ${result}`))
               .catch((err)=> res.status(400).json({message: err.message}))
            
        }   

        else {
            res.status(401).json({message: "Unauthorized"})
        }
         
         }
         else {
            res.status(400).json({message: "Empty fields"})
        }
}

//Remove members from group with Admin rights
module.exports.removeMembers = async(req, res)=> {
    const {groupId, userId, members} = req.body
    if (groupId && userId && members) {
       const isAdmin = await groupModel.find({
        _id: groupId,
        admins: userId
       })
      
         
        if (isAdmin && isAdmin.length) {
            try{
            
                const updatedMembers =  await groupModel.updateOne({_id: groupId}, {
                    $pull: {members: {$in: members}}
                })
                res.status(200).json(updatedMembers)
            }
            catch(err) {
                res.status(400).json({message: err.message})
            }
        }
        else {
            res.status(401).json({message: "Not authorized"})
        }
         }
         else {
            res.status(400).json({message: "Empty fields"})
        }
}

//Dismiss Admins with creator rights
module.exports.removeAdmins  = async(req, res)=> {
    const {userId, admins, groupId} = req.body
    if (userId && admins) {

        const isCreator = await groupModel.find({_id: groupId,
            creator: userId
            })
            if (isCreator && isCreator.length) {
                groupModel.updateOne({_id: groupId}, { 
                $pull: {admins: {$in: admins}}
                }).then((result)=> {
                    res.status(200).json({result})
                }).catch(err=> res.status(400).json({message: err.message}))
            } 
            else {
                res.status(401).json({message: "Unauthorized"})
            }
       
    }
    else {
        res.status(400).json({message: "Empty fields"})
    }
} 
 
