require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
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

        res.status(200).json({
            success: true,
            count: result.length,
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

        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        res.status(200).json({
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

    if (!name || !email || !department || !salary) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }

    const sql = `
        INSERT INTO employees
        (name,email,department,salary)
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [name, email, department, salary],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            res.status(201).json({
                success: true,
                message: "Employee Added Successfully"
            });

        }
    );

});


/* ==========================================
   UPDATE EMPLOYEE
========================================== */

app.put("/employees/:id", (req, res) => {

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

app.delete("/employees/:id", (req, res) => {

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

    const keyword = "%" + req.params.keyword + "%";

    const sql = `
        SELECT *
        FROM employees
        WHERE
        name LIKE ?
        OR email LIKE ?
        OR department LIKE ?
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
                count: result.length,
                data: result
            });

        }
    );

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running on http://localhost:${PORT}`);

});
