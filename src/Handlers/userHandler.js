const User = require("../models/User")

const profile = async(req,res)=>{
   try {
     const _id = req.user._id
     const user =await  User.findById(_id)
     if(user)
         res.status(200).json({
           message : "User found successfull",
           data : user
          })
     else 
        res.status(404).json({
    message : "User not found ! "})
    
   } catch (error) {
    res.send("Error :"+error.message)
    
   }
}

module.exports = {profile}