import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

import { detectFraud }
from "../services/fraudDetection.js";

import {
  generateOTP,
  verifyOTP,
  removeOTP,
} from "../services/otpService.js";

import { sendOTPEmail }
from "../services/mailService.js";



// SEND OTP
export const sendTransferOTP =
  async (req, res) => {

console.log("SEND OTP ROUTE HIT");

    try {

      const user =
        await User.findById(
          req.user.id
        );

      console.log(
        "Sending OTP to:",
        user.email
      );

      const otp = generateOTP(
        user.email
      );

      console.log(
        "Generated OTP:",
        otp
      );
      // SAVE OTP IN DATABASE
      user.otp = otp;

      await user.save();
      await sendOTPEmail(
        user.email,
        otp
      );

      res.status(200).json({
        message:
          "OTP sent to email",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

  export const collectPayment =
  async (req, res) => {

    try {

      const {
        senderWalletId,
        amount,
        pin,
      } = req.body;

      // RECEIVER
      const receiver =
        await User.findById(
          req.user.id
        );

      // SENDER
      const sender =
        await User.findOne({
          userId:
            senderWalletId,
        });

      if (!sender) {
        return res.status(404).json({
          message:
            "Sender not found",
        });
      }

      // PIN VERIFY
      if (
        sender.walletPin !== pin
      ) {
        return res.status(400).json({
          message:
            "Invalid PIN",
        });
      }

      // BALANCE CHECK
      if (
        sender.balance <
        Number(amount)
      ) {
        return res.status(400).json({
          message:
            "Insufficient balance",
        });
      }

      // TRANSFER
      sender.balance -=
        Number(amount);

      receiver.balance +=
        Number(amount);

      await sender.save();
      await receiver.save();

      // SAVE TRANSACTION
      const transaction =
        await Transaction.create({
          sender: sender._id,
          receiver:
            receiver._id,
          senderWalletId:
            sender.userId,
          receiverWalletId:
            receiver.userId,
          amount:
            Number(amount),
          status: "Success",
        });

      res.status(200).json({
        message:
          "Payment Collected",
        transaction,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };
  
export const resetWalletPin =
  async (req, res) => {
    try {
      const {
        otp,
        newPin,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const validOTP =
        verifyOTP(
          user.email,
          otp
        );

      if (!validOTP) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      if (
        !newPin ||
        newPin.length !== 4
      ) {
        return res.status(400).json({
          message:
            "PIN must be 4 digits",
        });
      }

      user.walletPin =
        newPin;

      await user.save();

      removeOTP(
        user.email
      );

      res.json({
        message:
          "PIN reset successful",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

// TRANSFER MONEY
export const transferMoney =
  async (req, res) => {
    try {

      const {
        receiverWalletId,
        amount,
        otp,
        pin,
      } = req.body;

      // SENDER
      const sender =
        await User.findById(
          req.user.id
        );

      // OTP VERIFY
      const validOTP =
        verifyOTP(
          sender.email,
          otp
        );

      if (!validOTP) {
        return res
          .status(400)
          .json({
            message:
              "Invalid OTP",
          });
      }

      // SELF TRANSFER BLOCK
      if (
        sender.userId ===
        receiverWalletId
      ) {
        return res
          .status(400)
          .json({
            message:
              "Cannot transfer to yourself",
          });
      }

      // INVALID AMOUNT
      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Amount must be greater than 0",
          });
      }

      // RECEIVER
      const receiver =
        await User.findOne({
          userId:
            receiverWalletId,
        });

      if (!receiver) {
        return res
          .status(404)
          .json({
            message:
              "Receiver not found",
          });
      }

      // PIN CHECK
      if (
        sender.walletPin !== pin
      ) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Wallet PIN",
          });
      }

      // BALANCE CHECK
      if (
        sender.balance <
        Number(amount)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Insufficient balance",
          });
      }

    // RECENT TRANSACTIONS
const recentTransactions =
  await Transaction.find({
    sender: sender._id,
  }).sort({
    createdAt: -1,
  });

// OPTIONAL FRAUD DETECTION
const fraudCheck =
  detectFraud(
    Number(amount),
    sender,
    recentTransactions
  );

// ONLY BLOCK EXTREME CASES
if (
  fraudCheck.fraud &&
  Number(amount) > 50000
) {
  return res
    .status(400)
    .json({
      message:
        fraudCheck.reason,
    });
}

      // TRANSFER
      sender.balance -= Number(
        amount
      );

      receiver.balance += Number(
        amount
      );

      await sender.save();

      await receiver.save();

      // SAVE TRANSACTION
      const transaction =
        await Transaction.create({
          sender: sender._id,

          receiver:
            receiver._id,

          senderWalletId:
            sender.userId,

          receiverWalletId:
            receiver.userId,

          amount:
            Number(amount),

          status: "Success",
        });

      // REMOVE OTP
      removeOTP(sender.email);

      res.status(200).json({
        message:
          "Transfer Successful",

        transaction,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };


// SET WALLET PIN
export const setWalletPin =
  async (req, res) => {
    try {

      const user =
        await User.findById(
          req.user.id
        );

      const { pin } = req.body;

      // VALIDATE PIN
      if (
        !pin ||
        pin.length !== 4
      ) {
        return res
          .status(400)
          .json({
            message:
              "PIN must be 4 digits",
          });
      }

      // NUMBERS ONLY
      if (
        !/^\d+$/.test(pin)
      ) {
        return res
          .status(400)
          .json({
            message:
              "PIN must contain only numbers",
          });
      }

      user.walletPin = pin;

      await user.save();

      res.status(200).json({
        message:
          "Wallet PIN set successfully",
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };


// GET TRANSACTION HISTORY
export const getTransactions =
  async (req, res) => {
    try {

      const transactions =
        await Transaction.find({
          $or: [
            {
              sender:
                req.user.id,
            },
            {
              receiver:
                req.user.id,
            },
          ],
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        transactions
      );

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };