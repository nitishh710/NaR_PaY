import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { verifyBiometric } from "../utils/biometricAuth";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // NORMAL LOGIN
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://narpay.up.railway.app/api/auth/login",
        form
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful 🚀");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  // BIOMETRIC LOGIN
  const handleBiometricLogin = async () => {
    const enabled = localStorage.getItem("biometricEnabled");

    if (!enabled) {
      toast.error("Biometric not enabled");
      return;
    }

    const success = await verifyBiometric();

    if (success) {
      toast.success("Biometric Login Successful 👆");
      navigate("/dashboard");
    } else {
      toast.error("Biometric Authentication Failed");
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
      }}
    >
      {/* BACKGROUND GLOWS */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "#7c3aed",
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
          background: "#2563eb",
          borderRadius: "50%",
          filter: "blur(120px)",
          bottom: "-100px",
          right: "-100px",
          opacity: 0.4,
        }}
      />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "420px",
          padding: "40px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        {/* TITLE */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "48px",
              background: "linear-gradient(to right,#60a5fa,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NARpay
          </h1>

          <p style={{ color: "#cbd5e1" }}>
            Future of Smart Payments
          </p>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            marginBottom: "18px",
            outline: "none",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            marginBottom: "25px",
            outline: "none",
          }}
        />

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            border: "none",
            background: "linear-gradient(to right,#2563eb,#7c3aed)",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          Login
        </motion.button>

        {/* BIOMETRIC LOGIN */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleBiometricLogin}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "16px",
            border: "none",
            background: "linear-gradient(to right,#ec4899,#7c3aed)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login with Biometrics 👆
        </motion.button>

        {/* REGISTER */}
        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#cbd5e1",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#60a5fa",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
        <p
  onClick={() =>
    navigate(
      "/forgot-password"
    )
  }
  style={{
    marginTop: "15px",
    color: "#60a5fa",
    cursor: "pointer",
  }}
>
  Forgot Password?
</p>
      </motion.div>
    </div>
  );
}

export default Login;