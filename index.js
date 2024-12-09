const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Import routes
const authRoutes = require("./routes/AuthRoute");
const balanceRoutes = require("./routes/BalanceRoute");
const membershipRoutes = require("./routes/MembershipRoute");
const informationRoutes = require("./routes/InformationRoute");
const transactionRoutes = require("./routes/TransactionRoute");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/balance", balanceRoutes);
app.use("/api/v1/membership", membershipRoutes); 
app.use("/api/v1/information", informationRoutes); 
app.use("/api/v1/transaction", transactionRoutes); 

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the REST API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An internal server error occurred." });
});

module.exports = app;
