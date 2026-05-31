import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const [pin, setPin] =
    useState("");

  const setWalletPin =
    async () => {
      try {
        if (pin.length !== 4) {
          toast.error(
            "PIN must be 4 digits"
          );

          return;
        }

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.post(
            "https://narpay.onrender.com/api/transactions/set-pin",
            { pin },
            {
              headers: {
                Authorization: Bearer <token>,
              },
            }
          );

        toast.success(
          response.data.message
        );

        setPin("");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to set PIN"
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#020617",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.08)",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom:
              "20px",
          }}
        >
          Profile
        </h1>

        <input
          type="password"
          placeholder="Set 4 Digit Wallet PIN"
          value={pin}
          maxLength={4}
          onChange={(e) =>
            setPin(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius:
              "14px",
            border:
              "1px solid rgba(255,255,255,0.1)",
            background:
              "rgba(255,255,255,0.06)",
            color: "white",
            marginBottom:
              "20px",
            outline: "none",
            letterSpacing:
              "4px",
          }}
        />

        <button
          onClick={
            setWalletPin
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius:
              "14px",
            border: "none",
            background:
              "linear-gradient(to right,#2563eb,#7c3aed)",
            color: "white",
            fontWeight:
              "bold",
            cursor: "pointer",
          }}
        >
          Save Wallet PIN
        </button>
      </div>
    </div>
  );
}

export default Profile;