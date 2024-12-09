const Balance = require("../models/Balance");
const Transaction = require("../models/Transaction");

exports.topUp = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const balance = await Balance.findOne({ where: { user_id: userId } });
        if (!balance) {
            await Balance.create({ user_id: userId, balance: amount });
        } else {
            balance.balance += amount;
            await balance.save();
        }

        await Transaction.create({
            user_id: userId,
            type: "topup",
            amount,
        });

        res.status(200).json({ message: "Top up successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const userId = req.user.id;
        const { type, amount } = req.body;

        if (amount <= 0 || !["payment", "topup"].includes(type)) {
            return res.status(400).json({ message: "Invalid transaction type or amount" });
        }

        const balance = await Balance.findOne({ where: { user_id: userId } });
        if (!balance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        if (type === "payment" && balance.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        if (type === "payment") {
            balance.balance -= amount;
        } else if (type === "topup") {
            balance.balance += amount;
        }

        await balance.save();

        await Transaction.create({
            user_id: userId,
            type,
            amount,
        });

        res.status(200).json({ message: "Transaction successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await Transaction.findAll({ where: { user_id: userId } });

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactionHistory = (req, res) => {

    res.status(200).json({ message: "Transaction history retrieved successfully!" });
  };