const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User")

const Balance = sequelize.define("Balance", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: "Users", 
            key: "id",
        },
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
}, {
    timestamps: true, 
    tableName: "balances", 
});

User.hasOne(Balance, { foreignKey: "userId" });
Balance.belongsTo(User, { foreignKey: "userId" });

module.exports = Balance;
