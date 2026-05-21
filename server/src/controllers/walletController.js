import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// SEARCH USER
export const searchUser = async (
  req,
  res
) => {
  try {
    const { walletId } =
      req.params;

    const user =
      await User.findOne({
        userId: walletId,
      }).select(
        "name email userId"
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// RESET / SET PIN
export const resetPin = async (
  req,
  res
) => {
  try {

    const {
      otp,
      newPin,
    } = req.body;

    console.log(
      "BODY:",
      req.body
    );

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // CHECK OTP
    if (
      !user.otp ||
      String(user.otp).trim() !==
      String(otp).trim()
    ) {
      return res.status(400).json({
        message:
          "Invalid OTP",
      });
    }

    // PIN VALIDATION
    if (
      !newPin ||
      String(newPin).length !== 4
    ) {
      return res.status(400).json({
        message:
          "PIN must be 4 digits",
      });
    }

    // NUMBERS ONLY
    if (
      !/^\d+$/.test(
        String(newPin)
      )
    ) {
      return res.status(400).json({
        message:
          "PIN must contain only numbers",
      });
    }

    // UPDATE PIN
    user.walletPin =
      String(newPin);

    // CLEAR OTP
    user.otp = null;

    await user.save();

    res.status(200).json({
      message:
        "PIN updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to update PIN",
    });
  }
};