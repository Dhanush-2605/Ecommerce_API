const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order.js");
const cartRoute = require("./routes/cart");
const cors = require("cors");
const stripeRoute = require("./routes/stripe");

//  const orderRoute=require("./routes/order");
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log(process.env.KEY_ID);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started...");
});

// pssword
// 123245435

//dhanush
