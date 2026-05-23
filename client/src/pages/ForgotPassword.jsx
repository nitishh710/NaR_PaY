import {
  useState,
} from "react";

import axios from "axios";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [step, setStep] =
    useState(1);

  const sendOtp =
    async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
          { email }
        );

        alert("OTP Sent");
        setStep(2);

      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  const resetPassword =
    async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
          {
            email,
            otp,
            newPassword,
          }
        );

        alert(
          "Password Reset Successful"
        );

      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          width: "400px",
          background:
            "#1e293b",
          padding: "40px",
          borderRadius:
            "20px",
        }}
      >
        <h1>
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
          }}
        />

        {step === 2 && (
          <>
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
                padding: "15px",
                marginTop:
                  "20px",
              }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                newPassword
              }
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "15px",
                marginTop:
                  "20px",
              }}
            />
          </>
        )}

        <button
          onClick={
            step === 1
              ? sendOtp
              : resetPassword
          }
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "25px",
            border: "none",
            borderRadius:
              "12px",
            background:
              "#7c3aed",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {step === 1
            ? "Send OTP"
            : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;