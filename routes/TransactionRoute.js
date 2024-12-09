const express = require("express");
const { topUp, createTransaction, getTransactions,  getTransactionHistory } = require("../controllers/TransactionController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

router.post("/topup", authenticateUser, topUp);
router.post("/transaction", authenticateUser, createTransaction);
router.get("/transaction", authenticateUser, getTransactions);
 router.get("/transaction/history", getTransactionHistory);

module.exports = router;
