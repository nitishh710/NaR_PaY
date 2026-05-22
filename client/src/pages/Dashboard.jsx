import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

import {
  FaArrowUp,
  FaHistory,
  FaQrcode,
  FaBolt,
  FaChartLine,
  FaLock,
  FaFingerprint,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [user, setUser] =
    useState(null);

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [pin, setPin] =
    useState("");

  const [
    loadingPin,
    setLoadingPin,
  ] = useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchTransactions();
  }, []);

  const fetchProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "https://narpay.up.railway.app/api/wallet/profile",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchTransactions =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "https://narpay.up.railway.app/api/transactions/history",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setTransactions(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  // SET WALLET PIN
const handleSetPin =
  async () => {
    try {
      if (pin.length !== 4) {
        return alert(
          "PIN must be 4 digits"
        );
      }

      setLoadingPin(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(
          "https://narpay.up.railway.app/api/transactions/set-pin",
          {
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

      setPin("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to set PIN"
      );

    } finally {
      setLoadingPin(false);
    }
  };

  const balanceData = [
    {
      day: "Mon",
      balance: 4000,
    },
    {
      day: "Tue",
      balance: 5200,
    },
    {
      day: "Wed",
      balance: 4800,
    },
    {
      day: "Thu",
      balance: 7000,
    },
    {
      day: "Fri",
      balance: 6500,
    },
    {
      day: "Sat",
      balance: 9000,
    },
    {
      day: "Sun",
      balance:
        user?.balance || 0,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#020617,#0f172a,#111827)",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <Navbar user={user} />

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "5px",
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
            }}
          >
            Smart Credit Wallet
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          style={{
            background:
              "linear-gradient(to right,#ef4444,#dc2626)",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* HERO CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#4f46e5,#7c3aed,#9333ea)",
          borderRadius: "30px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            color: "#ddd",
          }}
        >
          Welcome Back 👋
        </p>

        <h1
          style={{
            fontSize: "42px",
            marginTop: "10px",
          }}
        >
          {user?.name}
        </h1>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent:
              "space-between",
            flexWrap: "wrap",
            gap: "25px",
          }}
        >
          <div>
            <p
              style={{
                color: "#ddd",
              }}
            >
              Wallet ID
            </p>

            <h2>
              {user?.userId}
            </h2>
          </div>

          <div>
            <p
              style={{
                color: "#ddd",
              }}
            >
              Current Balance
            </p>

            <h1
              style={{
                fontSize: "48px",
              }}
            >
              ₹ {user?.balance}
            </h1>
          </div>
        </div>
      </div>

    {/* ACTION BUTTONS */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
    marginTop: "40px",
    marginBottom: "20px",
    alignItems: "stretch",
  }}
>
        <button
          onClick={() =>
            navigate("/transfer")
          }
          style={{
            flex: 1,
            minWidth: "220px",
            background:
              "linear-gradient(to right,#2563eb,#4f46e5)",
            border: "none",
            padding: "18px",
            borderRadius: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaArrowUp />
          Send Money
        </button>

        <button
          onClick={async () => {
            const {
              registerBiometric,
            } = await import(
              "../utils/biometricAuth"
            );

            const success =
              await registerBiometric();

            if (success) {
              alert(
                "Biometric Enabled Successfully"
              );
            } else {
              alert(
                "Biometric Setup Failed"
              );
            }
          }}
          style={{
            flex: 1,
            minWidth: "220px",
            background:
              "linear-gradient(to right,#ec4899,#7c3aed)",
            border: "none",
            padding: "18px",
            borderRadius: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaFingerprint />
          Enable Biometric
        </button>

        <button
          onClick={() =>
            navigate("/history")
          }
          style={{
            flex: 1,
            minWidth: "220px",
            background:
              "linear-gradient(to right,#10b981,#059669)",
            border: "none",
            padding: "18px",
            borderRadius: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaHistory />
          View History
        </button>
      </div>

{/* SET PIN CARD */}
{!user?.walletPin && (
  <div
    style={{
      marginTop: "30px",
      background:
        "rgba(255,255,255,0.06)",
      borderRadius: "24px",
      padding: "25px",
      backdropFilter:
        "blur(20px)",
      border:
        "1px solid rgba(255,255,255,0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <FaLock size={22} />

      <h2>
        Set Wallet PIN
      </h2>
    </div>

    <input
      type="password"
      placeholder="Enter 4 Digit PIN"
      value={pin}
      onChange={(e) =>
        setPin(e.target.value)
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
        fontSize: "16px",
        letterSpacing: "6px",
      }}
    />

    <button
      onClick={handleSetPin}
      disabled={loadingPin}
      style={{
        width: "100%",
        padding: "16px",
        borderRadius: "16px",
        border: "none",
        background:
          "linear-gradient(to right,#f59e0b,#ea580c)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {loadingPin
        ? "Saving..."
        : "Save Wallet PIN"}
    </button>
  </div>
)}
<button
  onClick={() =>
    navigate("/get-amount")
  }
  style={{
    flex: 1,
    minWidth: "220px",
    background:
      "linear-gradient(to right,#06b6d4,#2563eb)",
    border: "none",
    padding: "18px",
    borderRadius: "20px",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Get Amount
</button>

      {/* GRAPH */}
      <div
        style={{
          marginTop: "35px",
          background:
            "rgba(255,255,255,0.08)",
          borderRadius: "25px",
          padding: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <FaChartLine size={24} />
          <h2>
            Balance Analytics 📈
          </h2>
        </div>

        <div
          style={{
            width: "100%",
            height: "320px",
          }}
        >
          <ResponsiveContainer>
            <LineChart
              data={balanceData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="day"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#60a5fa"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        {/* TRANSACTIONS */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <FaBolt size={24} />

            <h2>
              Recent Transactions
            </h2>
          </div>

          {transactions.length ===
          0 ? (
            <p>
              No transactions yet
            </p>
          ) : (
            transactions
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item._id}
                  style={{
                    background:
                      "rgba(255,255,255,0.05)",
                    padding: "18px",
                    borderRadius:
                      "18px",
                    marginBottom:
                      "15px",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        item.receiverWalletId
                      }
                    </p>

                    <p
                      style={{
                        color:
                          "#9ca3af",
                        fontSize:
                          "14px",
                      }}
                    >
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <h2
                    style={{
                      color:
                        "#10b981",
                    }}
                  >
                    ₹ {item.amount}
                  </h2>
                </div>
              ))
          )}
        </div>

        {/* QR CARD */}
        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            borderRadius: "24px",
            padding: "25px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <FaQrcode size={24} />

            <h2>
              Receive Payment
            </h2>
          </div>

          <div
            style={{
              background:
                "white",
              padding: "15px",
              borderRadius:
                "18px",
              display:
                "inline-block",
            }}
          >
            <QRCodeCanvas
              value={
                user?.userId ||
                "UID101"
              }
              size={220}
            />
          </div>

          <p
            style={{
              marginTop: "20px",
              color: "#cbd5e1",
              fontWeight: "bold",
            }}
          >
            {user?.userId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;