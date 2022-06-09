const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
// const dotenv = require("dotenv");
// dotenv.config();
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
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

    !user && res.status(401).json("Enter valid credentials!");
    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Enter valid credentials!");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    // res.status(500).json(err);
    // res.send(err);
    console.log("err");
  }
});
module.exports = router;
