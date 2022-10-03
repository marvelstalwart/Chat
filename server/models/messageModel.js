const mongoose = require("mongoose")
;
const Schema = mongoose.Schema;





const messageSchema = new Schema ({

 message: {type: String, required: true},
 users: {type: Array, required:true},
 
sender: {type: Schema.Types.ObjectId, ref: "Users"},
to: {type: Schema.Types.ObjectId, ref: "Users"},



}
, {
    timestamps:true
}
)

const messageModel = mongoose.model('Messages', messageSchema)

module.exports= messageModel;