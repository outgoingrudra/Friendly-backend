const express = require("express")
const {profile, connectionRequests} = require("../Handlers/userHandler")
const auth = require("../middlewares/auth")

const userRouter = express.Router()

userRouter.get("/profile",auth,profile)
userRouter.get("/requests",auth, connectionRequests)


module.exports = userRouter