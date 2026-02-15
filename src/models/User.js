const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../../constant")

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
        enum : []

    },
    password :{
        type: String,
        required:true,
        minlength: 10,
       
    },
    bio :{
        type: String,
        default : "Hello! A Friendly heart excited to meet amazing people."
    },
    imageUrl :{
        type: String,
        default : "https://i.pinimg.com/originals/47/77/ae/4777ae0906dd0113ad0bb00d61125d1b.jpg"
    }


},{timestamps:true},)


userSchema.methods.getJWT = function(){
    const user = this
    const token = jwt.sign({_id : user._id},SECRET_KEY)
    return token

}

const User = mongoose.model("User",userSchema)
module.exports = User