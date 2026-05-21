import express from "express";

import {
  getProfile,
  searchUser,
  resetPin
} from "../controllers/walletController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.post(
  "/reset-pin",
  authMiddleware,
  resetPin
);

router.get(
  "/search/:walletId",
  authMiddleware,
  searchUser
);
export default router;