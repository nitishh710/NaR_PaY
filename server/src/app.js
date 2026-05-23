import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://narpay-nitishh710s-projects.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,
  }));
  
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/wallet",
  walletRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

export default app;