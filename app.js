const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();

// Read JSON data
app.use(express.json());

// Read Form data
app.use(express.urlencoded({ extended: true }));

// Open public folder
app.use(express.static("public"));


// ===============================
// Home Page
// ===============================

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/public/index.html");

});


// ===============================
// Show All Employees
// ===============================

app.get("/employees", function (req, res) {

    let sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, function (error, result) {

        if (error) {

            res.json({
                success: false,
                message: error.message
            });

            return;
        }

        res.json({
            success: true,
            data: result
        });

    });

});


// ===============================
// Show One Employee
// ===============================

app.get("/employees/:id", function (req, res) {

    let id = req.params.id;

    let sql = "SELECT * FROM employees WHERE id=?";

    db.query(sql, [id], function (error, result) {

        if (error) {

            res.json({
                success: false,
                message: error.message
            });

            return;
        }

        res.json({
            success: true,
            data: result[0]
        });

    });

});


// ===============================
// Add Employee
// ===============================

app.post("/employees", (req, res) => {

    console.log(req.body);

    const { name, email, department, salary } = req.body;

    const sql = `
    INSERT INTO employees(name,email,department,salary)
    VALUES(?,?,?,?)
    `;

    db.query(sql, [name, email, department, salary], function(error, result){

        if(error){

            console.log(error);

            return res.json({
                success:false,
                message:error.message
            });

        }

        console.log(result);

        res.json({
            success:true,
            message:"Employee Added Successfully"
        });

    });

});

// ===============================
// Update Employee
// ===============================

app.post("/employees/update/:id", function (req, res) {

    let id = req.params.id;

    let name = req.body.name;
    let email = req.body.email;
    let department = req.body.department;
    let salary = req.body.salary;

    let sql = "UPDATE employees SET name=?,email=?,department=?,salary=? WHERE id=?";

    db.query(sql, [name, email, department, salary, id], function (error) {

        if (error) {

            res.json({
                success: false,
                message: error.message
            });

            return;
        }

        res.json({
            success: true,
            message: "Employee Updated Successfully"
        });

    });

});


// ===============================
// Delete Employee
// ===============================

app.post("/employees/delete/:id", function (req, res) {

    let id = req.params.id;

    let sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], function (error) {

        if (error) {

            res.json({
                success: false,
                message: error.message
            });

            return;
        }

        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    });

});


// ===============================
// Search Employee
// ===============================

app.get("/search/:keyword", function (req, res) {

    let keyword = "%" + req.params.keyword + "%";

    let sql = "SELECT * FROM employees WHERE name LIKE ? OR email LIKE ? OR department LIKE ? ORDER BY id DESC";

    db.query(sql, [keyword, keyword, keyword], function (error, result) {

        if (error) {

            res.json({
                success: false,
                message: error.message
            });

            return;
        }

        res.json({
            success: true,
            data: result
        });

    });

});


// ===============================
// Start Server
// ===============================

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {

    console.log("Server Running");
    console.log("http://localhost:" + PORT);

});
