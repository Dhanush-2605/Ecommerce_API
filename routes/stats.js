const Stats = require("../models/Stats.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorisation,
} = require("./verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const newProduct = new Stats(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json("Error");
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const productId = req.params.id;

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  console.log(productId);
  console.log(lastMonth);

  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  console.log(previousMonth);

  try {
    const stats = await Stats.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },
      },
      {
        $group: { _id: "$month", total: { $sum: "$sales" } },
      },
    ]);

    res.status(200).json(stats);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
    // console.log(err);
  }

  // try {
  //   const product = await Stats.aggregate([
  //     {
  //       $match: {
  //         createdAt: { $gte: previousMonth },
  //         ...(id && {
  //           products: { $elematch: { productId: id } },
  //         }),
  //       },
  //     },
  //     {
  //       $project: {
  //         month: { $month: "$createdAt" },
  //         sales: "$price",
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$month",
  //         total: { $sum: "$sales" },
  //       },
  //     },
  //   ]);

  //   res.status(200), json(product);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
