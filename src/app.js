const express = require("express");

const connectDB = require("./config/db.js");
const User = require("./models/User.js")
const validator = require("validator")


const app = express();
app.use(express.json())
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


app.post("/signup",async(req,res)=>{

  let {name , email , password } = req.body
  console.log(req.body);
  
  try {
    if(!validator.isEmail(email) ){
            throw new Error("need correct credentials")
    }
     if(!validator.isStrongPassword(password) ){
            throw new Error("need Strong Password ")
    }
    password = password.trim()
    const user = new User({name,email,password})
    await user.save()
    res.send("User added successfully")
    
  } catch (error) {
     res.send("Error ! "+ error.message)
  }

})
  
app.get("/login",async(req,res)=>{
  let { email , password} = req.body
  console.log(req.body);
  
  try {
     const user = await User.findOne({email: email})
     console.log(user);
     password = password.toLowerCase()
     
     if(password == user.password){
      res.send("Login Successfull ! ")
     }
     else {
      res.send("Invalid credentials ! ")
     }
  } catch (error) {
      res.send("Error "+error.message)
    
  }

})