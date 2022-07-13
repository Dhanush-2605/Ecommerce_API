const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
// const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuthorisation } = require("./verifyToken");
// dotenv.config();
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    address: req.body.address,
    phone: req.body.phone,
    isActive: req.body.isActive,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("error");
    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("Wrong Credentials");
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("Enter valid credentials!");

    let accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    // res.status(500).json(err);
    // res.send(err);
    console.log(err);
    // return;
  }
});

router.post("/logout", verifyTokenAndAuthorisation, (req, res) => {
  // accessToken=undefined;
  try {
    // req.body.accessToken=undefined;
    res.status(200).json(req.body);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json("logged out");
  // res.send("logouted");
});
module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTQ4MTVmMTJlYjc2ZjEwMjAzNjdiYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTQ5NDgzMTAsImV4cCI6MTY1NTIwNzUxMH0.GFONbYfY4GS_CG-YqYE5ByD0KOjPXH-qi5ShoQghId8
