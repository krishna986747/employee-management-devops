const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ==========================================
   HOME PAGE
========================================== */

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/public/index.html");

});


/* ==========================================
   GET ALL EMPLOYEES
========================================== */

app.get("/employees", (req, res) => {

    const sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            data: result
        });

    });

});


/* ==========================================
   GET SINGLE EMPLOYEE
========================================== */

app.get("/employees/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM employees WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            data: result[0]
        });

    });

});
/* ==========================================
   ADD EMPLOYEE
========================================== */

app.post("/employees", (req, res) => {

    const { name, email, department, salary } = req.body;

    const sql = `
        INSERT INTO employees
        (name, email, department, salary)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, department, salary],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                message: "Employee Added Successfully"
            });

        }
    );

});


/* ==========================================
   UPDATE EMPLOYEE
========================================== */

app.post("/employees/update/:id", (req, res) => {

    const id = req.params.id;

    const { name, email, department, salary } = req.body;

    const sql = `
        UPDATE employees
        SET
        name=?,
        email=?,
        department=?,
        salary=?
        WHERE id=?
    `;

    db.query(
        sql,
        [name, email, department, salary, id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                message: "Employee Updated Successfully"
            });

        }
    );

});
 
/* ==========================================
   DELETE EMPLOYEE
========================================== */

app.post("/employees/delete/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    });

});


/* ==========================================
   SEARCH EMPLOYEE
========================================== */

app.get("/search/:keyword", (req, res) => {

    const keyword = `%${req.params.keyword}%`;

    const sql = `
        SELECT * FROM employees
        WHERE
        name LIKE ?
        OR email LIKE ?
        OR department LIKE ?
        ORDER BY id DESC
    `;

    db.query(
        sql,
        [keyword, keyword, keyword],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.json({
                success: true,
                data: result
            });

        }
    );

});


/* ==========================================
   START SERVER
========================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on http://localhost:${PORT}`);

});
