import { useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaFingerprint,
  FaWallet,
  FaRupeeSign,
  FaLock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function GetAmount() {
  const navigate = useNavigate();

  const [senderWalletId, setSenderWalletId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [pin, setPin] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCollectPayment =
    async () => {
      try {
        if (
          !senderWalletId ||
          !amount ||
          !pin
        ) {
          return alert(
            "Fill all fields"
          );
        }

        setLoading(true);

        const {
          authenticateBiometric,
        } = await import(
          "../utils/biometricAuth"
        );

        const biometric =
          await authenticateBiometric();

        if (!biometric) {
          setLoading(false);

          return alert(
            "Biometric Failed"
          );
        }

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.post(
            "https://narpay.up.railway.app/api/transactions/collect-payment",
            {
              senderWalletId,
              amount,
              pin,
            },
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        alert(
          response.data.message
        );

        setSenderWalletId("");
        setAmount("");
        setPin("");

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Payment Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#020617,#0f172a,#111827)",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background:
            "rgba(255,255,255,0.06)",
          borderRadius: "30px",
          padding: "35px",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <FaArrowLeft />
          </button>

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              padding:
                "10px 18px",
              borderRadius: "16px",
              fontWeight: "bold",
            }}
          >
            Secure Collect
          </div>
        </div>

        {/* HEADING */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              margin: "auto",
              background:
                "linear-gradient(to right,#7c3aed,#2563eb)",
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              fontSize: "34px",
              marginBottom: "20px",
            }}
          >
            ₹
          </div>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "10px",
              background:
                "linear-gradient(to right,#60a5fa,#a855f7)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Get Amount
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Collect payment securely
          </p>
        </div>

        {/* INPUTS */}
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: "20px",
          }}
        >
          {/* WALLET ID */}
          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <FaWallet
                size={22}
                color="#60a5fa"
              />

              <input
                type="text"
                placeholder="Sender Wallet ID"
                value={
                  senderWalletId
                }
                onChange={(e) =>
                  setSenderWalletId(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          {/* AMOUNT */}
          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <FaRupeeSign
                size={22}
                color="#10b981"
              />

              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                style={{
                  width: "100%",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          {/* PIN */}
          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",
              borderRadius: "18px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <FaLock
                size={20}
                color="#f472b6"
              />

              <input
                type="password"
                placeholder="Sender Wallet PIN"
                value={pin}
                onChange={(e) =>
                  setPin(
                    e.target.value
                  )
                }
                maxLength={4}
                style={{
                  width: "100%",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px",
                  letterSpacing:
                    "5px",
                }}
              />
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={
            handleCollectPayment
          }
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "18px",
            border: "none",
            borderRadius: "20px",
            background:
              "linear-gradient(to right,#2563eb,#c026d3)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaFingerprint />

          {loading
            ? "Processing..."
            : "Verify with Biometric"}
        </button>

        {/* INFO */}
        <div
          style={{
            marginTop: "25px",
            background:
              "rgba(255,255,255,0.04)",
            padding: "18px",
            borderRadius: "18px",
            color: "#cbd5e1",
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >
          Sender will verify using:
          <br />
          • Wallet PIN
          <br />
          • Fingerprint Biometric
          <br />
          • Payment transfers instantly
        </div>
      </div>
    </div>
  );
}

export default GetAmount;