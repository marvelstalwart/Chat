const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

module.exports.getUsers = async(req,res)=> {
       
    try {const users = await userModel.find()
        if(users) {
            res.status(200).json(users)
        }
        else{
            res.status(200).json({message: "No users found"})
        }
        }

        catch(err) {
            res.status(400).json(err.message)
        }
       

}

module.exports.setAvatar = async (req, res)=> {
        try {

        
        const {id, avatar} = req.body
        const updateData = await userModel.findByIdAndUpdate(id, {
            isAvatarImageSet: true,
            avatarImage: avatar
        })
        
       
        return res.status(200).json(updateData)
    }
    catch(err){
        return res.status(400).json({message: err.message})
    }

    // const user = await userModel.findById(id)

    //     if (user) {
    //         user.avatarImage = avatarImage
    //         user.setAvatar = true
    //         try {
    //          await user.save()
    //          res.status(200).json({message: "Successfully updated avatar"})
    //         }
    //         catch (err) {
    //         res.status(400).json({message: err.message})
    //         }
            
           
    //     }  
    //     else { 
    //         return res.status(404).json ({message: "User not found"})
    //     } 
}


module.exports.reg = async (req, res)=> {
 
    const {nickname, email, password} = req.body
    const emailExists = await userModel.findOne({email});
    if (!nickname|| !email || !password ) {
       return res.status(400).json({message: "One of the fields are empty" })
    } else {
        if (emailExists) {
            return res.status(400).json({message: "This email has already been registered" })
        }
        const userExists = await userModel.findOne({nickname});
        if (userExists){
            return res.status(400).json({message: "Nickname has been selected" })
        }
    
        //Hash the password
        else {
            const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new userModel ({
                nickname,
                email,
                password: hashedPassword
        })
        newUser.save()
        .then((user)=> {
            delete password
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                pass: password,
                token: generateToken(user.id)
            })

        })
        .catch((err)=> {
            res.status(400).json({message: "An error occured" })
        })
        }
        

    }


}


module.exports.loginUser = async (req, res)=> {
    const {email, password} = req.body;
  
        userModel.findOne({email})
        .then((user)=> { bcrypt.compare(password, user.password)
            .then((pass)=> {
                    if (pass) {
                        res.status(200).json({
                            _id: user.id,
                            name: user.name,
                            email: user.email,
                            password: password,
                           
                            token: generateToken(user.id)
                        })
                    }
                    else {
                        res.status(400).send("Password error")
                    }
               
                
            })
           
        })
        .catch(err=> res.status(404).json(`Invalid User`))
   
        
   
}

const generateToken  = (id)=> {
    return jwt.sign({id}, `${process.env.JWT_KEY}`, {expiresIn: '2d',})
}
