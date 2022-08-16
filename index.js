const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order.js");
const cartRoute = require("./routes/cart");
const twilioRoute = require("./routes/twilio");
const cors = require("cors");
const razorRoute = require("./routes/razorpay");

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use("/api/checkout", razorRoute);
app.use("/api/twilio", twilioRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started...");
});
