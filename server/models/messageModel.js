const mongoose = require("mongoose")
;
const Schema = mongoose.Schema;





const messageSchema = new Schema ({

 message: {type: String, required: true},
 users: {type: Array, required:true},
sender: {type: String, required: true},
to: {type: String, required: true},
userPic: {type:String, required:true },


}
, {
    timestamps:true
}
)

const messageModel = mongoose.model('Messages', messageSchema)

module.exports= messageModel;