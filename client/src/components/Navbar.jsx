import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: "20px",
        zIndex: 100,
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(255,255,255,0.1)",
          borderRadius: "22px",
          padding: "18px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* LEFT */}
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              background:
                "linear-gradient(to right,#60a5fa,#a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                "transparent",
              fontWeight: "bold",
            }}
          >
            NARpay ⚡
          </h1>

          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Smart Wallet System
          </p>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              background:
                "rgba(255,255,255,0.1)",
              padding: "10px 18px",
              borderRadius: "14px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Balance
            </p>

            <h3
              style={{
                margin: 0,
                color: "#10b981",
              }}
            >
              ₹ {user?.balance || 0}
            </h3>
          </div>

          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background:
                "linear-gradient(to right,#4f46e5,#9333ea)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {user?.name?.charAt(0)}
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;