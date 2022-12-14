const express = require("express")
const router = express.Router()
const{createGroup,getMembers, getUserGroups, getGroups, updateGroup,leaveGroup, removeMembers,removeAdmins, addMembers, addAdmins, addGroupMessage, messages} = require("../controllers/groupsController")
const {protect} = require("../middleware/authMiddleware")

router.post("/create", createGroup)
router.post("/update", updateGroup)
router.post("/leave", leaveGroup)
router.post("/members/remove", removeMembers)
router.post("/admins/remove", removeAdmins)
router.post("/admins/add", addAdmins)
router.post("/get", getGroups)
router.post("/members/add", addMembers)
router.post("/messages/new",addGroupMessage)
router.post("/messages/get",messages)
router.post("/members/get", getMembers)
  module.exports= router  