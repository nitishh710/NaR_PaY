import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  transferMoney,
  getTransactions,
  sendTransferOTP,
  setWalletPin,
  resetWalletPin,
  collectPayment
} from "../controllers/transactionController.js";
const router = express.Router();

router.post(
  "/transfer",
  authMiddleware,
  transferMoney
);

router.get(
  "/history",
  authMiddleware,
  getTransactions
);
router.post(
  "/set-pin",
  authMiddleware,
  setWalletPin
);
router.post(
  "/send-otp",
  authMiddleware,
  sendTransferOTP
);
router.post(
  "/collect-payment",
  authMiddleware,
  collectPayment
);

export default router;