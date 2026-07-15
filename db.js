require("dotenv").config();

var mysql = require("mysql2");

var db = mysql.createConnection({

    host:process.env.DB_HOST,

    user:process.env.DB_USER,

    password:process.env.DB_PASSWORD,

    database:process.env.DB_NAME,

    port:process.env.DB_PORT

});

db.connect(function(error){

    if(error){

        console.log("Database Connection Failed");

        console.log(error);

    }

    else{

        console.log("Database Connected");

    }

});

module.exports=db;
