const messageModel = require("../models/messageModel")
const userModel = require("../models/userModel")
module.exports.addMessage = async (req, res)=> {

    const {from, to, message, userPic, nickname} = req.body
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
        res.status.json({message: `One of the fields are empty`})
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
                                "messages": "$message"
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
                         messages: 1
                      
 
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
                         "messages": {
                            "$push" : "$message"
                        },
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
                         "messages": {
                            "$push" : "$message"
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
    const {from, to} = req.body
    
    if (from && to) { 
        const chatMessages= await messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt:1})
        if (chatMessages){
            const projectedMsgs = chatMessages.map((msg)=> {
              return {
                fromSelf: msg.sender.toString() === from,
                message:msg.message
              }  
            })
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