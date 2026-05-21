import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function History() {
  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/api/transactions/history",
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
      } finally {
        setLoading(false);
      }
    };

  const filteredTransactions =
    transactions.filter(
      (tx) =>
        tx.senderWalletId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        tx.receiverWalletId
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  if (loading) {
    return (
      <h1
        style={{
          padding: "30px",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Transaction History
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Wallet ID"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border:
            "1px solid #ccc",
          marginBottom: "25px",
          fontSize: "16px",
        }}
      />

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "20px",
        }}
      >
        {filteredTransactions.length ===
        0 ? (
          <div
            style={{
              background:
                "white",
              padding: "30px",
              borderRadius:
                "12px",
            }}
          >
            <h3>
              No transactions
              found
            </h3>
          </div>
        ) : (
          filteredTransactions.map(
            (tx) => {
              const isSent =
                tx.senderWalletId ===
                currentUser.userId;

              return (
                <div
                  key={tx._id}
                  style={{
                    background:
                      "white",
                    borderRadius:
                      "14px",
                    padding: "22px",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.08)",
                    borderLeft:
                      isSent
                        ? "8px solid #ef4444"
                        : "8px solid #10b981",
                  }}
                >
                  {/* Top */}
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                    }}
                  >
                    <h2
                      style={{
                        color:
                          isSent
                            ? "#ef4444"
                            : "#10b981",
                      }}
                    >
                      {isSent
                        ? "- ₹"
                        : "+ ₹"}
                      {tx.amount}
                    </h2>

                    <div
                      style={{
                        background:
                          isSent
                            ? "#fee2e2"
                            : "#d1fae5",
                        color:
                          isSent
                            ? "#b91c1c"
                            : "#047857",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "20px",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {isSent
                        ? "Debited"
                        : "Credited"}
                    </div>
                  </div>

                  {/* Details */}
                  <div
                    style={{
                      marginTop:
                        "18px",
                      lineHeight:
                        "1.9",
                    }}
                  >
                    <p>
                      <strong>
                        From:
                      </strong>{" "}
                      {
                        tx.senderWalletId
                      }
                    </p>

                    <p>
                      <strong>
                        To:
                      </strong>{" "}
                      {
                        tx.receiverWalletId
                      }
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {tx.status}
                    </p>

                    <p>
                      <strong>
                        Date:
                      </strong>{" "}
                      {new Date(
                        tx.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}

export default History;