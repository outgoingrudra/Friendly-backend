const express = require("express")
const  Connection  = require("../models/Connection")
const auth = require("../middlewares/auth")

const { sendConnection, DecisionConnection } = require("../Handlers/connectionHandler")

const connectionRouter = express.Router()

connectionRouter.post("/request/send/:status/:toUserId",auth,sendConnection )


connectionRouter.post("/request/review/:status/:requestId",auth,DecisionConnection)
module.exports = connectionRouter