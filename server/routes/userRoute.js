const userModel = require("../models/userModel");
const express = require("express");
const router = express.Router();
const {reg} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", reg )



module.exports= router