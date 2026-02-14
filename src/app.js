const express = require("express");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/authRoutes.js")
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


app.use("/",authRouter)