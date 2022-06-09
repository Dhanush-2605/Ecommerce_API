const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started...");
});

// pssword
// 123245435