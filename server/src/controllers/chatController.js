import Message
from "../models/Message.js";

import User
from "../models/User.js";

export const sendMessage =
  async (req, res) => {
    try {
      const {
        receiverWalletId,
        text,
      } = req.body;

      const receiver =
        await User.findOne({
          userId:
            receiverWalletId,
        });

      if (!receiver) {
        return res.status(404).json({
          message:
            "Receiver not found",
        });
      }

      const message =
        await Message.create({
          sender:
            req.user.id,

          receiver:
            receiver._id,

          text,
        });

      res.status(200).json(
        message
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const getMessages =
  async (req, res) => {
    try {
      const messages =
        await Message.find();

      res.status(200).json(
        messages
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };