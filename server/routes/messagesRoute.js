// const messageModel = require("../models/messageModel");
const express = require("express");
const router = express.Router();
const {addMessage, getMessages, getChats} = require("../controllers/messageController")
const { protect } = require("../middleware/authMiddleware");
router.post("/chat", protect, getMessages)
router.post("/new", addMessage )
router.post("/getchats",protect, getChats)




module.exports= router