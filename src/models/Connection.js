const mongoose = require("mongoose")
const User = require("./User")

const connectionSchema = new mongoose.Schema({
    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status :{
        type : String,
        enum :{
            values : ["ignored","interested","accepted","rejected"],
            message : `{VALUE} is incorrect status type`
        }
    }
},{timestamps : true})

connectionSchema.index({fromUserId : 1, toUserId:1})

connectionSchema.pre("save",function(){
    const crequest = this
    if(crequest.fromUserId.equals(crequest.toUserId)){
        throw new Error("can't send request to yourself ")

    }
    
})

const Connection = new mongoose.model("Connection",connectionSchema)
module.exports = Connection