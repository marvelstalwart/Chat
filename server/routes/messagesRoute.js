// const messageModel = require("../models/messageModel");
const express = require("express");
const router = express.Router();
const {addMessage, getMessages} = require("../controllers/messageController")
const { protect } = require("../middleware/authMiddleware");
router.post("/chat", getMessages)
router.post("/new", addMessage )



module.exports= router