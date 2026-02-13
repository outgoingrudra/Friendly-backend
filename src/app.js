const express = require("express");

const connectDB = require("./config/db");


const app = express();
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

  