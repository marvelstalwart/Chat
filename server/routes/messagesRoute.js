// const messageModel = require("../models/messageModel");
const express = require("express");
const router = express.Router();
const {addMessage, getMessages, getChats} = require("../controllers/messageController")
const { protect } = require("../middleware/authMiddleware");
router.post("/chat", protect, getMessages)
router.post("/new",protect, addMessage )
router.post("/getchats", getChats)



module.exports= router