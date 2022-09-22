const userModel = require("../models/userModel");
const express = require("express");
const router = express.Router();
const {reg, loginUser, getUsers, setAvatar} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.get("/",protect, getUsers)
router.post("/register", reg )
router.post("/login", loginUser)
router.post("/setAvatar", setAvatar)


module.exports= router