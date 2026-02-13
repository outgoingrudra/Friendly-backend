const mongoose = require("mongoose")
const validator = require("validator")

const userSchema =  new mongoose.Schema({
    name :{
        type:String,
        required : true,
        lowercase : true ,
        trim : true,
        maxlength:50,
    },
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true ,
        trim : true,
        maxlength : 50,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid Email")
        }
    },
    mobile : {
        type:String,
        trim : true,
        minlength : 7,
        maxlength : 15,

    },
    city : {
        type:String,
        lowercase:true,
        trim: true,

    },
    password :{
        type: String,
        required:true,
        minlength: 10,
       
    },
    bio :{
        type: String,
        default : "Hello! A Friendly heart excited to meet amazing people."
    }

},{timestamps:true},)

const User = mongoose.model("User",userSchema)
module.exports = User