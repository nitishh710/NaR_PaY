import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import generateId from "../utils/generateId.js";


// REGISTER
export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      dob,
      email,
      phone,
      password
    } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      dob,
      email,
      phone,

      password: hashedPassword,

      userId: generateId(),

      balance: 10000
    });

    res.status(201).json({
      message:
        "Registration successful",

      user
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN
export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    userId: user.userId,
    balance: user.balance,
  },
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};