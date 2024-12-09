const express = require("express");
const { getBalance } = require("../controllers/BalanceController");
const { authenticateUser } = require("../middleware/auth");

const router = express.Router();

router.get("/api/v1/balance", authenticateUser, getBalance);

module.exports = router;