function TransactionList({ transactions }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Transaction History</h2>

      {transactions.map((tx, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        ><p>
            <strong>From:</strong> {tx.senderId}
          </p>

          <p>
            <strong>To:</strong> {tx.receiverId}
          </p>

          <p>
            <strong>Amount:</strong> {tx.amount} Credits
          </p>
        </div>
      ))}
    </div>
  );
}
export default TransactionList;