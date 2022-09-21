
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

module.exports.protect = async (req, res, next)=> {
  
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, `${process.env.JWT_KEY}`)
            //Get user from token
            req.user = await userModel.findById(decoded.id).select('-password')
            
             next()
        }   
        
        catch (err) { 
           
          return  res.status(401).send('Not authorized')
        }
       
    }  

    if (!token) {
       return res.status(401).send('No token')
    }
}

 