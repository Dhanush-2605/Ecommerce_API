const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorisation,
} = require("./verifyToken");

const Order = require("../models/Order");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newOrder = new Order(req.body);
  console.log(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
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
    // console.log(err);
  }
});

// router.put("find/:id",verifyToken,async (req,res)=>{
//   try{
//     const res=User.findByIdAndUpdate({
//       req.params.id
//     })

//   }catch(err){

//   }
// })
//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete();
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
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    // res.status.json(err);
    console.log(err);
  }
});



//Get stats
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.productId;
  

  

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).send(json);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
