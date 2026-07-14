require("dotenv").config();

const mysql = require("mysql2");

// Create MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check Database Connection
db.getConnection((err, connection) => {

    if (err) {
        console.error("❌ Database Connection Failed");
        console.error(err.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");

    connection.release();
});

module.exports = db;
