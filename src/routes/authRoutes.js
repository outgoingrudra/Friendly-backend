const {signUp, logIn} = require("../Handlers/authHandlers")
const express = require("express")

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)

module.exports =authRouter