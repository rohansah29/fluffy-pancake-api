const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password,avatar } = req.body;

  try {
    const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = new UserModel({ name, email,avatar, password: hash });
        await user.save();
        res.status(201).json({ msg: "New user has been registered" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.name},"masai")
                    res.send({"msg":"Logged In!","token":token})
                }else{
                    res.send({"error":err})
                }
            });
        }else{
            res.send({"msg":"User does not exist!"})
        }
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports={
    userRouter
}