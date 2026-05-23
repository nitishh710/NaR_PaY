import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },

      dob: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },

      phone: {
        type: String,
        required: true
      },

      password: {
        type: String,
        required: true
      },

      userId: {
        type: String,
        unique: true
      },

      balance: {
        type: Number,
        default: 10000
      },
      
      walletPin: {
      type: String,
      default: "",
      },

      resetOtp: String,
      resetOtpExpire: Date,

      otp: {
        type: String,
        default: null
      }
    },

    {
      timestamps: true
    }
  );

const User = mongoose.model(
  "User",
  userSchema
);

export default User;