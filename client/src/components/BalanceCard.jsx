function BalanceCard({ balance }) {
  return (
    <div
      style={{
        background: "#4f46e5",
        color: "white",
        padding: "30px",
        borderRadius: "10px",
        marginTop: "20px"
      }}
    > 
    <h2>Current Balance</h2>
      <h1>{balance} Credits</h1>
    </div>
  );
}

export default BalanceCard;