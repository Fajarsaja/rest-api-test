const Balance = require("../models/Balance");

exports.getBalance = async (req, res) => {
    try {
        const userId = req.user.id; 
        const balance = await Balance.findOne({ where: { user_id: userId } });

        if (!balance) {
            return res.status(404).json({ message: "Balance not found" });
        }

        res.status(200).json({ balance: balance.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
