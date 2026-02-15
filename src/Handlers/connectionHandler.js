const User = require("../models/User")
const Connection = require("../models/Connection")

const sendConnection = async(req,res)=>{
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
}

const DecisionConnection = async(req,res)=>{
    try {
        const loggedInUser = req.user
        const status = req.params.status
        const requestId = req.params.requestId

        
        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : "Invalid status type ! "
            })
        }

        const conn = await Connection.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        if(!conn){
            return res.status(404).json({
                message : "Connection Request not found"
            })
        }
        conn.status = status
        const data = await conn.save()
        return res.json({
            message :"Connection Request "+ status,
            data
        })


        
        
    } catch (error) {
        res.status(500).json({
            message : "Error"+error.message
        })
    }

}

module.exports ={sendConnection,DecisionConnection}