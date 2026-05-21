export const detectFraud =
  (
    amount,
    sender,
    recentTransactions
  ) => {
    // VERY LARGE PAYMENT
    if (amount > 50000) {
      return {
        fraud: true,
        reason:
          "Large transaction detected",
      };
    }

    // TOO MANY TRANSFERS
    if (
      recentTransactions.length >= 5
    ) {
      return {
        fraud: true,
        reason:
          "Too many transfers detected",
      };
    }

    return {
      fraud: false,
    };
  };