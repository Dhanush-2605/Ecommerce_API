const router = require("express").Router();
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  console.log(req.body);
  let msg = "";
  const number = "+91" + req.body.number;
  console.log(number);
  if (req.body.orderStatus === "Shipping") {
    msg = "YOUR ORDER IS SUCCESSFULLY SHIPPED  🚚";
  } else {
    msg = "YOUR ORDER IS SUCCESSFULLY DELIVERED  ✅";
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: msg,
      from: "+19705924312",
      to: number,
    })
    .then((message) => console.log("msg sent"));
});
module.exports = router;
