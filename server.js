require("dotenv").config(); 
const app = require("./index"); 
const sequelize = require("./config/database"); 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");

        // Sinkronisasi database
        console.log("Database synchronized!");

        // Jalankan server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
    }
};

startServer();
