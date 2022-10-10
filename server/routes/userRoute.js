const userModel = require("../models/userModel");
const express = require("express");
const router = express.Router();
const {reg, loginUser, getUser,getUsers, setAvatar, updateUser} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/", getUsers)
router.post("/register", reg )
router.post("/login", loginUser)
router.put("/update", updateUser)
router.post("/getUser", getUser)
router.post("/setAvatar", setAvatar)



module.exports= router