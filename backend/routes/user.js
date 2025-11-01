const dotenv = require("dotenv");
dotenv.config();
const  JWT_SECRET  = process.env.JWT_SECRET
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const express = require("express");
const userRouter = express.Router();
const z = require("zod");
const { authMiddleware } = require("../middlewares");

const signupSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});
const updateSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const userInfo = req.body;
  const result = signupSchema.safeParse(userInfo);
  const existingUserCheck = await User.findOne({ username: userInfo.username });
  if (!result.success || existingUserCheck) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const newUser = await User.create({
    username: userInfo.username,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    password: userInfo.password,
  });
    await Account.create({
    userId: newUser._id,
    balance:1+Math.floor(Math.random()*10000)
  })
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
  return res.status(200).json({
    message: "User created successfully",
    token,
  });
});
userRouter.post("/signin", async (req, res) => {
  const payload = req.body;
  const { success } = signinSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const findUser = await User.findOne({
    username: payload.username,
    password: payload.password,
  });
  if (!findUser) {
    return res.status(411).json({
      message: "User does not exist",
    });
  } else {
    const token = jwt.sign({ userId: findUser._id }, JWT_SECRET);
    return res.status(200).json({
      token,
    });
  }
});
userRouter.put("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const unparsedPayload = req.body;
  const { success } = updateSchema.safeParse(unparsedPayload);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  const foundUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: unparsedPayload,
    }
  );
  return res.status(200).json({
    message: "Updated successfully",
  });
});
userRouter.get("/bulk" , authMiddleware , async(req,res)=>{
    const filter = req.query.filter||"";
    const userId= req.userId
    const users = await User.find({
    $and: [
      {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } }
        ]
      },
      {
        _id: { $ne: userId } 
      }
    ]
  });
    return res.status(200).json({
        users: users.map((user)=>{
            return {
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                userId:user._id
            }
        })
    })
})
module.exports = {
  userRouter
};
