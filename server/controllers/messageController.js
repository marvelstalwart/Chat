const messageModel = require("../models/messageModel")
const userModel = require("../models/userModel")
module.exports.addMessage = (req, res)=> {

    const {from, to, message, userPic, nickname} = req.body
    if (from && to && message) {
        const newMessage = new messageModel ({
            users: [from, to],
            to,
            sender: from,
            message, 
            userPic
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
            const currentUserMessages= await messageModel.aggregate([
                {$match: {users: currentUserId}},
                {
                    $group: {
                        _id:"$to",
                        text: {$last: "$$ROOT"},
                        
                         
                        
                    },
                    
                }
               
            ]) 

        //  const currentUserMessages= await messageModel.find({users: {$in:currentUserId} }) 

          
            
            res.status(200).json(currentUserMessages)
        //     let chats = await messageModel.find({
        //         users: user
        //     })
        //     if (chats){
        //         return res.status(200).json(chats)

        //     }
        //     else {
        //         return res.status(404).json("Not found")
        //     }
         
        // }
        // else {
        //     return res.status(400).json({message: `No specified user id`})
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