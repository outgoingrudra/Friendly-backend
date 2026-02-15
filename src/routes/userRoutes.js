const express = require("express")
const {profile, connectionRequests, ConnectedProfiles, feeds} = require("../Handlers/userHandler")
const auth = require("../middlewares/auth")

const userRouter = express.Router()

userRouter.get("/profile",auth,profile)
userRouter.get("/requests",auth, connectionRequests)
userRouter.get("/connections",auth, ConnectedProfiles)
userRouter.get("/feed",auth, feeds)


module.exports = userRouter