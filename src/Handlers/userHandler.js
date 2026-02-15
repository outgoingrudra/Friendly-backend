const Connection = require("../models/Connection")
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


const connectionRequests = async(req,res)=>{
   try {
      const loggedInUser = req.user
      const connections = await Connection.find({
         toUserId : loggedInUser._id,
         status : "interested"
      })
      res.json({
         message : "Data fetched !",
         data : connections
      })
      
   } catch (error) {
      res.status(500).json({
         message : " Error : "+ error.message
      })
      
   }
}
module.exports = {profile, connectionRequests}