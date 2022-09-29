const messageModel = require("../models/messageModel")
module.exports.addMessage = (req, res)=> {

    const {from, to, message} = req.body
    if (from && to && message) {
        const newMessage = new messageModel ({
            users: [from, to],
            sender: from,
            message: message 
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