const express = require("express")
const  Connection  = require("../models/Connection")
const auth = require("../middlewares/auth")
const User = require("../models/User")

const connectionRouter = express.Router()

connectionRouter.post("/request/send/:status/:toUserId",auth, async(req,res)=>{
    try {
        const fromUserId = req.user._id
        const toUserId =req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["ignored","interested"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : "Invalid status type ! "
            })
        }

        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(404).json({
                message : "User not found ! "
            })
        }

        const existingConnection = await Connection.findOne({
            $or :[
                {fromUserId , toUserId},
                {fromUserId : toUserId,toUserId : fromUserId}
            ]
        })
        if(existingConnection){
            return res.status(400).json({
                message : "Connection Request already exist"
            })
        }

        const ncon = new Connection({
            fromUserId, toUserId , status
        })
        await ncon.save()
        return res.json({
            message : " Connection request made",
            data : ncon
        })
        
    } catch (error) {
                    return res.status(400).json({
                message : "Error :"+error.message
            })
    }
})


connectionRouter.post("/request/review/:status/:requestId",auth,async(req,res)=>{

})
module.exports = connectionRouter