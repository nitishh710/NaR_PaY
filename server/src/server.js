import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

console.log(
  "EMAIL USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL PASS EXISTS:",
  !!process.env.EMAIL_PASS
);

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});