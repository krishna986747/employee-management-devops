// ======================================
// Import Required Packages
// ======================================

var express = require("express");
var dotenv = require("dotenv");
var db = require("./db");

// Read .env File
dotenv.config();


// ======================================
// Create Express Application
// ======================================

var app = express();


// ======================================
// Middleware
// ======================================

// Read JSON Data
app.use(express.json());

// Read Form Data
app.use(express.urlencoded({ extended: true }));

// Access Public Folder
app.use(express.static("public"));


// ======================================
// Home Page
// ======================================

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});
// ======================================
// Get All Employees
// ======================================

app.get("/employees", function (req, res) {

    var sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                data: result

            });

        }

    });

});


// ======================================
// Get Single Employee
// ======================================

app.get("/employees/:id", function (req, res) {

    var id = req.params.id;

    var sql = "SELECT * FROM employees WHERE id = ?";

    db.query(sql, [id], function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                data: result[0]

            });

        }

    });

});
// ======================================
// Add Employee
// ======================================

app.post("/employees", function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var department = req.body.department;
    var salary = req.body.salary;

    var sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, department, salary], function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                message: "Employee Added Successfully"

            });

        }

    });

});


// ======================================
// Update Employee
// ======================================

app.post("/employees/update/:id", function (req, res) {

    var id = req.params.id;

    var name = req.body.name;
    var email = req.body.email;
    var department = req.body.department;
    var salary = req.body.salary;

    var sql = "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

    db.query(sql, [name, email, department, salary, id], function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                message: "Employee Updated Successfully"

            });

        }

    });

});

// ======================================
// Delete Employee
// ======================================

app.post("/employees/delete/:id", function (req, res) {

    var id = req.params.id;

    var sql = "DELETE FROM employees WHERE id = ?";

    db.query(sql, [id], function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                message: "Employee Deleted Successfully"

            });

        }

    });

});


// ======================================
// Search Employee
// ======================================

app.get("/search/:keyword", function (req, res) {

    var keyword = "%" + req.params.keyword + "%";

    var sql = `
        SELECT * FROM employees
        WHERE
        name LIKE ?
        OR email LIKE ?
        OR department LIKE ?
        ORDER BY id DESC
    `;

    db.query(sql, [keyword, keyword, keyword], function (error, result) {

        if (error) {

            res.json({

                success: false,
                message: error.message

            });

        } else {

            res.json({

                success: true,
                data: result

            });

        }

    });

});
 
// ======================================
// Start Server
// ======================================

var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {

    console.log("====================================");
    console.log("Employee Management System Started");
    console.log("Server Running on Port : " + PORT);
    console.log("http://localhost:" + PORT);
    console.log("====================================");

});
