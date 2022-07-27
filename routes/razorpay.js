// const router = require("express").Router();
// const KEY=process.env.STRIPE_KEY;
// const stripe = require("stripe")(KEY);

// module.exports = router;

const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

console.log(process.env.KEY_ID);
const instance = new Razorpay({
  key_id: "refer here",
  key_secret: "refer here",
});

router.post("/payment", (req, res) => {
  const { amount, currency } = req.body;
  instance.orders.create({ amount, currency }, (err, order) => {
    if (!err) {
      res.send(order);
    } else {
      res.send(err);
    }
  });
});

router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "refer here")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature == expectedSign) {
      res.status(200).json("Payment Verifies succesfully");
    } else {
      res.status(500).json("signature error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
