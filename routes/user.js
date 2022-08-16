const router = require("express").Router();
const CryptoJS = require("crypto-js");

const { findByIdAndUpdate } = require("../models/User");
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");
const { verifyTokenAndAdmin } = require("./verifyToken");

const { verifyTokenAndAuthorisation } = require("./verifyToken");
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    //refer here
    // return res.status(500).json(err);
    // console.log(err);
  }
});
//pass
// router.put("/profile/:id",verifyToken,async (req,res)=>{
//   // console.log(req.body);
//   console.log(req.params.id);
//   const img=req.body.img;
//   console.log(img);
//   // const profile=JSON.stringify(req.body);
//   try{
//     const updatedProfile=await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set:{img:img}
//       }

//     )
// res.status(200).json(updatedProfile)
//   }catch(err){
//     console.log(err)

//   }

// })

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted....");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Getting all the users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
