const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors")
const userRoute = require("./routes/userRoute")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const PORT = process.env.PORT
const CONN = process.env.CONN
app.use("/api/users", userRoute)

mongoose.connect(CONN, {useNewUrlParser:true, useUnifiedTopology: true} )
.then (()=> app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)))
.catch((err)=> console.log(err.message))
