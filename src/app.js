const express = require("express");
const bcrypt = require("bcrypt")
const connectDB = require("./config/db.js");
const User = require("./models/User.js")
const validator = require("validator")


const {signUp, logIn }= require("./Handlers/authHandlers.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json())
app.use(cookieParser())
connectDB()
  .then(() => {
    console.log("Database Connected ! ");
    app.listen(3000, () => {
      console.log("Server running on 3000");
    });
  })
  .catch((err) => {
    console.log("Database not connected ! && " + err.message);
  });


app.post("/signup",signUp)

  
app.post("/login",logIn)

app.get("/profile",async(req,res)=>{
  console.log(req.cookies);
  
  res.send("cookie reading ! ")
})