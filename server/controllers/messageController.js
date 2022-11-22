const messageModel = require("../models/messageModel")
const userModel = require("../models/userModel")
module.exports.addMessage = async (req, res)=> {
    
    const {from, to, message,} = req.body
    
    if (from && to && message) {
        let newMessage = new messageModel ({
            users: [from, to],
            to,
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
        res.status(400).json({message: `One of the fields are empty`})
    }


} 
    module.exports.getChats= async (req,res)=> {
        const {currentUserId} = req.body
        if (currentUserId) {
         let  currentUserMessages= await messageModel.aggregate([
                //Check for any chat with the current User Id
                 {$match: {users: currentUserId}},
                        {
                            $addFields: {
                                "messages": "$message",
                                "totalUnread": "$isRead"
                            }
                        },
                 //Select the fields we want to retain
                 {
                     "$project": {
                         to: 1,
                         sender:1,
                         message:1,
                         createdAt: 1,
                         users: 1,
                         messages: 1,
                        isRead: 1,
                        totalUnread: {$cond: [{$eq: ['$isRead', false]}, 1, 0]}
 
                     }
                 },
                 //Destructure the users array and sort it so a/b or b/a returns a single array
                 {
 
                     $unwind: "$users"
                 },
                 {
                     $sort: {"users": 1}
                 }, 
                 {
                     $group: {
                         _id: "$_id",
                         "users": {
                             $push: "$users"
                         },
                         "sender": {
                             "$first": "$sender"
                         },
                         "to": {
                             "$first": "$to"
                         },
                         "message": {
                             "$first" : "$message"
                         },
                         "isRead": {
                            "$first": "$isRead"
                         },
                         "messages":  { 
                            "$push": "$message"
                        },
                        "totalUnread": {
                            
                          "$first": '$totalUnread'
                          
                    }
                
                 ,
                         "timeStamp": {
                             "$first" : "$createdAt"
                         }
                     }
                 },
                 {
                     "$sort": {
                         "timeStamp": -1
                     }
                 },
                 //Group by the sorted array
                 {
                     "$group": {
                         "_id": "$users",
                         "sender": {
                             "$first": "$sender"
                         },
                         
                         "to": {
                             "$first": "$to"
                         },
                         "message": {
                             "$first": "$message"
                         },
                         "messages":  { 
                               "$push": "$message"
                            },
                            "totalUnread": {
                            
                                "$sum": '$totalUnread'
                                
                          }
                        
                         ,
                         "timeStamp": {
                             "$first": "$timeStamp"
                         }
 
                     }
                 }
                 
 
                 
             ])
             currentUserMessages = await messageModel.populate(currentUserMessages, {path: "sender", select: 'nickname avatarImage'})
                 currentUserMessages = await messageModel.populate(currentUserMessages, {path: "to", select: 'nickname avatarImage'})
            res.status(200).json(currentUserMessages)
          }
    }

module.exports.getMessages= async (req, res)=> {
    const {from, to, userId} = req.body
    
    if (from && to) { 
        const chatMessages= await messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt:1})
        console.log(from,to)
        //Update read status
        if (chatMessages){

            const updatedMessages =await Promise.all( chatMessages.map( async(msg)=>{
                if (msg.sender.toString() !== from && msg.isRead === false) {
                        
                    return await messageModel.findByIdAndUpdate(
                        { _id: msg._id },
                        {isRead: true},    
                        {new:true}  
                    )
                }
                else{
                    return msg
                }
            
        })) 
   
        const projectedMsgs = updatedMessages.map((msg)=> {
          return {
            fromSelf: msg.sender.toString() === from,
            message:msg.message,
            isRead:msg.isRead
          }  })
        res.status(200).json(projectedMsgs)
        }
        
        else {
            return res.status(200).json("No chats yet!")
        }
    }
    else {
        return res.status(404).json({message: req.body}) 
    }   

}