const { default: mongoose } = require("mongoose");
// const { findByIdAndDelete, find } = require("../models/Product");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorisation,
} = require("./verifyToken");
const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  console.log(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {


    
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    //refer here
    // return res.status(500).json(err);
    // console.log(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully Product Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Product
// , verifyTokenAndAdmin
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/find/:id", verifyToken, async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $push:{reviews: req.body},
      },
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (err) {
    res.status.json(err);
  }
});

// router.get("/",verifyToken,async (req,res)=>{
//   console.log(req.query);
//   // const products=await Product.find();
// })
//Get All Products

router.get("/:type/:cat", verifyToken, async (req, res) => {
  const type = req.params.type;
  const cat = req.params.cat;
  try {
    const products = await Product.find({
      categories: {
        $in: [type, cat],
      },
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    // const product = await find();
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
