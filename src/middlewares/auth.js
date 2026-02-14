const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../../constant")
const User = require("../models/User")

const auth = async(req,res,next)=>{
    try {
         const {token} = req.cookies
         const decodedMessage =  jwt.verify(token,SECRET_KEY)
         const {_id} = decodedMessage 
         const user = await User.findById(_id)
         if(!user){
             throw new Error("User not found ! 😓")
         }
        req.user = user 
        next()
        
    } catch (error) {
        res.status(400).send("Error 🫠 :"+error.message)
        
    }
}

module.exports = auth