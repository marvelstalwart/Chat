const mongoose = require("mongoose")
;
const Schema = mongoose.Schema;





const messageSchema = new Schema ({

 message: {type: String, required: true},
 users: {type: Array, required:true, default: null},
 groupId: {type: Schema.Types.ObjectId,  ref: "Groups", default: null},
sender: {type: Schema.Types.ObjectId, ref: "Users", required: true},
to: {type: Schema.Types.ObjectId, ref: "Users", default: null},



}
, {
    timestamps:true
}
)

const messageModel = mongoose.model('Messages', messageSchema)

module.exports= messageModel;