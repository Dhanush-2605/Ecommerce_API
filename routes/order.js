const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorisation,
} = require("./verifyToken");

const Order = require("../models/Order");
const Stats = require("../models/Stats");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update

router.put("/:id", verifyToken, async (req, res) => {
  console.log(req.params.id);
  console.log(req.user);

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    //refer here
    // return res.status(500).json(err);
    console.log(err);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully Order Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product

router.get("/find/:userId", verifyToken, async (req, res) => {
  console.log(req.params.userId);
  try {
    const orders = await Order.findById(req.params.userId);
    res.status(200).json(orders);
  } catch (err) {
    // res.status.json(err);
    console.log(err);
  }
});

//Get stats

module.exports = router;
