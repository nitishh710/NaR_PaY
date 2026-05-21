import { useState } from "react";

function OTPModal({ onVerify, onClose }) {
  const [otp, setOtp] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px"
        }}
      >
        <h2>Enter OTP</h2>

        <input
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <br />
        <br />

        <button onClick={() => onVerify(otp)}>
          Verify
        </button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default OTPModal;