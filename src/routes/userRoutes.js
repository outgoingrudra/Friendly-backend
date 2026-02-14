const express = require("express")
const {profile} = require("../Handlers/userHandler")
const auth = require("../middlewares/auth")

const userRouter = express.Router()

userRouter.get("/profile",auth,profile)


module.exports = userRouter