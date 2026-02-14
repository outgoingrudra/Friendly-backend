const User = require("../models/User")

const profile = async(req,res)=>{
    const _id = req.user._id
    const user = User.findById(_id)
    res.status(200).json({
        message : "User found successfull",
        data : user
    })
}