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
      }).populate("fromUserId",["name","imageUrl","bio","city"])
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


const ConnectedProfiles = async(req,res)=>{
   const loggedInUser = req.user
   try {
       const friends = await  Connection.find({
           $or:[
            {toUserId : loggedInUser._id , status : "accepted"},
            {fromUserId : loggedInUser._id , status : "accepted"},
           ]
       }).populate("fromUserId","name  bio  imageUrl").populate("toUserId","name  bio  imageUrl")
       

       const data = friends.map((row)=>{
         if(row.fromUserId._id.toString() == loggedInUser._id.toString())
            return row.toUserId
         return row.fromUserId
       })

       res.json({
         message : "all connected people here !",
         data
       })
   } catch (error) {
      res.status(500).json({
         message : "Error !"+error.message,
      
       })
      
   }

}


const feeds = async(req,res)=>{
   try {
      const loggedInUser = req.user
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page-1)*limit

      if(limit > 100)
         return  res.json({
         message : " limit is too high"
         })

      const connections = await Connection.find({
         $or :[
              {fromUserId : loggedInUser._id} ,
              {toUserId : loggedInUser._id} 
         ]
      })

      const hideUsersFromFeed = new Set()
      connections.forEach((req)=>{
         hideUsersFromFeed.add(req.fromUserId.toString())
         hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
         $and :[
            {_id : {$nin : Array.from(hideUsersFromFeed)}},
            { _id : {$ne : loggedInUser._id}}
         ]
        }).select("name bio imageUrl").skip(skip).limit(limit)

        res.json({
         message : "feed fetched ",
         data : users
        })




   } catch (error) {
       res.json({
         message : "feed not fetched ",
         
        })
      
   }

}

module.exports = {profile, connectionRequests,ConnectedProfiles,feeds}