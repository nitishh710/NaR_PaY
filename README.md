# NARpay

NARpay is a smart digital wallet system built using the MERN stack.  
The project focuses on secure peer-to-peer wallet transactions with modern authentication, biometric verification, fraud detection, OTP verification, QR payments, and analytics.

The system is designed to simulate a real-world fintech payment experience with enhanced security and a modern user interface.

---

# Features

## Authentication System

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

---

# Wallet Features

- Send Money
- Receive Money
- Wallet Balance Management
- Transaction History
- Wallet PIN Setup
- Wallet PIN Reset using OTP
- QR Based Payments

---

# Advanced Security

- Email OTP Verification
- Wallet PIN Authentication
- Biometric Authentication
- Fraud Detection Logic
- Protected Transactions

---

# Unique Smart Payment Flow

NARpay introduces a custom payment model where payments can be collected directly from another user using the same device.

Example:

User A wants payment from User B.

Even if User B does not have their phone:
- User A opens "Get Amount"
- User B enters:
  - Wallet ID
  - Wallet PIN
  - Biometric Authentication
- Payment gets transferred securely

This creates a POS-style payment experience inside the wallet system.

---

# Dashboard Features

- Modern UI Design
- Wallet Analytics
- QR Code Generator
- Transaction Cards
- Responsive Layout
- Interactive Graphs

---

# Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Router
- Recharts
- React Icons
- QRCode.react

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer
- bcrypt

# Project Structure

NARpay/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   │
│   └── package.json
│
└── README.md


## Installation
# Clone Repository
git clone YOUR_GITHUB_REPOSITORY_LINK
# Install Frontend
cd client
npm install
# Install Backend
cd server
npm install

## Environment Variables
# Create a .env file inside the server folder.
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# Run Frontend
cd client
npm run dev
# Run Backend
cd server
npm run dev

## Deployment
#Frontend:
Vercel
#Backend:
Render
Railway
#Database:
MongoDB Atlas

## Security Features
JWT Protected APIs
OTP Verification
Encrypted Passwords
Wallet PIN Validation
Fraud Detection
Biometric Verification

## Future Improvements
Razorpay Integration
NFC Payments
AI Fraud Prediction
Face Recognition Login
Merchant Dashboard
Wallet to Bank Transfer
UPI Integration


Developed By:- Nitish

License

This project is built for learning, innovation, and fintech experimentation.
