const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const { response } = require("express");
const { token } = require("morgan");

//For Registering New User
router.post("/register", async (req, res) => {
  console.log('insideregisterfunction')
  try {
   
    //Checking if the user already exists or not
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exits ",
        success: false,
        data: null,
      });
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    console.log(newUser)
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
router.post("/login", async (req, res) => {
  console.log('Inside You')
  try {
    const userExists = await User.findOne({ email: req.body.email });
    console.log(userExists);
    if (!userExists) {
      return res.send({
        message: "User does not exists",
        success: false,
        data: null,
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.send({
      message: "User logged in Successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });

  }
});
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});
module.exports = router;
