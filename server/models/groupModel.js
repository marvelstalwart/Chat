const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {type: String, required: true},
    members: [{type: Schema.Types.ObjectId, required: true, ref: 'Users'}],
    
    creator: {type:Schema.Types.ObjectId, required: true },
    admins:[{type:Schema.Types.ObjectId, required: true}],
    groupPhoto: {type: String, default:""}

}, {
    timestamps: true
})

const groupModel = mongoose.model('Groups', groupSchema)
module.exports = groupModel;