const mongoose = require("mongoose")
;
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    nickname: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    isAvatarImageSet: {type: Boolean, default:false},
    avatarImage: {type: String, default: ""},
    about: {type: String, default: "Hi, I'm on Yarn!"}
    
}, {
    timestamps: true,

})

const userModel = mongoose.model('Users', userSchema)

module.exports= userModel;