require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function connectDatabase() {

    db.connect((err) => {

        if (err) {

            console.log("❌ MySQL not ready. Retrying in 5 seconds...");
            console.log(err.message);

            setTimeout(connectDatabase, 5000);

            return;
        }

        console.log("✅ MySQL Connected Successfully");

    });

}

connectDatabase();

module.exports = db;
