import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { motion } from "framer-motion";

import QRScanner from "../components/QRScanner";

function Transfer() {
  const [
    receiverWalletId,
    setReceiverWalletId,
  ] = useState("");

  const [amount, setAmount] =
    useState("");

  const [receiver, setReceiver] =
    useState(null);

  const [otp, setOtp] =
    useState("");

  const [pin, setPin] =
    useState("");

  const [
    newPin,
    setNewPin,
  ] = useState("");

  const [
    resetOTP,
    setResetOTP,
  ] = useState("");

  const [
    showForgotPin,
    setShowForgotPin,
  ] = useState(false);

  const [showOTPBox,
    setShowOTPBox] =
    useState(false);

  const [amountLocked,
    setAmountLocked] =
    useState(false);

  const [
    showScanner,
    setShowScanner,
  ] = useState(false);

  // VERIFY USER
  const searchUser = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `https://narpay.onrender.com/api/wallet/search/${receiverWalletId}`,
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setReceiver(response.data);

      toast.success(
        "User Verified"
      );
    } catch (error) {
      setReceiver(null);

      toast.error(
        "User not found"
      );
    }
  };

  // SEND OTP
  const sendOTP = async () => {
    try {
      if (!amount || amount <= 0) {
        toast.error(
          "Enter valid amount"
        );
        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "https://narpay.onrender.com/api/transactions/send-otp",
        {},
        {
          headers: {
            Authorization:
              token,
          },
        }
      );

      setShowOTPBox(true);

      // LOCK AMOUNT
      setAmountLocked(true);

      toast.success(
        "OTP Sent"
      );
    } catch (error) {
      toast.error(
        "Failed to send OTP"
      );
    }
  };

  // TRANSFER MONEY
  const handleTransfer =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.post(
            "https://narpay.onrender.com/api/transactions/transfer",
            {
              receiverWalletId,
              amount,
              otp,
              pin,
            },
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        toast.success(
          response.data.message
        );

        setReceiverWalletId("");
        setAmount("");
        setOtp("");
        setPin("");
        setReceiver(null);

        setShowOTPBox(false);

        setAmountLocked(false);
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Transfer Failed"
        );
      }
    };

  // FORGOT PIN OTP
  const sendResetOTP =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "https://narpay.onrender.com/api/transactions/send-otp",
          {},
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        toast.success(
          "Reset OTP Sent"
        );
      } catch (error) {
        toast.error(
          "Failed to send reset OTP"
        );
      }
    };

  // RESET PIN
  const resetPin =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "https://narpay.onrender.com/api/wallet/reset-pin",
          {
            otp: resetOTP,
            newPin,
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        toast.success(
          "PIN Updated Successfully"
        );

        setShowForgotPin(false);

        setResetOTP("");

        setNewPin("");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to reset PIN"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#020617,#0f172a,#111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* GLOW EFFECTS */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#2563eb",
          borderRadius: "50%",
          filter: "blur(120px)",
          top: "-100px",
          left: "-100px",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#7c3aed",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "-100px",
          right: "-100px",
          opacity: 0.4,
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        style={{
          width: "450px",
          padding: "35px",
          borderRadius: "30px",
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              background:
                "linear-gradient(to right,#60a5fa,#a855f7)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Transfer
          </h1>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            Instant Smart Payments
          </p>
        </div>

        {/* QR BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() =>
            setShowScanner(
              !showScanner
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(to right,#2563eb,#4f46e5)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Scan QR Code
        </motion.button>

        {showScanner && (
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <QRScanner
              onScan={(value) => {
                setReceiverWalletId(
                  value
                );

                setShowScanner(
                  false
                );

                toast.success(
                  "QR Scanned"
                );
              }}
            />
          </div>
        )}

        {/* WALLET ID */}
        <input
          type="text"
          placeholder="Receiver Wallet ID"
          value={receiverWalletId}
          disabled={showOTPBox}
          onChange={(e) =>
            setReceiverWalletId(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            background: showOTPBox
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.06)",
            color: "white",
            marginBottom: "18px",
            outline: "none",
            opacity: showOTPBox
              ? 0.7
              : 1,
          }}
        />

        {/* VERIFY */}
        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={searchUser}
          disabled={showOTPBox}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(to right,#4f46e5,#7c3aed)",
            color: "white",
            fontWeight: "bold",
            cursor: showOTPBox
              ? "not-allowed"
              : "pointer",
            marginBottom: "20px",
            opacity: showOTPBox
              ? 0.6
              : 1,
          }}
        >
          Verify User
        </motion.button>

        {/* USER CARD */}
        {receiver && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              background:
                "rgba(16,185,129,0.15)",
              border:
                "1px solid rgba(16,185,129,0.3)",
              padding: "18px",
              borderRadius: "18px",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                color: "#10b981",
              }}
            >
              {receiver.name}
            </h3>

            <p
              style={{
                color: "#d1d5db",
              }}
            >
              {receiver.email}
            </p>
          </motion.div>
        )}

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          disabled={amountLocked}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            background:
              amountLocked
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.06)",
            color: "white",
            marginBottom: "20px",
            outline: "none",
            opacity:
              amountLocked ? 0.7 : 1,
          }}
        />

        {/* OTP FLOW */}
        {!showOTPBox ? (
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={sendOTP}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              background:
                "linear-gradient(to right,#f59e0b,#ea580c)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Send OTP
          </motion.button>
        ) : (
          <>
            {/* OTP */}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background:
                  "rgba(255,255,255,0.06)",
                color: "white",
                marginBottom: "15px",
                outline: "none",
              }}
            />

            {/* WALLET PIN */}
            <input
              type="password"
              placeholder="Enter Wallet PIN"
              value={pin}
              onChange={(e) =>
                setPin(
                  e.target.value
                )
              }
              maxLength={4}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background:
                  "rgba(255,255,255,0.06)",
                color: "white",
                marginBottom: "10px",
                outline: "none",
                fontSize: "16px",
                letterSpacing: "4px",
              }}
            />

            {/* FORGOT PIN */}
            <p
              onClick={() =>
                setShowForgotPin(
                  !showForgotPin
                )
              }
              style={{
                color: "#60a5fa",
                cursor: "pointer",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              Forgot PIN?
            </p>

            {showForgotPin && (
              <>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={sendResetOTP}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background:
                      "linear-gradient(to right,#9333ea,#7e22ce)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "15px",
                  }}
                >
                  Send Reset OTP
                </motion.button>

                <input
                  type="text"
                  placeholder="Enter Reset OTP"
                  value={resetOTP}
                  onChange={(e) =>
                    setResetOTP(
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "14px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background:
                      "rgba(255,255,255,0.06)",
                    color: "white",
                    marginBottom: "15px",
                    outline: "none",
                  }}
                />

                <input
                  type="password"
                  placeholder="New 4 Digit PIN"
                  value={newPin}
                  onChange={(e) =>
                    setNewPin(
                      e.target.value
                    )
                  }
                  maxLength={4}
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "14px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background:
                      "rgba(255,255,255,0.06)",
                    color: "white",
                    marginBottom: "15px",
                    outline: "none",
                    letterSpacing: "4px",
                  }}
                />

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={resetPin}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "15px",
                    border: "none",
                    background:
                      "linear-gradient(to right,#ec4899,#db2777)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "18px",
                  }}
                >
                  Update PIN
                </motion.button>
              </>
            )}

            {/* CONFIRM */}
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleTransfer}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "none",
                background:
                  "linear-gradient(to right,#10b981,#059669)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Confirm Transfer
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Transfer;