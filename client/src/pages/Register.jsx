import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendar,
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      dob: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await axios.post(
            "https://narpay.up.railway.app/api/auth/register",
            formData
          );

        alert(
          response.data.message
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
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
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background:
            "rgba(255,255,255,0.06)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          borderRadius: "30px",
          padding: "40px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
              background:
                "linear-gradient(to right,#60a5fa,#a855f7)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            NARpay ⚡
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Create Your Smart Wallet
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
        >

          {/* NAME */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Full Name
            </label>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "16px 18px",
                borderRadius:
                  "18px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <FaUser
                color="#60a5fa"
                size={18}
              />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: "100%",
                  marginLeft:
                    "12px",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize:
                    "16px",
                }}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Email Address
            </label>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "16px 18px",
                borderRadius:
                  "18px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <FaEnvelope
                color="#60a5fa"
                size={18}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: "100%",
                  marginLeft:
                    "12px",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize:
                    "16px",
                }}
              />
            </div>
          </div>

          {/* DOB */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Date of Birth
            </label>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "16px 18px",
                borderRadius:
                  "18px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <FaCalendar
                color="#60a5fa"
                size={18}
              />

              <input
                type="date"
                name="dob"
                value={
                  formData.dob
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: "100%",
                  marginLeft:
                    "12px",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize:
                    "16px",
                }}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <label
              style={{
                color: "#cbd5e1",
                marginBottom: "10px",
                display: "block",
              }}
            >
              Password
            </label>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                background:
                  "rgba(255,255,255,0.05)",
                padding:
                  "16px 18px",
                borderRadius:
                  "18px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <FaLock
                color="#60a5fa"
                size={18}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width: "100%",
                  marginLeft:
                    "12px",
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize:
                    "16px",
                }}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "18px",
              background:
                "linear-gradient(to right,#2563eb,#7c3aed)",
              color: "white",
              fontWeight: "bold",
              fontSize: "17px",
              cursor: "pointer",
              transition:
                "0.3s",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* LOGIN */}
        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#60a5fa",
                textDecoration:
                  "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;