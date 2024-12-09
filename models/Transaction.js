const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Transaction = sequelize.define("Transaction", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // Nama model User
            key: "id",
        },
    },
    type: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
        comment: "credit untuk penambahan saldo, debit untuk pengurangan saldo",
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0.01, // Minimal jumlah transaksi
        },
    },
    balanceAfter: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Saldo setelah transaksi",
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Deskripsi transaksi, misalnya: Top Up, Pembayaran, dll.",
    },
}, {
    timestamps: true, 
    tableName: "transactions",
});

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

module.exports = Transaction;
