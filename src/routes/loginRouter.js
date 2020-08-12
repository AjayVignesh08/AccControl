const express = require("express");
const LoginUsr = require("../models/loginModel");
const { compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtService");

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await LoginUsr.findOne({ email });
  const loguser = result.get();
  if (loguser) {
    const isValidPassword = compareHash(password, loguser.password);
    if (isValidPassword) {
      const token = sign({
        sub: "User",
        email
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({
        message: "Valid Admin!"
      });
    } else {
      res.status(401).send("Invalid User");
    }
  } else {
    res.status(401).send("Invalid User");
  }
});

module.exports = loginRouter;
